'use client'

import { useState } from 'react'
import { Pencil, Edit } from 'lucide-react'
import { PersonSlideV2 } from '@/components/people/slide-v2/person-slide-v2'
import { Person, Subscription, Account } from '@/types/moneyflow.types'
import { cn } from '@/lib/utils'

interface EditPersonButtonProps {
    person: Person
    subscriptions: Subscription[]
    accounts: Account[]
    className?: string
}

export function EditPersonButton({ person, subscriptions, accounts, className }: EditPersonButtonProps) {
    const [showDialog, setShowDialog] = useState(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setShowDialog(true)}
                className={cn(
                    "flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-200 md:px-3 md:py-2 md:text-sm",
                    className
                )}
            >
                <Edit className="h-3.5 w-3.5" />
                <span>Edit</span>
            </button>

            {showDialog && (
                <PersonSlideV2
                    person={person}
                    subscriptions={subscriptions}
                    open={showDialog}
                    onOpenChange={setShowDialog}
                    accounts={accounts}
                />
            )}
        </>
    )
}
