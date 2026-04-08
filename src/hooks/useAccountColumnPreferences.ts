import { useState, useEffect } from 'react';

export type AccountColumnKey =
    | 'account'
    | 'role'
    | 'limit'
    | 'rewards' // Merged 'spent' and 'cashback_advanced'
    | 'due'
    | 'balance'
    | 'action';

export interface AccountColumnConfig {
    key: AccountColumnKey;
    label: string;
    defaultWidth: number;
    minWidth?: number;
    frozen?: boolean;
}

const defaultAccountColumns: AccountColumnConfig[] = [
    { key: 'account', label: 'Account Name', defaultWidth: 195, minWidth: 150, frozen: true },
    { key: 'balance', label: 'Balance', defaultWidth: 180, minWidth: 150 },
    { key: 'due', label: 'Due', defaultWidth: 160, minWidth: 140 },
    { key: 'role', label: 'Role & Ownership', defaultWidth: 180, minWidth: 160 },
    { key: 'limit', label: 'Limit', defaultWidth: 155, minWidth: 130 },
    { key: 'rewards', label: 'Rewards', defaultWidth: 150, minWidth: 130 },
    { key: 'action', label: 'Actions', defaultWidth: 120, minWidth: 100, frozen: true },
];

export function useAccountColumnPreferences() {
    const [columnOrder, setColumnOrder] = useState<AccountColumnKey[]>(() =>
        defaultAccountColumns.map(c => c.key)
    );

    const [visibleColumns, setVisibleColumns] = useState<Record<AccountColumnKey, boolean>>({
        account: true,
        due: true,
        role: true,
        limit: true,
        rewards: true,
        balance: true,
        action: true,
    });

    const [columnWidths, setColumnWidths] = useState<Record<AccountColumnKey, number>>(() => {
        const map = {} as Record<AccountColumnKey, number>;
        defaultAccountColumns.forEach(col => {
            map[col.key] = col.defaultWidth;
        });
        return map;
    });

    // Persistence
    useEffect(() => {
        try {
            const savedOrder = localStorage.getItem('mf_v3_account_col_order');
            const savedVis = localStorage.getItem('mf_v3_account_col_vis');
            const savedWidths = localStorage.getItem('mf_v3_account_col_width');

            if (savedOrder) {
                // Filter out keys that no longer exist in our definition to incorrect lookups
                const parsed = JSON.parse(savedOrder);
                const validKeys = defaultAccountColumns.map(c => c.key);
                const filtered = parsed.filter((k: any) => validKeys.includes(k));

                // Force Balance right after Account for consistent UX.
                const withoutBalance = filtered.filter((k: AccountColumnKey) => k !== 'balance');
                const accountIdx = withoutBalance.indexOf('account');
                if (accountIdx >= 0) {
                    withoutBalance.splice(accountIdx + 1, 0, 'balance');
                } else {
                    withoutBalance.unshift('account', 'balance');
                }

                // Ensure no missing columns remain.
                const fullOrder = [...withoutBalance];
                defaultAccountColumns.forEach((c) => {
                    if (!fullOrder.includes(c.key)) {
                        fullOrder.push(c.key);
                    }
                });

                setColumnOrder(fullOrder);
            }
            if (savedVis) {
                const parsedVis = JSON.parse(savedVis);
                setVisibleColumns({ ...parsedVis, balance: true });
            }
            if (savedWidths) {
                const parsedWidths = JSON.parse(savedWidths) as Partial<Record<AccountColumnKey, number>>;
                const nextWidths = {} as Record<AccountColumnKey, number>;

                defaultAccountColumns.forEach((col) => {
                    const raw = Number(parsedWidths[col.key] ?? col.defaultWidth);
                    const fallback = Number.isFinite(raw) ? raw : col.defaultWidth;
                    const min = col.minWidth ?? col.defaultWidth;
                    nextWidths[col.key] = Math.max(min, fallback);
                });

                setColumnWidths(nextWidths);
            }
        } catch (e) {
            console.error("Failed to load account column settings", e);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('mf_v3_account_col_order', JSON.stringify(columnOrder));
    }, [columnOrder]);

    useEffect(() => {
        localStorage.setItem('mf_v3_account_col_vis', JSON.stringify(visibleColumns));
    }, [visibleColumns]);

    useEffect(() => {
        localStorage.setItem('mf_v3_account_col_width', JSON.stringify(columnWidths));
    }, [columnWidths]);

    const toggleColumn = (key: AccountColumnKey, visible: boolean) => {
        setVisibleColumns(prev => ({ ...prev, [key]: visible }));
    };

    const reorderColumns = (newOrder: AccountColumnKey[]) => {
        setColumnOrder(newOrder);
    };

    const resetPreferences = () => {
        setColumnOrder(defaultAccountColumns.map(c => c.key));
        setVisibleColumns({
            account: true,
            balance: true,
            due: true,
            role: true,
            limit: true,
            rewards: true,
            action: true,
        });
        const map = {} as Record<AccountColumnKey, number>;
        defaultAccountColumns.forEach(col => {
            map[col.key] = col.defaultWidth;
        });
        setColumnWidths(map);
    };

    const getVisibleColumns = () => {
        return columnOrder
            .filter(key => visibleColumns[key])
            .map(key => defaultAccountColumns.find(c => c.key === key))
            .filter(Boolean) as AccountColumnConfig[];
    };

    return {
        columns: defaultAccountColumns,
        columnOrder,
        visibleColumns,
        columnWidths,
        toggleColumn,
        reorderColumns,
        setColumnWidths,
        resetPreferences,
        getVisibleColumns,
    };
}
