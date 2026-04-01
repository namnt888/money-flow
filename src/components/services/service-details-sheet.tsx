'use client'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    deleteServiceAction,
    updateServiceMembersAction,
    distributeServiceAction,
    confirmServicePaymentAction,
    getServiceBotConfigAction,
    saveServiceBotConfigAction,
    getServicePaymentStatusAction,
    upsertServiceAction,
    getGlobalServiceBotConfigAction
} from '@/actions/service-actions'
import { toast } from 'sonner'
import { Trash2, CreditCard, Loader2, Bot, CheckCircle2, Users, UserPlus, Settings, Check, Send, Plus, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { getShopsAction } from '@/actions/shop-actions'
import { Select } from '@/components/ui/select'
import { toYYYYMMFromDate } from '@/lib/month-tag'
import { ServicePaymentDialog } from './service-payment-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ServiceTransactionsTable } from './service-transactions-table'

interface ServiceDetailsSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    service: any
    members: any[]
    allPeople: any[]
}

export function ServiceDetailsSheet({ open, onOpenChange, service, members, allPeople }: ServiceDetailsSheetProps) {
    const [watchedMembers, setWatchedMembers] = useState<any[]>(members)
    const [isDistributing, setIsDistributing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
    const router = useRouter()

    // Settings State
    const [name, setName] = useState(service.name)
    const [price, setPrice] = useState(service.price || 0)
    const [shopId, setShopId] = useState(service.shop_id || 'none')
    const [imageUrl, setImageUrl] = useState(service.image_url || '')
    const [shops, setShops] = useState<any[]>([])
    const [isSavingDetails, setIsSavingDetails] = useState(false)
    const [maxSlots, setMaxSlots] = useState<number>(service.max_slots || 0)

    // Bot Config State
    const [isBotEnabled, setIsBotEnabled] = useState(false)
    const [botRunDay, setBotRunDay] = useState(1)
    const [botRunHour, setBotRunHour] = useState(9)
    const [botNoteTemplate, setBotNoteTemplate] = useState('')
    const [isBotLoading, setIsBotLoading] = useState(false)
    const [globalConfig, setGlobalConfig] = useState<any>(null)

    // Payment Status State
    const [paymentStatus, setPaymentStatus] = useState<{ confirmed: boolean, amount: number }>({ confirmed: false, amount: 0 })
    const [checkingPayment, setCheckingPayment] = useState(false)

    const dateObj = new Date()
    const monthTag = toYYYYMMFromDate(dateObj)

    useEffect(() => {
        if (open) {
            setWatchedMembers(members)
            setName(service.name)
            setPrice(service.price || 0)
            setShopId(service.shop_id || 'none')
            setImageUrl(service.image_url || '')
            setMaxSlots(service.max_slots || 0)
            loadBotConfig()
            checkPaymentStatus()
            fetchShops()
        }
    }, [open, service.id, members])

    async function fetchShops() {
        const data = await getShopsAction()
        if (data) setShops(data)
    }

    async function checkPaymentStatus() {
        setCheckingPayment(true)
        try {
            const status = await getServicePaymentStatusAction(service.id, monthTag)
            setPaymentStatus(status)
        } catch (error) {
            console.error('Failed to check payment status:', error)
        } finally {
            setCheckingPayment(false)
        }
    }

    async function loadBotConfig() {
        setIsBotLoading(true)
        try {
            const config: any = await getServiceBotConfigAction(service.id)
            if (config) {
                setIsBotEnabled(config.is_enabled || false)
                if (config.config) {
                    const c = config.config as any
                    setBotRunDay(c.runDay || 1)
                    setBotRunHour(c.runHour || 9)
                    setBotNoteTemplate(c.noteTemplate || service.note_template || '')
                }
            } else {
                setBotNoteTemplate(service.note_template || `{service} {date} [{slots} slots] [{price}]`)
            }
        } catch (error) {
            console.error('Failed to load bot config:', error)
        } finally {
            setIsBotLoading(false)
        }
        
        // Load Global Config
        try {
            const gConfig = await getGlobalServiceBotConfigAction()
            setGlobalConfig(gConfig?.is_enabled ? gConfig.config : null)
        } catch (e) {}
    }

    function insertVariable(variable: string) {
        const input = document.getElementById('botNoteTemplateInput') as HTMLInputElement;
        if (!input) {
            setBotNoteTemplate(prev => prev + variable);
            return;
        }
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const currentText = botNoteTemplate;
        const newText = currentText.substring(0, start) + variable + currentText.substring(end);
        setBotNoteTemplate(newText);
        setTimeout(() => {
            input.focus();
            input.setSelectionRange(start + variable.length, start + variable.length);
        }, 0);
    }

    function formatVNDLabel(value: number) {
        if (!value) return ''
        if (value >= 1000000) {
            const triệu = value / 1000000
            return `${triệu.toFixed(triệu % 1 === 0 ? 0 : 1)} triệu`
        }
        if (value >= 1000) {
            const ngàn = value / 1000
            return `${ngàn.toFixed(ngàn % 1 === 0 ? 0 : 1)} ngàn`
        }
        return `${value} đ`
    }

    async function handleSaveSettings() {
        setIsSavingDetails(true)
        try {
            const serviceUpdate = {
                id: service.id,
                name,
                price: Number(price),
                shop_id: shopId === 'none' ? null : shopId,
                image_url: imageUrl || null,
                note_template: botNoteTemplate,
                max_slots: Number(maxSlots)
            }
            await upsertServiceAction(serviceUpdate)
            await saveServiceBotConfigAction(service.id, {
                isEnabled: isBotEnabled,
                runDay: botRunDay,
                runHour: botRunHour,
                noteTemplate: botNoteTemplate
            })
            toast.success('Settings saved successfully')
            onOpenChange(false)
            router.refresh()
        } catch (error) {
            toast.error('Failed to save settings')
        } finally {
            setIsSavingDetails(false)
        }
    }

    async function handleDistribute() {
        setIsDistributing(true)
        try {
            const result = await distributeServiceAction(service.id, undefined, botNoteTemplate)
            if (result.success) {
                toast.success('Service distributed successfully')
                router.refresh()
            } else {
                toast.error(result.error)
            }
        } catch (error) {
            toast.error('Failed to distribute service')
        } finally {
            setIsDistributing(false)
        }
    }

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this service?')) return
        setIsDeleting(true)
        try {
            const result = await deleteServiceAction(service.id)
            if (result.success) {
                toast.success('Service deleted successfully')
                onOpenChange(false)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        } catch (error) {
            toast.error('Failed to delete service')
        } finally {
            setIsDeleting(false)
        }
    }

    async function handleUpdateMember(memberId: string, updates: any) {
        const updatedMembers = watchedMembers.map(m =>
            m.id === memberId ? { ...m, ...updates } : m
        )
        if (maxSlots > 0) {
            const newTotal = updatedMembers.reduce((sum, m) => sum + (m.slots || 0), 0)
            if (newTotal > maxSlots) {
                toast.error(`Cannot exceed max slots (${maxSlots})`)
                return
            }
        }
        setWatchedMembers(updatedMembers)
        const result = await updateServiceMembersAction(service.id, updatedMembers)
        router.refresh()
    }

    async function handleAddMember(profileId: string) {
        const profile = allPeople.find(p => p.id === profileId)
        if (!profile) return
        if (maxSlots > 0) {
            const currentTotal = watchedMembers.reduce((sum, m) => sum + (m.slots || 0), 0)
            if (currentTotal + 1 > maxSlots) {
                toast.error(`Cannot add member. Max slots (${maxSlots}) reached.`)
                return
            }
        }
        const newMember = { person_id: profileId, slots: 1, is_owner: false, person: profile }
        const updatedMembers = [...watchedMembers, newMember]
        setWatchedMembers(updatedMembers)
        await updateServiceMembersAction(service.id, updatedMembers)
        toast.success('Member added')
        router.refresh()
        setSearchQuery('')
        setIsAddMemberDialogOpen(false)
    }

    async function handleRemoveMember(memberId: string) {
        if (!confirm('Are you sure you want to remove this member?')) return
        const updatedMembers = watchedMembers.filter(m => m.id !== memberId)
        setWatchedMembers(updatedMembers)
        await updateServiceMembersAction(service.id, updatedMembers)
        router.refresh()
    }

    const totalSlots = watchedMembers.reduce((sum, m) => sum + (m.slots || 0), 0)
    const unitCost = totalSlots > 0 ? (price || 0) / totalSlots : 0
    const isAmountChanged = paymentStatus.confirmed && paymentStatus.amount !== price
    const showConfirmed = paymentStatus.confirmed && !isAmountChanged

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-0 gap-0 flex flex-col border-l">
                <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
                    <div className="flex items-center justify-between mt-4">
                        <SheetTitle className="text-xl font-bold flex items-center gap-3">
                            <div className="h-10 w-10 rounded-none bg-blue-50 flex items-center justify-center text-blue-600 overflow-hidden">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="" className="h-full w-full object-cover rounded-none" />
                                ) : service.shop?.image_url ? (
                                    <img src={service.shop.image_url} alt="" className="h-full w-full object-cover rounded-none" />
                                ) : (
                                    <Users className="h-5 w-5" />
                                )}
                            </div>
                            {service.name}
                        </SheetTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => !showConfirmed && setIsPaymentDialogOpen(true)}
                                disabled={showConfirmed}
                                size="sm"
                                variant="outline"
                                className={cn(
                                    "rounded-lg h-9 transition-all",
                                    showConfirmed
                                        ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                                        : "border-green-200 text-green-600 hover:bg-green-600 hover:text-white hover:border-green-600"
                                )}
                            >
                                {showConfirmed ? <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> : <Check className="mr-1.5 h-3.5 w-3.5" />}
                                {showConfirmed ? 'Confirmed' : 'Confirm'}
                            </Button>
                            <Button
                                onClick={handleDistribute}
                                disabled={isDistributing || watchedMembers.length === 0}
                                size="sm"
                                variant="outline"
                                className="border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 rounded-lg h-9 transition-all disabled:opacity-50"
                            >
                                {isDistributing ? <Loader2 className="animate-spin h-3.5 w-3.5 mr-1.5" /> : <Send className="h-3.5 w-3.5 mr-1.5" />}
                                Distribute
                            </Button>
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto min-h-0">
                    <div className="p-6 space-y-8">
                        {/* Settings Section */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Service Configuration
                            </h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-600">Service Name</Label>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg h-10 border-slate-200" placeholder="e.g. Youtube Premium" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-slate-600">Monthly Price (VNĐ)</Label>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-none">{formatVNDLabel(price || 0)}</span>
                                    </div>
                                    <Input
                                        type="text"
                                        value={price === 0 ? '' : price.toLocaleString('en-US')}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '')
                                            setPrice(val ? parseInt(val) : 0)
                                        }}
                                        className="rounded-lg h-10 border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-600">Max Slots</Label>
                                    <Input
                                        type="text"
                                        value={maxSlots === 0 ? '' : maxSlots}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '')
                                            setMaxSlots(val ? parseInt(val) : 0)
                                        }}
                                        className="rounded-lg h-10 border-slate-200"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label className="text-slate-600">Note Template</Label>
                                    <Input 
                                        id="botNoteTemplateInput"
                                        value={botNoteTemplate} 
                                        onChange={(e) => setBotNoteTemplate(e.target.value)} 
                                        className="font-mono text-sm rounded-lg h-10 border-slate-200" 
                                        placeholder="{service} {date}..." 
                                    />
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {[
                                            { label: '{service}', value: '{service}', hint: 'Service Name' },
                                            { label: '{date}', value: '{date}', hint: 'YYYY-MM' },
                                            { label: '{slots}', value: '{slots}', hint: 'Member Slots' },
                                            { label: '{price}', value: '{price}', hint: 'Price/Slot' },
                                            { label: '{total_slots}', value: '{total_slots}', hint: 'Total Service Slots' },
                                            { label: '{member}', value: '{member}', hint: 'Member Name' },
                                            { label: '{initialPrice}', value: '{initialPrice}', hint: 'Full Price' },
                                        ].map((v) => (
                                            <button
                                                key={v.value}
                                                type="button"
                                                onClick={() => insertVariable(v.value)}
                                                className="px-2 py-1 rounded-md bg-slate-100 hover:bg-blue-100 hover:text-blue-600 text-[10px] font-mono text-slate-500 transition-colors border border-transparent hover:border-blue-200 flex flex-col items-center gap-0.5"
                                                title={v.hint}
                                            >
                                                <span>{v.label}</span>
                                                <span className="text-[8px] opacity-70 font-sans tracking-tighter">{v.hint}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-3 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Real-time Preview</p>
                                        <p className="text-xs font-mono text-slate-600 break-all">
                                            {botNoteTemplate
                                                .replace(/{service}/g, name || 'Service')
                                                .replace(/{date}/g, monthTag)
                                                .replace(/{member}/g, 'Member ABC')
                                                .replace(/{slots}/g, '1')
                                                .replace(/{price}/g, (price || 0).toLocaleString())
                                                .replace(/{total_slots}/g, (service.max_slots || 6).toString())
                                                .replace(/{initialPrice}/g, (price || 0).toLocaleString())
                                                .replace(/{{slots}}/g, '1')
                                                .replace(/{{price}}/g, (price || 0).toLocaleString())
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label className="text-slate-600">Service Image URL</Label>
                                    <div className="relative">
                                        <Input
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            className="rounded-lg h-10 pl-10 border-slate-200"
                                            placeholder="Paste image link here..."
                                        />
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/30 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                            <Bot className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <Label className="text-base font-bold text-slate-900">Auto Distribute</Label>
                                            <p className="text-sm text-slate-500">Enable automatic bot distribution monthly</p>
                                        </div>
                                    </div>
                                    <Switch checked={isBotEnabled} onCheckedChange={setIsBotEnabled} />
                                </div>
                                
                                {isBotEnabled && (
                                    <>
                                        {globalConfig ? (
                                            <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                                                <Bot className="h-5 w-5 text-blue-600 shrink-0" />
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Using Global Schedule</p>
                                                    <p className="text-xs text-slate-500">
                                                        Day {globalConfig.runDay}, {globalConfig.runHour?.toString().padStart(2, '0')}:00
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-4 pt-2">
                                                <div className="space-y-1.5">
                                                    <Label className="text-xs font-semibold text-slate-600 uppercase">Run Day (1-31)</Label>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        max={31}
                                                        value={botRunDay || ''}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value)
                                                            setBotRunDay(isNaN(val) ? 0 : val)
                                                        }}
                                                        className="rounded-lg h-10 border-slate-200 bg-white"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label className="text-xs font-semibold text-slate-600 uppercase">Run Hour (0-23)</Label>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        max={23}
                                                        value={botRunHour === 0 ? 0 : (botRunHour || '')}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value)
                                                            setBotRunHour(isNaN(val) ? 0 : val)
                                                        }}
                                                        className="rounded-lg h-10 border-slate-200 bg-white"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Members Section */}
                        <div className="space-y-6 border-t pt-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        Member Management
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        {maxSlots > 0 ? `${totalSlots} / ${maxSlots} slots occupied` : `${watchedMembers.length} active members`}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 rounded-lg border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-medium"
                                    onClick={() => setIsAddMemberDialogOpen(true)}
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Add Member
                                </Button>
                            </div>

                            <div className="grid gap-3">
                                {watchedMembers.length === 0 ? (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                                        <p className="text-sm text-slate-400">No members added yet</p>
                                    </div>
                                ) : (
                                    watchedMembers.map((member) => (
                                        <div
                                            key={member.id || member.person_id}
                                            className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all group"
                                            onClick={() => router.push(`/people/${member.person?.pocketbase_id || member.person_id}`)}
                                        >
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div className={cn("h-12 w-12 rounded-none flex items-center justify-center text-lg font-bold flex-shrink-0 overflow-hidden",
                                                    member.person?.is_owner ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600')}>
                                                    {member.person?.image_url ? (
                                                        <img src={member.person.image_url} alt="" className="h-full w-full object-cover rounded-none" />
                                                    ) : (
                                                        member.person?.name?.substring(0, 1).toUpperCase() || '?'
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <span className="text-base font-bold text-slate-900 truncate">
                                                        {member.person?.name || 'Unknown'}
                                                        {member.is_owner && <span className="ml-2 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-none uppercase">Payer</span>}
                                                    </span>
                                                    <span className="text-sm text-slate-500 font-medium">{Math.round(unitCost * member.slots).toLocaleString()} ₫ per slot</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-xs font-bold text-slate-400 uppercase">Slots</Label>
                                                    <Input
                                                        type="number"
                                                        className="w-16 h-9 text-center border-slate-200 rounded-lg focus:ring-blue-500"
                                                        value={member.slots}
                                                        onChange={(e) => handleUpdateMember(member.id, { slots: parseInt(e.target.value) || 0 })}
                                                    />
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                                    onClick={() => handleRemoveMember(member.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t p-6 flex gap-3 flex-shrink-0 bg-slate-50/50">
                    <Button
                        onClick={handleSaveSettings}
                        className="flex-1 rounded-lg h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all font-bold"
                        disabled={isSavingDetails}
                    >
                        {isSavingDetails ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
                        Save Settings
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg h-12 px-6 transition-all font-semibold"
                    >
                        {isDeleting ? <Loader2 className="animate-spin h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Add Member Dialog (Keep as Dialog) */}
                <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
                    <DialogContent className="sm:max-w-md rounded-2xl overflow-hidden p-0 gap-0">
                        <DialogHeader className="p-6 border-b bg-slate-50/50">
                            <DialogTitle className="flex items-center gap-2 text-slate-900">
                                <UserPlus className="h-5 w-5 text-blue-600" />
                                Add New Member
                            </DialogTitle>
                        </DialogHeader>
                        <div className="p-6 space-y-4">
                            <Input
                                placeholder="🔍 Search by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="rounded-xl h-11 border-slate-200 shadow-sm transition-all focus:ring-blue-500"
                                autoFocus
                            />
                            <div className="max-h-[350px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                                {allPeople
                                    .filter(p =>
                                        !watchedMembers.some(m => m.person_id === p.id) &&
                                        (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    )
                                    .map(person => (
                                        <button
                                            key={person.id}
                                            onClick={() => handleAddMember(person.id)}
                                            className="w-full flex items-center gap-4 p-3 hover:bg-blue-50/50 rounded-xl transition-all text-left border border-transparent hover:border-blue-100 group"
                                        >
                                            <div className="h-11 w-11 rounded-none bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                                                {person.image_url ? (
                                                    <img src={person.image_url} alt="" className="h-full w-full object-cover rounded-none" />
                                                ) : (
                                                    person.name.substring(0, 1).toUpperCase()
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-sm font-bold text-slate-900">{person.name}</span>
                                                <span className="text-xs text-slate-500 truncate font-medium">{person.email || 'No email defined'}</span>
                                            </div>
                                            <Plus className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                        </button>
                                    ))}
                                {allPeople.filter(p =>
                                    !watchedMembers.some(m => m.person_id === p.id) &&
                                    (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                ).length === 0 && (
                                        <div className="py-12 text-center">
                                            <p className="text-sm text-slate-400 font-medium">No results found for "{searchQuery}"</p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <ServicePaymentDialog
                    open={isPaymentDialogOpen}
                    onOpenChange={setIsPaymentDialogOpen}
                    service={service}
                    onConfirm={async (accountId, amount, date) => {
                        await confirmServicePaymentAction(service.id, accountId, amount, date, monthTag)
                        await checkPaymentStatus()
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}
