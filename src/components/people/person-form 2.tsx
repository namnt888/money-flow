import { useEffect, useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2,
  Star,
  User,
  Archive,
  ExternalLink,
  Check,
  ChevronDown,
  FileSpreadsheet,
  Globe,
  Settings,
  ShieldCheck,
  Landmark,
  QrCode,
  Clipboard,
  Cloud,
  Youtube,
  Zap,
  LayoutDashboard
} from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Subscription, Account } from '@/types/moneyflow.types'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { getPersonRouteId } from "@/lib/person-route"

export type PersonFormValues = {
  name: string
  pocketbase_id?: string
  image_url?: string
  sheet_link?: string
  google_sheet_url?: string
  subscriptionIds: string[]
  is_owner?: boolean
  is_archived?: boolean
  is_favorite?: boolean
  is_group?: boolean
  sheet_linked_bank_id?: string
  is_master_sheet_enabled?: boolean
  sheet_show_bank_account?: boolean
  sheet_bank_info?: string
  sheet_show_qr_image?: boolean
  sheet_full_img?: string
}

type PersonFormProps = {
  id?: string
  mode: 'create' | 'edit'
  onSubmit: (values: PersonFormValues) => Promise<void> | void
  submitLabel?: string
  initialValues?: Partial<PersonFormValues>
  subscriptions: Subscription[]
  accounts: Account[]
  onCancel?: () => void
  onChange?: () => void
  onAddAccount?: () => void
  defaultTab?: string
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  pocketbase_id: z.string().optional().or(z.literal('')),
  image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
  sheet_link: z.string().url('Invalid script link URL').optional().or(z.literal('')),
  google_sheet_url: z.string().url('Invalid Google Sheet URL').optional().or(z.literal('')),
  subscriptionIds: z.array(z.string()),
  is_owner: z.boolean().optional(),
  is_archived: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  is_group: z.boolean().optional(),
  sheet_linked_bank_id: z.string().optional(),
  is_master_sheet_enabled: z.boolean().optional(),
  sheet_show_bank_account: z.boolean().optional(),
  sheet_bank_info: z.string().optional(),
  sheet_show_qr_image: z.boolean().optional(),
  sheet_full_img: z.string().url('Invalid image URL').optional().or(z.literal('')),
})

