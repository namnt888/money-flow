'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Account } from '@/types/moneyflow.types';
import { getRecentAccountsAction } from '@/actions/account-actions';
import { getFavoriteAccountsAction } from '@/actions/account-actions';
import { cn } from '@/lib/utils';
import { Landmark, Star } from 'lucide-react';
import { CustomTooltip } from '@/components/ui/custom-tooltip';

export function RecentAccountsList({ isCollapsed, onClick }: { isCollapsed: boolean; onClick?: () => void }) {
    const [recentAccounts, setRecentAccounts] = useState<Account[]>([]);
    const [favoriteAccounts, setFavoriteAccounts] = useState<Account[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        let isMounted = true;
        const fetchRecent = async () => {
            try {
                const [favorites, recents] = await Promise.all([
                    getFavoriteAccountsAction(6),
                    getRecentAccountsAction(6),
                ]);
                if (!isMounted) return;

                const favoriteIds = new Set((favorites || []).map((item) => item.id));
                setFavoriteAccounts(favorites || []);
                setRecentAccounts((recents || []).filter((item) => !favoriteIds.has(item.id)).slice(0, 6));
            } catch (err) {
                if (isMounted) console.error('Failed to fetch recent accounts:', err);
            }
        };
        fetchRecent();
        return () => { isMounted = false; };
    }, []);

    if (recentAccounts.length === 0 && favoriteAccounts.length === 0) return null;

    const renderAccountRow = (account: Account, tone: 'favorite' | 'recent') => {
        const href = `/accounts/${account.id}`;
        const isActive = pathname === href;

        return (
            <CustomTooltip
                key={`${tone}-${account.id}`}
                content={account.name}
                side="right"
                disabled={!isCollapsed}
            >
                <Link
                    href={href}
                    onClick={onClick}
                    className={cn(
                        "flex items-center gap-2 rounded-md transition-all group relative",
                        isActive
                            ? "text-blue-700 font-bold"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                        isCollapsed ? "justify-center px-1 py-1.5" : "px-2 py-1.5"
                    )}
                >
                    {!isCollapsed && (
                        <div className={cn(
                            "absolute -left-3 top-0 bottom-0 w-px bg-slate-100 transition-colors",
                            tone === 'favorite' ? "group-hover:bg-amber-200" : "group-hover:bg-blue-200",
                            isActive && (tone === 'favorite' ? "bg-amber-300" : "bg-blue-300")
                        )} />
                    )}

                    <div className="flex h-5 w-7 shrink-0 items-center justify-center overflow-hidden transition-colors bg-transparent">
                        {account.image_url ? (
                            <img src={account.image_url} alt="" className="h-full w-full object-contain" />
                        ) : (
                            <div className="h-5 w-5 flex items-center justify-center bg-slate-50 rounded-sm">
                                <Landmark className="h-2.5 w-2.5 text-slate-400" />
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <>
                            <span className="text-[10px] truncate leading-tight flex-1">{account.name}</span>
                            {tone === 'favorite' ? (
                                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            ) : null}
                        </>
                    )}
                </Link>
            </CustomTooltip>
        );
    };

    return (
        <div className={cn(
            "space-y-0.5 mt-0.5 mb-1 transition-all duration-300 overflow-hidden",
            isCollapsed ? "w-full" : "pl-6"
        )}>
            {favoriteAccounts.length > 0 && !isCollapsed && (
                <div className="px-2 pt-1 text-[9px] font-black uppercase tracking-[0.18em] text-amber-500">Fav</div>
            )}
            <div className="space-y-0.5">
                {favoriteAccounts.map((account) => renderAccountRow(account, 'favorite'))}
            </div>

            {recentAccounts.length > 0 && !isCollapsed && (
                <div className="px-2 pt-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Recent</div>
            )}
            <div className="space-y-0.5">
                {recentAccounts.map((account) => renderAccountRow(account, 'recent'))}
            </div>
        </div>
    );
}
