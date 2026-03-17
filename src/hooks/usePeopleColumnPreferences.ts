import { useState, useEffect } from 'react';

export type PeopleColumnKey = 'name' | 'current_tag' | 'current_debt' | 'base_lend' | 'repayment' | 'cashback_total' | 'net_lend' | 'balance' | 'action';

export interface PeopleColumnConfig {
    key: PeopleColumnKey;
    label: string;
    defaultWidth: number;
    minWidth?: number;
    frozen?: boolean;
}

const defaultPeopleColumns: PeopleColumnConfig[] = [
    { key: 'name', label: 'Name', defaultWidth: 160, minWidth: 140, frozen: true },
    { key: 'base_lend', label: 'Original Amount', defaultWidth: 140, minWidth: 120 },
    { key: 'repayment', label: 'Repayment', defaultWidth: 140, minWidth: 120 },
    { key: 'cashback_total', label: 'Cashback Total', defaultWidth: 130, minWidth: 110 },
    { key: 'balance', label: 'Remaining Amount', defaultWidth: 140, minWidth: 120 },
    { key: 'current_tag', label: 'Current Tag', defaultWidth: 300, minWidth: 280 },
    { key: 'current_debt', label: 'Outstanding Debt', defaultWidth: 140, minWidth: 120 },
    { key: 'net_lend', label: 'Previous Debt', defaultWidth: 130, minWidth: 110 },
    { key: 'action', label: 'Actions', defaultWidth: 100, minWidth: 80, frozen: true },
];

export function usePeopleColumnPreferences() {
    const [columnOrder, setColumnOrder] = useState<PeopleColumnKey[]>(() =>
        defaultPeopleColumns.map(c => c.key)
    );

    const [visibleColumns, setVisibleColumns] = useState<Record<PeopleColumnKey, boolean>>({
        name: true,
        current_tag: true,
        current_debt: false, // BUG #5: Hide from row
        base_lend: true,
        repayment: true,
        cashback_total: true,
        net_lend: false, // BUG #5: Hide from row
        balance: true,
        action: true,
    });

    const [columnWidths, setColumnWidths] = useState<Record<PeopleColumnKey, number>>(() => {
        const map = {} as Record<PeopleColumnKey, number>;
        defaultPeopleColumns.forEach(col => {
            map[col.key] = col.defaultWidth;
        });
        return map;
    });

    // Persistence
    useEffect(() => {
        try {
            const savedOrder = localStorage.getItem('mf_v3_people_col_order');
            const savedVis = localStorage.getItem('mf_v3_people_col_vis');
            const savedWidths = localStorage.getItem('mf_v3_people_col_width');

            if (savedOrder) {
                let parsedOrder = JSON.parse(savedOrder) as PeopleColumnKey[];
                // Filter out invalid/removed columns and add missing ones
                const validKeys = defaultPeopleColumns.map(c => c.key);
                parsedOrder = parsedOrder.filter(k => validKeys.includes(k as any)) as PeopleColumnKey[];
                validKeys.forEach(k => {
                    if (!parsedOrder.includes(k)) parsedOrder.push(k);
                });
                setColumnOrder(parsedOrder);
            }
            if (savedVis) {
                const parsedVis = JSON.parse(savedVis);
                // Ensure new column is visible by default if it wasn't there
                if (parsedVis.debt_tag !== undefined) {
                    parsedVis.current_tag = parsedVis.debt_tag;
                    delete parsedVis.debt_tag;
                }
                if (parsedVis.active_subs !== undefined) delete parsedVis.active_subs;
                setVisibleColumns(prev => ({ ...prev, ...parsedVis }));
            }
            if (savedWidths) setColumnWidths(JSON.parse(savedWidths));
        } catch (e) {
            console.error("Failed to load people column settings", e);
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('mf_v3_people_col_order', JSON.stringify(columnOrder));
    }, [columnOrder]);

    useEffect(() => {
        localStorage.setItem('mf_v3_people_col_vis', JSON.stringify(visibleColumns));
    }, [visibleColumns]);

    useEffect(() => {
        localStorage.setItem('mf_v3_people_col_width', JSON.stringify(columnWidths));
    }, [columnWidths]);

    const toggleColumn = (key: PeopleColumnKey, visible: boolean) => {
        setVisibleColumns(prev => ({ ...prev, [key]: visible }));
    };

    const reorderColumns = (newOrder: PeopleColumnKey[]) => {
        setColumnOrder(newOrder);
    };

    const resetPreferences = () => {
        setColumnOrder(defaultPeopleColumns.map(c => c.key));
        setVisibleColumns({
            name: true,
            current_tag: true,
            current_debt: false,
            base_lend: true,
            repayment: true,
            cashback_total: true,
            net_lend: false,
            balance: true,
            action: true,
        });
        const map = {} as Record<PeopleColumnKey, number>;
        defaultPeopleColumns.forEach(col => {
            map[col.key] = col.defaultWidth;
        });
        setColumnWidths(map);
    };

    const getVisibleColumns = () => {
        return columnOrder
            .filter(key => visibleColumns[key])
            .map(key => defaultPeopleColumns.find(c => c.key === key)!);
    };

    return {
        columns: defaultPeopleColumns,
        columnOrder,
        visibleColumns,
        columnWidths,
        toggleColumn,
        reorderColumns,
        setColumnWidths,
        savePreferences: () => { }, // Auto-saved via effects
        resetPreferences,
        getVisibleColumns,
    };
}