export function PersonForm({
  id,
  mode,
  onSubmit,
  submitLabel,
  initialValues,
  subscriptions,
  accounts,
  onCancel,
  onChange,
  defaultTab = 'general'
}: PersonFormProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [imagePreview, setImagePreview] = useState<string | null>(initialValues?.image_url || null)
  const [status, setStatus] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [isAccountPickerOpen, setIsAccountPickerOpen] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PersonFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues?.name ?? '',
      pocketbase_id: initialValues?.pocketbase_id ?? '',
      image_url: initialValues?.image_url ?? '',
      sheet_link: initialValues?.sheet_link ?? '',
      google_sheet_url: initialValues?.google_sheet_url ?? '',
      subscriptionIds: initialValues?.subscriptionIds ?? [],
      is_owner: initialValues?.is_owner ?? false,
      is_archived: initialValues?.is_archived ?? false,
      is_favorite: initialValues?.is_favorite ?? false,
      is_group: initialValues?.is_group ?? false,
      sheet_linked_bank_id: initialValues?.sheet_linked_bank_id ?? '',
      is_master_sheet_enabled: initialValues?.is_master_sheet_enabled ?? false,
      sheet_show_bank_account: initialValues?.sheet_show_bank_account ?? false,
      sheet_bank_info: initialValues?.sheet_bank_info ?? '',
      sheet_show_qr_image: initialValues?.sheet_show_qr_image ?? false,
      sheet_full_img: initialValues?.sheet_full_img ?? '',
    },
  })

  useEffect(() => {
    if (isDirty && onChange) {
      onChange()
    }
  }, [isDirty, onChange])

  useEffect(() => {
    const nextValues: PersonFormValues = {
      name: initialValues?.name ?? '',
      pocketbase_id: initialValues?.pocketbase_id ?? '',
      image_url: initialValues?.image_url ?? '',
      sheet_link: initialValues?.sheet_link ?? '',
      google_sheet_url: initialValues?.google_sheet_url ?? '',
      subscriptionIds: initialValues?.subscriptionIds ?? [],
      is_owner: initialValues?.is_owner ?? false,
      is_archived: initialValues?.is_archived ?? false,
      is_favorite: initialValues?.is_favorite ?? false,
      is_group: initialValues?.is_group ?? false,
      sheet_linked_bank_id: initialValues?.sheet_linked_bank_id ?? '',
      is_master_sheet_enabled: initialValues?.is_master_sheet_enabled ?? false,
      sheet_show_bank_account: initialValues?.sheet_show_bank_account ?? false,
      sheet_bank_info: initialValues?.sheet_bank_info ?? '',
      sheet_show_qr_image: initialValues?.sheet_show_qr_image ?? false,
      sheet_full_img: initialValues?.sheet_full_img ?? '',
    }
    reset(nextValues)
    setImagePreview(nextValues.image_url || null)
  }, [initialValues, reset])

  const watchedImage = watch('image_url')
  const watchedSubs = watch('subscriptionIds')
  const watchedIsOwner = watch('is_owner')
  const watchedIsArchived = watch('is_archived')
  const watchedIsFavorite = watch('is_favorite')
  const watchedSheetLinkedBankId = watch('sheet_linked_bank_id')
  const watchedSheetBankInfo = watch('sheet_bank_info')
  const watchedSheetShowBankAccount = watch('sheet_show_bank_account')
  const watchedSheetShowQrImage = watch('sheet_show_qr_image')
  const watchedIsMasterSheetEnabled = watch('is_master_sheet_enabled')

  useEffect(() => {
    setImagePreview(watchedImage || null)
  }, [watchedImage])

  useEffect(() => {
    register('subscriptionIds')
    register('sheet_linked_bank_id')
  }, [register])

  // AUTO-FILL Bank Info if missing
  useEffect(() => {
    if (!watchedSheetBankInfo && watchedSheetLinkedBankId && accounts.length > 0) {
      const acc = accounts.find(a => a.id === watchedSheetLinkedBankId)
      if (acc) {
        const info = [acc.name, acc.account_number, acc.receiver_name].filter(Boolean).join(' ')
        if (info) setValue('sheet_bank_info', info)
      }
    }
  }, [watchedSheetLinkedBankId, accounts, watchedSheetBankInfo, setValue])

  const submission = async (values: PersonFormValues) => {
    setStatus(null)
    try {
      await onSubmit(values)
      setStatus({ type: 'success', text: mode === 'create' ? 'Member created.' : 'Member updated.' })
    } catch (error) {
      console.error(error)
      setStatus({ type: 'error', text: 'Unable to save changes. Please try again.' })
    }
  }

  const selectedAccount = useMemo(() => 
    accounts.find(a => a.id === watchedSheetLinkedBankId), 
    [accounts, watchedSheetLinkedBankId]
  )

  const bankAccounts = useMemo(() => 
    accounts.filter(a => a.type === 'bank'),
    [accounts]
  )

  const subscriptionOptions = useMemo(
    () => subscriptions.map(sub => ({
      id: sub.id,
      name: sub.name,
      price: sub.price,
      image_url: sub.image_url,
    })),
    [subscriptions]
  )

  const renderServiceIcon = (name: string, url?: string | null) => {
    if (url) return <img src={url} alt={name} className="h-full w-full object-cover" />
    if (name.toLowerCase().includes('icloud')) return <Cloud className="h-5 w-5 text-blue-500" />
    if (name.toLowerCase().includes('youtube')) return <Youtube className="h-5 w-5 text-rose-500" />
    if (name.toLowerCase().includes('netflix')) return <Zap className="h-5 w-5 text-rose-600" />
    if (name.toLowerCase().includes('spotify')) return <Zap className="h-5 w-5 text-emerald-500" />
    return <span className="text-sm font-bold opacity-40">{name.charAt(0)}</span>
  }

  return (
    <form onSubmit={handleSubmit(submission)} className="flex h-full min-h-0 flex-col bg-slate-50/50">
      {/* Tab Navigation */}
      <div className="px-6 pt-4 bg-white border-b border-slate-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-100 p-1 rounded-2xl h-14 w-full grid grid-cols-2 gap-2 border-none shadow-none mb-3">
            <TabsTrigger 
              value="general" 
              className="rounded-xl text-[12px] font-black uppercase tracking-[0.15em] gap-3 flex items-center h-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md transition-all duration-300"
            >
              <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500">
                <User className="h-4 w-4" />
              </div>
              General
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="rounded-xl text-[12px] font-black uppercase tracking-[0.15em] gap-3 flex items-center h-full data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md transition-all duration-300"
            >
              <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-rose-50 text-rose-500">
                <Zap className="h-4 w-4" />
              </div>
              Services
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 pb-24">
        <Tabs value={activeTab} className="w-full">
          {/* 1. GENERAL TAB */}
          <TabsContent value="general" className="space-y-7 mt-0 outline-none">
            {/* Helper Note */}
            <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/40 p-4 shadow-sm">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <p className="text-[11px] font-bold leading-relaxed text-blue-800">
                A debt account is managed automatically for this member. These identity settings define how the profile appears in transaction flows.
              </p>
            </div>

            {/* 1. IDENTITY & ENGAGEMENT */}
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm ring-1 ring-slate-200/5 space-y-8">
              <div className="flex items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Profile Identity</h2>
                  <p className="text-[13px] font-medium text-slate-600">Primary member identification.</p>
                </div>
                <div className="relative group">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 shadow-inner group-hover:border-indigo-200 transition-colors">
                    {imagePreview ? (
                      <img src={imagePreview} className="h-full w-full object-cover rounded-none" />
                    ) : (
                      <User className="h-7 w-7 text-slate-300" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Full Name - FULL ROW */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      {...register('name')}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-12 py-3.5 text-sm font-bold transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5"
                      placeholder="e.g. John Doe"
                    />
                    {mode === 'edit' && id && (
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm bg-white border border-slate-100"
                        onClick={() => window.open(`/people/${getPersonRouteId({ id, name: watch('name'), pocketbase_id: watch('pocketbase_id') } as any)}`, '_blank')}
                      >
                        <ExternalLink className="h-4.5 w-4.5" />
                      </button>
                    )}
                  </div>
                  {errors.name && <p className="text-[10px] font-bold text-rose-600 ml-1">{errors.name.message}</p>}
                </div>

                {/* Engagement Grid: Favorite & Owner */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={cn(
                    "flex items-center justify-between rounded-2xl border bg-slate-50/30 px-5 py-4 transition-all duration-300",
                    watchedIsFavorite ? "border-rose-200 bg-rose-50/20 shadow-md" : "border-slate-100"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                        watchedIsFavorite ? "bg-rose-50 text-rose-500 ring-1 ring-rose-200/50 shadow-sm" : "bg-white border border-slate-100 text-slate-400"
                      )}>
                        <Star className={cn("h-5 w-5", watchedIsFavorite && "fill-rose-500")} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-black text-slate-800 tracking-tight leading-none mb-0.5">Favorite</p>
                        <p className="text-[10px] font-medium text-slate-400 truncate">Pin to top.</p>
                      </div>
                    </div>
                    <Switch checked={watchedIsFavorite} onCheckedChange={(val) => setValue('is_favorite', val)} />
                  </div>

                   <div className={cn(
                    "flex items-center justify-between rounded-2xl border bg-slate-50/30 px-5 py-4 transition-all duration-300",
                    watchedIsOwner ? "border-indigo-200 bg-indigo-50/20 shadow-md" : "border-slate-100"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                        watchedIsOwner ? "bg-indigo-50 text-indigo-500 ring-1 ring-indigo-200/50 shadow-sm" : "bg-white border border-slate-100 text-slate-400"
                      )}>
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-black text-slate-800 tracking-tight leading-none mb-0.5">Owner</p>
                        <p className="text-[10px] font-medium text-slate-400 truncate">Personal profile.</p>
                      </div>
                    </div>
                    <Switch checked={watchedIsOwner} onCheckedChange={(val) => setValue('is_owner', val)} />
                  </div>
                </div>

                {/* Avatar URL - FULL ROW */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Avatar Image URL</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      {...register('image_url')}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 pl-11 pr-12 py-3.5 text-sm font-bold transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SHEET CONNECTION */}
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm ring-1 ring-slate-200/5 space-y-8">
                <div className="space-y-1">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Sheet Connection</h2>
                    <p className="text-[13px] font-medium text-slate-600">Endpoints for data synchronization.</p>
                </div>

                <div className="space-y-6">
                    {/* Destination Sheet URL */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-1">Destination Sheet URL</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1 group">
                                <FileSpreadsheet className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                                <input
                                    {...register('google_sheet_url')}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-2.5 text-sm font-bold focus:border-indigo-500 focus:bg-white outline-none transition-all"
                                    placeholder="https://docs.google.com/..."
                                />
                            </div>
                            {watch('google_sheet_url') && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 shrink-0 rounded-xl border-slate-200 bg-white hover:bg-emerald-50 text-emerald-600"
                                    onClick={() => window.open(watch('google_sheet_url')!, '_blank')}
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Master Sheet Toggle - NEAR Sheet URL */}
                    <div className={cn(
                        "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                        watchedIsMasterSheetEnabled ? "border-amber-200 bg-amber-50/20 shadow-sm" : "border-slate-100 bg-slate-50/30"
                    )}>
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                                watchedIsMasterSheetEnabled ? "bg-amber-100 text-amber-600 shadow-sm ring-1 ring-amber-200/50" : "bg-white border border-slate-100 text-slate-400"
                            )}>
                                <LayoutDashboard className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[12px] font-black text-slate-800 tracking-tight leading-none mb-0.5">Master Year Sheet</p>
                                <p className="text-[10px] font-medium text-slate-500">Sync all data to a single sheet for the year.</p>
                            </div>
                        </div>
                        <Switch checked={!!watchedIsMasterSheetEnabled} onCheckedChange={(val) => setValue('is_master_sheet_enabled', val)} />
                    </div>

                    {/* Apps Script Webhook */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-1">Apps Script Webhook</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1 group">
                                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500" />
                                <input
                                    {...register('sheet_link')}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 pl-11 pr-4 py-2.5 text-sm font-bold focus:border-indigo-500 focus:bg-white outline-none transition-all"
                                    placeholder="https://script.google.com/..."
                                />
                            </div>
                            {watch('sheet_link') && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 shrink-0 rounded-xl border-slate-200 bg-white hover:bg-indigo-50 text-indigo-600"
                                    onClick={() => window.open(watch('sheet_link')!, '_blank')}
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Bank Info Sync Toggle - NEAR Webhook */}
                    <div className={cn(
                        "flex flex-col p-5 rounded-2xl border transition-all duration-300",
                        watchedSheetShowBankAccount ? "border-emerald-200 bg-emerald-50/20 shadow-sm" : "border-slate-100 bg-slate-50/30"
                    )}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                                    watchedSheetShowBankAccount ? "bg-emerald-100 text-emerald-600 shadow-sm ring-1 ring-emerald-200/50" : "bg-white border border-slate-100 text-slate-400"
                                )}>
                                    <Landmark className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[12px] font-black text-slate-800 tracking-tight leading-none mb-0.5">Sync Bank Details</p>
                                    <p className="text-[10px] font-medium text-slate-500">Auto-fill bank info in generated sheets.</p>
                                </div>
                            </div>
                            <Switch checked={!!watchedSheetShowBankAccount} onCheckedChange={(val) => setValue('sheet_show_bank_account', val)} />
                        </div>
                        {watchedSheetShowBankAccount && (
                            <div className="mt-4 pt-4 border-t border-emerald-100/50 animate-in fade-in slide-in-from-top-1">
                                <label className="text-[10px] font-black uppercase tracking-wider text-emerald-700/60 ml-1 mb-2 block">Bank Account Note</label>
                                <textarea
                                    {...register('sheet_bank_info')}
                                    className="w-full rounded-xl border border-emerald-100 bg-white/60 p-3 text-xs font-bold text-emerald-900 focus:border-emerald-300 focus:bg-white outline-none transition-all min-h-[60px] resize-none"
                                    placeholder="Branch: Downtown, Account No: XXXX-XXXX"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. ADMINISTRATION */}
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm ring-1 ring-slate-200/5 space-y-8">
                <div className="space-y-1">
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Administration</h2>
                    <p className="text-[13px] font-medium text-slate-600">Advanced profile management.</p>
                </div>

                <div className="space-y-6">
                    {/* Default Repayment Account */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-500 ml-1">Default Repayment Account</label>
                        <Popover open={isAccountPickerOpen} onOpenChange={setIsAccountPickerOpen} modal={false}>
                            <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-[52px] justify-between rounded-xl border-slate-200 bg-slate-50/30 shadow-sm hover:bg-slate-100/50 px-4 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center">
                                    {selectedAccount?.image_url ? (
                                    <img src={selectedAccount.image_url} className="h-5 w-5 object-contain" />
                                    ) : (
                                    <Landmark className="h-4 w-4 text-slate-400" />
                                    )}
                                </div>
                                <span className="text-sm font-bold text-slate-700">{selectedAccount?.name || 'Link a source bank account'}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-slate-400" />
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent 
                                className="p-0 w-[var(--radix-popover-trigger-width)] max-h-[400px] overflow-hidden z-[750] border border-slate-200 shadow-xl rounded-xl" 
                                align="start"
                                onWheel={(e) => e.stopPropagation()}
                            >
                                <Command className="h-auto border-none flex flex-col">
                                    <CommandInput placeholder="Search bank accounts..." className="h-10 text-xs" />
                                    <CommandList className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 flex-1 overscroll-contain">
                                        <CommandEmpty>No accounts found.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem onSelect={() => { setValue('sheet_linked_bank_id', ''); setIsAccountPickerOpen(false); }}>
                                                <Archive className="h-4 w-4 mr-2" /> None / Unlinked
                                            </CommandItem>
                                            {bankAccounts.map(acc => (
                                                <CommandItem key={acc.id} onSelect={() => { setValue('sheet_linked_bank_id', acc.id); setIsAccountPickerOpen(false); }}>
                                                    {acc.image_url && <img src={acc.image_url} className="h-4 w-4 mr-2 object-contain" />}
                                                    {acc.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* QR & Archive Grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* QR Code Toggle */}
                        <div className={cn(
                            "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                            watchedSheetShowQrImage ? "border-indigo-200 bg-indigo-50/20 shadow-sm" : "border-slate-100 bg-slate-50/30"
                        )}>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                                    watchedSheetShowQrImage ? "bg-indigo-100 text-indigo-600 shadow-sm ring-1 ring-indigo-200/50 shadow-indigo-100" : "bg-white border border-slate-100 text-slate-400"
                                )}>
                                    <QrCode className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[12px] font-black text-slate-800 tracking-tight leading-none mb-0.5">QR Card</p>
                                    <p className="text-[10px] font-medium text-slate-400 truncate">Enable QR code.</p>
                                </div>
                            </div>
                            <Switch checked={!!watchedSheetShowQrImage} onCheckedChange={(val) => setValue('sheet_show_qr_image', val)} />
                        </div>

                        {/* Archive Toggle */}
                        <div className={cn(
                            "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                            watchedIsArchived ? "border-slate-300 bg-slate-100/50 shadow-sm" : "border-slate-100 bg-slate-50/30"
                        )}>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                                    watchedIsArchived ? "bg-slate-200 text-slate-500 shadow-inner" : "bg-white border border-slate-100 text-slate-400"
                                )}>
                                    <Archive className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[12px] font-black text-slate-800 tracking-tight leading-none mb-0.5">Archive</p>
                                    <p className="text-[10px] font-medium text-slate-400 truncate">Hide profile.</p>
                                </div>
                            </div>
                            <Switch checked={watchedIsArchived} onCheckedChange={(val) => setValue('is_archived', val)} />
                        </div>
                    </div>
                </div>
            </div>
          </TabsContent>

          {/* 2. SERVICES TAB */}
          <TabsContent value="services" className="space-y-6 mt-0 outline-none">
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm ring-1 ring-slate-200/5">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Shared Subscriptions</h2>
                  <p className="text-[13px] font-medium text-slate-600">Services linked to this member.</p>
                </div>
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 font-black border-transparent uppercase tracking-wider text-[10px]">
                  {watchedSubs?.length ?? 0} Active
                </Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {subscriptionOptions.length === 0 ? (
                  <div className="col-span-full py-12 text-center rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50">
                    <Settings className="mx-auto h-8 w-8 text-slate-200 mb-2" />
                    <p className="text-xs font-bold text-slate-400">No services available.</p>
                  </div>
                ) : (
                  subscriptionOptions.map(item => {
                    const checked = watchedSubs?.includes(item.id) ?? false
                    return (
                      <div key={item.id} className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                        checked ? "bg-indigo-50/20 border-indigo-100 shadow-sm" : "border-slate-100 bg-white"
                      )}>
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={cn(
                            "h-11 w-11 rounded-xl shadow-inner border flex items-center justify-center shrink-0 overflow-hidden",
                            checked ? "bg-white border-indigo-100" : "bg-slate-50 border-slate-100"
                          )}>
                            {renderServiceIcon(item.name, item.image_url)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-black text-slate-800 truncate leading-tight mb-0.5">{item.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Shared Service</p>
                          </div>
                        </div>
                        <Switch
                          checked={checked}
                          onCheckedChange={(val) => {
                            const next = val ? [...(watchedSubs || []), item.id] : (watchedSubs || []).filter(id => id !== item.id)
                            setValue('subscriptionIds', next)
                          }}
                        />
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* STICKY FOOTER */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all border border-slate-100"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "flex-[2] rounded-xl px-6 py-3 text-xs font-black uppercase tracking-[0.15em] shadow-lg shadow-indigo-200/50 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-70",
              isSubmitting ? "bg-slate-400 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            )}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              submitLabel ?? (mode === 'create' ? 'Create member profile' : 'Commit changes')
            )}
          </button>
        </div>
        
        {status && (
          <div className={cn(
            "absolute -top-12 left-6 right-6 p-2 rounded-lg text-center text-[11px] font-black uppercase tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-300",
            status.type === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
          )}>
            {status.text}
          </div>
        )}
      </div>
    </form>
  )
}
