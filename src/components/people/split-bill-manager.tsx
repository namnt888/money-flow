'use client'

import { useMemo } from 'react'
import { Account, Category, Person, Shop, Transaction } from '@/types/moneyflow.types'
import { SplitBillRow, SplitBillGroup } from './split-bill-row'
import { FileText } from 'lucide-react'

interface SplitBillManagerProps {
    transactions: Transaction[]
    personId: string
    people: Person[]
    accounts: Account[]
    categories: Category[]
    shops: Shop[]
}

export function SplitBillManager({ transactions, personId, people, accounts, categories, shops }: SplitBillManagerProps) {
    const splitBills = useMemo(() => {
        const profile = people.find(p => p.id === personId)
        const isGroupProfile = Boolean(profile?.is_group)
        const groupName = profile?.name ?? null
        const personNameById = new Map(people.map(person => [person.id, person.name]))
        const ownerPersonId = people.find(person => person.is_owner)?.id ?? null

        const grouped = new Map<string, SplitBillGroup>()

        const buildParticipants = (transaction: Transaction) => {
            const meta = transaction.metadata as any
            const splitBill = meta?.split_bill
            const rawParticipants = Array.isArray(splitBill?.participants) ? splitBill.participants : []

            if (rawParticipants.length > 0) {
                return rawParticipants.map((participant: any) => ({
                    personId: participant.person_id,
                    name: personNameById.get(participant.person_id) ?? participant.note ?? 'Unknown',
                    amount: Math.abs(Number(participant.final_amount ?? participant.base_amount ?? 0)),
                    note: participant.note || undefined,
                    cashbackFixed: Number(participant.cashback_back_amount || 0) || undefined,
                    cashbackPercent: undefined,
                }))
            }

            if (transaction.person_id) {
                return [{
                    personId: transaction.person_id,
                    name: personNameById.get(transaction.person_id) ?? 'Unknown',
                    amount: Math.abs(Number(transaction.amount ?? 0)),
                    note: transaction.note || undefined,
                }]
            }

            return []
        }

        transactions.forEach((transaction) => {
            const meta = transaction.metadata as any
            const splitBill = meta?.split_bill
            const isSplitTransaction = Boolean(
                splitBill ||
                meta?.is_split_bill_base ||
                meta?.is_split_share ||
                meta?.split_group_id ||
                meta?.split_parent_id ||
                transaction.parent_transaction_id
            )

            if (!isSplitTransaction) return

            const groupKey = String(
                meta?.split_group_id ||
                meta?.split_parent_id ||
                transaction.parent_transaction_id ||
                transaction.id
            )

            const resolvedPrefix = transaction.type === 'repayment' || meta?.is_debt_repayment_parent
                ? 'SplitRepay'
                : 'SplitBill'

            const resolvedTitle =
                splitBill?.note_summary ||
                splitBill?.me_note ||
                transaction.note ||
                transaction.description ||
                'Split Bill'

            const resolvedGroupName =
                splitBill?.group_name ||
                splitBill?.note_summary ||
                groupName ||
                'Split'
            if (isGroupProfile && groupName && resolvedGroupName !== groupName) {
                return
            }

            const participants = buildParticipants(transaction)
            const existing = grouped.get(groupKey)
            const baseTransactionId = meta?.split_parent_id || transaction.parent_transaction_id || transaction.id
            const baseNote = splitBill?.me_note || transaction.note || transaction.description || resolvedTitle
            const qrImageUrl = meta?.split_qr_image_url || splitBill?.qr_image_url || null

            if (existing) {
                const seenParticipants = new Set(existing.participants.map((participant) => participant.personId))
                participants.forEach((participant) => {
                    if (!seenParticipants.has(participant.personId)) {
                        existing.participants.push(participant)
                    }
                })
                if (!existing.baseTransactionId && baseTransactionId) {
                    existing.baseTransactionId = baseTransactionId
                }
                if (!existing.baseNote && baseNote) {
                    existing.baseNote = baseNote
                }
                if (!existing.qrImageUrl && qrImageUrl) {
                    existing.qrImageUrl = qrImageUrl
                }
            } else {
                grouped.set(groupKey, {
                    id: groupKey,
                    prefix: resolvedPrefix,
                    groupName: resolvedGroupName,
                    title: resolvedTitle,
                    occurredAt: transaction.occurred_at,
                    participants,
                    baseTransactionId,
                    baseNote,
                    qrImageUrl,
                })
            }
        })

        return {
            bills: Array.from(grouped.values()).sort(
            (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
            ),
            ownerPersonId,
        }
    }, [people, personId, transactions])

    if (splitBills.bills.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                <FileText className="h-10 w-10 mb-3 opacity-50" />
                <p className="text-sm font-medium">No split bill transactions found</p>
                <p className="text-xs">Split-created transactions will appear here automatically.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700">Split Bill Manager</h3>
                <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                    {splitBills.bills.length} Active Bills
                </div>
            </div>

            <div className="space-y-3">
                {splitBills.bills.map(bill => (
                    <SplitBillRow
                        key={bill.id}
                        bill={bill}
                        accounts={accounts}
                        categories={categories}
                        shops={shops}
                        people={people}
                        ownerPersonId={splitBills.ownerPersonId}
                    />
                ))}
            </div>
        </div>
    )
}
