'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Person } from '@/types/moneyflow.types';
import { getRecentPeopleAction } from '@/actions/people-actions';
import { getFavoritePeopleAction } from '@/actions/people-actions';
import { cn } from '@/lib/utils';
import { Star, User } from 'lucide-react';
import { CustomTooltip } from '@/components/ui/custom-tooltip';
import { getPersonRouteId } from '@/lib/person-route';

export function RecentPeopleList({ isCollapsed, onClick }: { isCollapsed: boolean; onClick?: () => void }) {
    const [recentPeople, setRecentPeople] = useState<Person[]>([]);
    const [favoritePeople, setFavoritePeople] = useState<Person[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        let isMounted = true;
        // Fetch recent people based on last transaction
        const fetchRecent = async () => {
            try {
                const [favorites, recents] = await Promise.all([
                    getFavoritePeopleAction(6),
                    getRecentPeopleAction(6),
                ]);
                if (!isMounted) return;

                const favoriteIds = new Set((favorites || []).map((item) => item.id));
                setFavoritePeople(favorites || []);
                setRecentPeople((recents || []).filter((item) => !favoriteIds.has(item.id)).slice(0, 6));
            } catch (err) {
                if (isMounted) console.error('Failed to fetch recent people:', err);
            }
        };
        fetchRecent();
        return () => { isMounted = false; };
    }, []);

    if (recentPeople.length === 0 && favoritePeople.length === 0) return null;

    const renderPersonRow = (person: Person, tone: 'favorite' | 'recent') => {
        const href = `/people/${getPersonRouteId(person)}`;
        const isActive = pathname === href;

        return (
            <CustomTooltip
                key={`${tone}-${person.id}`}
                content={person.name}
                side="right"
                disabled={!isCollapsed}
            >
                <Link
                    href={href}
                    onClick={onClick}
                    className={cn(
                        "flex items-center gap-2 rounded-md transition-all group relative",
                        isActive
                            ? "text-indigo-700 font-bold"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                        isCollapsed ? "justify-center px-1 py-1.5" : "px-2 py-1.5"
                    )}
                >
                    {!isCollapsed && (
                        <div className={cn(
                            "absolute -left-3 top-0 bottom-0 w-px bg-slate-100 transition-colors",
                            tone === 'favorite' ? "group-hover:bg-amber-200" : "group-hover:bg-indigo-200",
                            isActive && (tone === 'favorite' ? "bg-amber-300" : "bg-indigo-300")
                        )} />
                    )}

                    <div className="flex h-5 w-7 shrink-0 items-center justify-center overflow-hidden transition-colors bg-transparent">
                        {person.image_url ? (
                            <img src={person.image_url} alt="" className="h-full w-full object-contain" />
                        ) : (
                            <div className="h-5 w-5 flex items-center justify-center bg-slate-50 rounded-sm">
                                <User className="h-2.5 w-2.5 text-slate-400" />
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <>
                            <span className="text-[10px] truncate leading-tight flex-1">{person.name}</span>
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
            {favoritePeople.length > 0 && !isCollapsed && (
                <div className="px-2 pt-1 text-[9px] font-black uppercase tracking-[0.18em] text-amber-500">Fav</div>
            )}
            <div className="space-y-0.5">
                {favoritePeople.map((person) => renderPersonRow(person, 'favorite'))}
            </div>

            {recentPeople.length > 0 && !isCollapsed && (
                <div className="px-2 pt-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Recent</div>
            )}
            <div className="space-y-0.5">
                {recentPeople.map((person) => renderPersonRow(person, 'recent'))}
            </div>
        </div>
    );
}
