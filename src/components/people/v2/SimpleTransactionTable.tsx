'use client'

import React from 'react'
import { UnifiedTransactionTable } from '@/components/moneyflow/unified-transaction-table'
import { TransactionWithDetails, Account, Category, Person, Shop } from '@/types/moneyflow.types'
import { ColumnKey } from '@/components/app/table/transactionColumns'

interface SimpleTransactionTableProps {
    transactions: TransactionWithDetails[]
    accounts: Account[]
    categories: Category[]
    people: Person[]
    shops: Shop[]
    searchTerm?: string
    context?: 'account' | 'person' | 'general'
    contextId?: string
    showTag?: boolean
    onEdit?: (txn: TransactionWithDetails) => void
    onDuplicate?: (txn: TransactionWithDetails) => void
    setIsGlobalLoading?: (loading: boolean) => void
    setLoadingMessage?: (message: string) => void
}

/**
 * Simple transaction table without the header toolbar
 * Used in V2 Member Details page where the header is custom
 */
export function SimpleTransactionTable({
    transactions,
    accounts,
    categories,
    people,
    shops,
    searchTerm = '',
    context,
    contextId,
    showTag = false,
    onEdit,
    onDuplicate,
    setIsGlobalLoading,
    setLoadingMessage,
}: SimpleTransactionTableProps) {
    // Apply search filter
    const filteredTransactions = searchTerm
        ? transactions.filter(txn => {
            const lowerTerm = searchTerm.toLowerCase()
            return (
                txn.note?.toLowerCase().includes(lowerTerm) ||
                txn.id?.toLowerCase().includes(lowerTerm) ||
                txn.category_name?.toLowerCase().includes(lowerTerm) ||
                txn.shop_name?.toLowerCase().includes(lowerTerm) ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (txn as any).person_name?.toLowerCase().includes(lowerTerm)
            )
        })
        : transactions

    const hiddenColumns: ColumnKey[] = ['id', 'actual_cashback', 'net_profit_raw', 'net_profit']
    if (!showTag) {
        hiddenColumns.push('cycle')
    }

    const columnOrder: ColumnKey[] = [
        'date',
        'shop',
        'account',
        'amount',
        'est_share',
        'final_price',
        'category',
        'cycle',
        'actions',
        'people',
        'id',
    ]
 
    return (
        <div className="bg-white rounded-lg border border-slate-200">
            <UnifiedTransactionTable
                transactions={filteredTransactions}
                accounts={accounts}
                categories={categories}
                people={people}
                shops={shops}
                context={context}
                contextId={contextId}
                hiddenColumns={hiddenColumns}
                columnOrder={columnOrder}
                onEdit={onEdit}
                onDuplicate={onDuplicate}
                setIsGlobalLoading={setIsGlobalLoading}
                setLoadingMessage={setLoadingMessage}
            />
        </div>
    )
}
