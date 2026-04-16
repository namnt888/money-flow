'use client'

import { Person, Subscription, Account } from '@/types/moneyflow.types'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { PersonForm } from '@/components/people/person-form'
import { updatePersonAction } from '@/actions/people-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface PersonSlideV2Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    person: Person
    subscriptions: Subscription[]
    accounts: Account[]
    defaultTab?: string
}

export function PersonSlideV2({
    open,
    onOpenChange,
    person,
    subscriptions,
    accounts,
    defaultTab = 'general',
}: PersonSlideV2Props) {
    const router = useRouter()

    const handleSubmit = async (values: any) => {
        try {
            const ok = await updatePersonAction(person.id, {
                name: values.name,
                image_url: values.image_url,
                sheet_link: values.sheet_link,
                google_sheet_url: values.google_sheet_url,
                sheet_full_img: values.sheet_full_img,
                sheet_show_bank_account: values.sheet_show_bank_account,
                sheet_bank_info: values.sheet_bank_info,
                sheet_linked_bank_id: values.sheet_linked_bank_id,
                sheet_show_qr_image: values.sheet_show_qr_image,
                subscriptionIds: values.subscriptionIds,
                is_archived: values.is_archived,
                is_group: values.is_group,
                is_owner: values.is_owner,
                is_favorite: values.is_favorite,
                is_master_sheet_enabled: values.is_master_sheet_enabled,
            })

            if (ok) {
                toast.success("Person updated successfully")
                onOpenChange(false)
                router.refresh()
            } else {
                toast.error("Failed to update person")
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred")
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                className="w-full sm:max-w-xl p-0 flex flex-col h-full bg-slate-50"
                side="right"
            >
                <div className="bg-white border-b px-6 py-4 flex items-center justify-between shrink-0">
                    <SheetTitle>Edit Person</SheetTitle>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50">
                    <PersonForm
                        mode="edit"
                        subscriptions={subscriptions}
                        accounts={accounts}
                        defaultTab={defaultTab}
                        initialValues={{
                            name: person.name,
                            image_url: person.image_url ?? '',
                            sheet_link: person.sheet_link ?? '',
                            google_sheet_url: person.google_sheet_url ?? '',
                            subscriptionIds: person.subscription_ids ?? [],
                            is_owner: person.is_owner ?? false,
                            is_archived: person.is_archived ?? false,
                            is_favorite: person.is_favorite ?? false,
                            is_group: person.is_group ?? false,
                            sheet_linked_bank_id: (person as any).sheet_linked_bank_id ?? '',
                            is_master_sheet_enabled: (person as any).is_master_sheet_enabled ?? false,
                            sheet_show_bank_account: (person as any).sheet_show_bank_account ?? false,
                            sheet_bank_info: (person as any).sheet_bank_info ?? '',
                            sheet_show_qr_image: (person as any).sheet_show_qr_image ?? false,
                            sheet_full_img: (person as any).sheet_full_img ?? '',
                        }}
                        onCancel={() => onOpenChange(false)}
                        onSubmit={handleSubmit}
                        submitLabel="Save Changes"
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}
