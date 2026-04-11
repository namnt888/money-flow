'use client'

import { useState, useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical, Database, RefreshCw, RotateCcw, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { updateBatchSettingsAction, getBatchSettingsAction } from '@/actions/batch-settings.actions'
import { getAccountsAction } from '@/actions/account-actions'
import { BatchMasterManager } from './BatchMasterManager'
import { BatchPhaseManager } from './BatchPhaseManager'
import { toast } from 'sonner'
import { Combobox } from '@/components/ui/combobox'

const DEFAULT_NOTE_FORMAT = '{accountName} {phaseName} {monthYearStr} by {bankType}'

const NOTE_VARIABLES = [
    { label: 'accountName', token: '{accountName}' },
    { label: 'receiverName', token: '{receiverName}' },
    { label: 'phaseName', token: '{phaseName}' },
    { label: 'monthYear', token: '{monthYear}' },
    { label: 'monthYearStr', token: '{monthYearStr}' },
    { label: 'bankType', token: '{bankType}' },
]

function renderNotePreview(template: string, bankType: 'Mbb' | 'Vib') {
    const sample = {
        accountName: 'Vpbank Lady #Mom',
        receiverName: 'Vpbank Lady #Mom',
        phaseName: 'Before 5',
        monthYear: '2026-04',
        monthYearStr: 'Apr2026',
        bankType,
    }

    return String(template || DEFAULT_NOTE_FORMAT).replace(/\{(accountName|receiverName|phaseName|monthYear|monthYearStr|bankType)\}/g, (_match, token) => {
        return String(sample[token as keyof typeof sample] || '')
    })
}

function insertTokenAtCursor(
    inputRef: RefObject<HTMLTextAreaElement | HTMLInputElement | null>,
    currentValue: string,
    nextToken: string,
    setValue: (value: string) => void,
) {
    const element = inputRef.current
    if (!element || typeof element.selectionStart !== 'number' || typeof element.selectionEnd !== 'number') {
        setValue(`${currentValue}${currentValue ? ' ' : ''}${nextToken}`.trim())
        return
    }

    const start = element.selectionStart
    const end = element.selectionEnd
    const nextValue = `${currentValue.slice(0, start)}${nextToken}${currentValue.slice(end)}`
    setValue(nextValue)

    requestAnimationFrame(() => {
        element.focus()
        const cursor = start + nextToken.length
        element.setSelectionRange(cursor, cursor)
    })
}

function NoteFormatEditor({
    label,
    bankType,
    value,
    onChange,
}: {
    label: string
    bankType: 'Mbb' | 'Vib'
    value: string
    onChange: (value: string) => void
}) {
    const inputRef = useRef<HTMLTextAreaElement | null>(null)
    const preview = renderNotePreview(value || DEFAULT_NOTE_FORMAT, bankType)

    return (
        <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</Label>
            <Textarea
                ref={inputRef}
                value={value || DEFAULT_NOTE_FORMAT}
                onChange={(e) => onChange(e.target.value)}
                placeholder={DEFAULT_NOTE_FORMAT}
                className="min-h-[96px] rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"
            />
            <div className="flex flex-wrap gap-2">
                {NOTE_VARIABLES.map((variable) => (
                    <button
                        key={variable.token}
                        type="button"
                        onClick={() => insertTokenAtCursor(inputRef, value || DEFAULT_NOTE_FORMAT, variable.token, onChange)}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                        {variable.label}
                    </button>
                ))}
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
                Tokens: {"{"}accountName{"}"}, {"{"}receiverName{"}"}, {"{"}phaseName{"}"}, {"{"}monthYear{"}"}, {"{"}monthYearStr{"}"}, {"{"}bankType{"}"}
            </p>
            <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 px-3 py-2 text-[11px] font-bold text-indigo-700">
                Preview: <span className="text-slate-900">{preview}</span>
            </div>
        </div>
    )
}

function LinkInputField({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder: string
}) {
    const href = String(value || '').trim()
    const isValid = /^https?:\/\//i.test(href)
    return (
        <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</Label>
            <div className="flex items-center gap-2">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="h-11 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"
                />
                {isValid && (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 shrink-0 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 flex items-center justify-center transition-colors"
                        title="Open in new tab"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                )}
            </div>
        </div>
    )
}

export function BatchSettingsPage({ 
    hideHeader = false, 
    onSuccess,
    initialAccounts = [],
    initialSettings = null
}: { 
    hideHeader?: boolean, 
    onSuccess?: () => void,
    initialAccounts?: any[],
    initialSettings?: { MBB: any, VIB: any } | null
} = {}) {
    const [mbbSheetUrl, setMbbSheetUrl] = useState('')
    const [vibSheetUrl, setVibSheetUrl] = useState('')
    const [mbbImageUrl, setMbbImageUrl] = useState('')
    const [vibImageUrl, setVibImageUrl] = useState('')
    const [mbbWebhookUrl, setMbbWebhookUrl] = useState('')
    const [vibWebhookUrl, setVibWebhookUrl] = useState('')
    const [mbbDisplaySheetUrl, setMbbDisplaySheetUrl] = useState('')
    const [vibDisplaySheetUrl, setVibDisplaySheetUrl] = useState('')
    const [mbbDisplaySheetName, setMbbDisplaySheetName] = useState('')
    const [vibDisplaySheetName, setVibDisplaySheetName] = useState('')
    const [mbbTabName, setMbbTabName] = useState('')
    const [vibTabName, setVibTabName] = useState('')
    const [mbbNoteFormat, setMbbNoteFormat] = useState(DEFAULT_NOTE_FORMAT)
    const [vibNoteFormat, setVibNoteFormat] = useState(DEFAULT_NOTE_FORMAT)
    const [mbbFundSourceAccountId, setMbbFundSourceAccountId] = useState('')
    const [vibFundSourceAccountId, setVibFundSourceAccountId] = useState('')
    const [mbbCutoffDay, setMbbCutoffDay] = useState<number>(15)
    const [vibCutoffDay, setVibCutoffDay] = useState<number>(15)
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(!initialSettings)
    const [accounts, setAccounts] = useState<any[]>(initialAccounts)
    const bankAccounts = accounts.filter((acc) => acc.type === 'bank')

    // Track original values to detect changes
    const [originalMBB, setOriginalMBB] = useState({ sheet: '', image: '', webhook: '', cutoff: 15, displaySheetUrl: '', displaySheetName: '', tabName: '', noteFormat: '', fundSourceAccountId: '' })
    const [originalVIB, setOriginalVIB] = useState({ sheet: '', image: '', webhook: '', cutoff: 15, displaySheetUrl: '', displaySheetName: '', tabName: '', noteFormat: '', fundSourceAccountId: '' })

    const isInitialized = useRef(false)

    // Load settings on mount only if not provided via props or if both are null
    useEffect(() => {
        console.log('[DEBUG] BatchSettingsPage Received Props:', initialSettings)
        const hasData = initialSettings && (initialSettings.MBB || initialSettings.VIB)
        
        // Prevent re-initialization if already done unless props explicitly changed to non-null
        if (isInitialized.current && !initialSettings) return;

        if (!hasData) {
            console.log('[DEBUG] No initial settings data found, calling loadSettings()...')
            loadSettings()
        } else {
            console.log('[DEBUG] Applying initial settings data...')
            // Apply initial settings
            if (initialSettings.MBB) {
                const mbbData = initialSettings.MBB
                console.log('[DEBUG] MBB Data:', mbbData)
                setMbbSheetUrl(mbbData.sheet_url || '')
                setMbbImageUrl(mbbData.image_url || '')
                setMbbWebhookUrl(mbbData.webhook_url || '')
                setMbbCutoffDay(mbbData.cutoff_day ?? 15)
                setMbbDisplaySheetUrl(mbbData.display_sheet_url || '')
                setMbbDisplaySheetName(mbbData.display_sheet_name || '')
                setMbbTabName(mbbData.sheet_name || '')
                setMbbNoteFormat(mbbData.note_format || DEFAULT_NOTE_FORMAT)
                setMbbFundSourceAccountId(mbbData.fund_source_account_id || '')
                
                const originalValue = {
                    sheet: mbbData.sheet_url || '',
                    image: mbbData.image_url || '',
                    webhook: mbbData.webhook_url || '',
                    cutoff: mbbData.cutoff_day ?? 15,
                    displaySheetUrl: mbbData.display_sheet_url || '',
                    displaySheetName: mbbData.display_sheet_name || '',
                    tabName: mbbData.sheet_name || '',
                    noteFormat: mbbData.note_format || '',
                    fundSourceAccountId: mbbData.fund_source_account_id || ''
                }
                setOriginalMBB(originalValue)
            }
            if (initialSettings.VIB) {
                const vibData = initialSettings.VIB
                console.log('[DEBUG] VIB Data:', vibData)
                setVibSheetUrl(vibData.sheet_url || '')
                setVibImageUrl(vibData.image_url || '')
                setVibWebhookUrl(vibData.webhook_url || '')
                setVibCutoffDay(vibData.cutoff_day ?? 15)
                setVibDisplaySheetUrl(vibData.display_sheet_url || '')
                setVibDisplaySheetName(vibData.display_sheet_name || '')
                setVibTabName(vibData.sheet_name || '')
                setVibNoteFormat(vibData.note_format || DEFAULT_NOTE_FORMAT)
                setVibFundSourceAccountId(vibData.fund_source_account_id || '')
                
                const originalValue = {
                    sheet: vibData.sheet_url || '',
                    image: vibData.image_url || '',
                    webhook: vibData.webhook_url || '',
                    cutoff: vibData.cutoff_day ?? 15,
                    displaySheetUrl: vibData.display_sheet_url || '',
                    displaySheetName: vibData.display_sheet_name || '',
                    tabName: vibData.sheet_name || '',
                    noteFormat: vibData.note_format || '',
                    fundSourceAccountId: vibData.fund_source_account_id || ''
                }
                setOriginalVIB(originalValue)
            }
            setInitialLoading(false)
            isInitialized.current = true
        }
    }, [initialSettings])

    async function loadSettings() {
        try {
            const [mbbResult, vibResult, accountsResult] = await Promise.all([
                getBatchSettingsAction('MBB'),
                getBatchSettingsAction('VIB'),
                getAccountsAction()
            ])

            if (Array.isArray(accountsResult)) {
                setAccounts(accountsResult)
            }

            if (mbbResult.success && (mbbResult as any).data) {
                const mbbData = (mbbResult as any).data
                setMbbSheetUrl(mbbData.sheet_url || '')
                setMbbImageUrl(mbbData.image_url || '')
                setMbbWebhookUrl(mbbData.webhook_url || '')
                setMbbCutoffDay(mbbData.cutoff_day || 15)
                setMbbDisplaySheetUrl(mbbData.display_sheet_url || '')
                setMbbDisplaySheetName(mbbData.display_sheet_name || '')
                setMbbTabName(mbbData.sheet_name || '')
                setMbbNoteFormat(mbbData.note_format || DEFAULT_NOTE_FORMAT)
                setMbbFundSourceAccountId(mbbData.fund_source_account_id || '')
                setOriginalMBB({
                    sheet: mbbData.sheet_url || '',
                    image: mbbData.image_url || '',
                    webhook: mbbData.webhook_url || '',
                    cutoff: mbbData.cutoff_day || 15,
                    displaySheetUrl: mbbData.display_sheet_url || '',
                    displaySheetName: mbbData.display_sheet_name || '',
                    tabName: mbbData.sheet_name || '',
                    noteFormat: mbbData.note_format || '',
                    fundSourceAccountId: mbbData.fund_source_account_id || ''
                })
            }

            if (vibResult.success && (vibResult as any).data) {
                const vibData = (vibResult as any).data
                setVibSheetUrl(vibData.sheet_url || '')
                setVibImageUrl(vibData.image_url || '')
                setVibWebhookUrl(vibData.webhook_url || '')
                setVibCutoffDay(vibData.cutoff_day || 15)
                setVibDisplaySheetUrl(vibData.display_sheet_url || '')
                setVibDisplaySheetName(vibData.display_sheet_name || '')
                setVibTabName(vibData.sheet_name || '')
                setVibNoteFormat(vibData.note_format || DEFAULT_NOTE_FORMAT)
                setVibFundSourceAccountId(vibData.fund_source_account_id || '')
                setOriginalVIB({
                    sheet: vibData.sheet_url || '',
                    image: vibData.image_url || '',
                    webhook: vibData.webhook_url || '',
                    cutoff: vibData.cutoff_day || 15,
                    displaySheetUrl: vibData.display_sheet_url || '',
                    displaySheetName: vibData.display_sheet_name || '',
                    tabName: vibData.sheet_name || '',
                    noteFormat: vibData.note_format || '',
                    fundSourceAccountId: vibData.fund_source_account_id || ''
                })
            }
        } catch (error) {
            console.error('Failed to load settings:', error)
            toast.error('Failed to load settings')
        } finally {
            setInitialLoading(false)
        }
    }

    async function handleSaveMBB() {
        setLoading(true)
        try {
            const result = await updateBatchSettingsAction('MBB', {
                sheet_url: mbbSheetUrl || null,
                webhook_url: mbbWebhookUrl || null,
                image_url: mbbImageUrl || null,
                cutoff_day: mbbCutoffDay,
                display_sheet_url: mbbDisplaySheetUrl || null,
                display_sheet_name: mbbDisplaySheetName || null,
                sheet_name: mbbTabName || null,
                note_format: mbbNoteFormat || null,
                fund_source_account_id: mbbFundSourceAccountId || null
            })

            if (result.success) {
                toast.success('MBB settings saved successfully!')
                if (onSuccess) onSuccess()
            } else {
                toast.error(result.error || 'Failed to save MBB settings')
            }
        } catch (error) {
            console.error('Save error:', error)
            toast.error('Failed to save MBB settings')
        } finally {
            setLoading(false)
        }
    }

    async function handleSaveVIB() {
        setLoading(true)
        try {
            const result = await updateBatchSettingsAction('VIB', {
                sheet_url: vibSheetUrl || null,
                webhook_url: vibWebhookUrl || null,
                image_url: vibImageUrl || null,
                cutoff_day: vibCutoffDay,
                display_sheet_url: vibDisplaySheetUrl || null,
                display_sheet_name: vibDisplaySheetName || null,
                sheet_name: vibTabName || null,
                note_format: vibNoteFormat || null,
                fund_source_account_id: vibFundSourceAccountId || null
            })

            if (result.success) {
                toast.success('VIB settings saved successfully!')
                if (onSuccess) onSuccess()
            } else {
                toast.error(result.error || 'Failed to save VIB settings')
            }
        } catch (error) {
            console.error('Save error:', error)
            toast.error('Failed to save VIB settings')
        } finally {
            setLoading(false)
        }
    }

    // Check if there are unsaved changes
    const mbbHasChanges =
        mbbSheetUrl !== originalMBB.sheet ||
        mbbImageUrl !== originalMBB.image ||
        mbbWebhookUrl !== originalMBB.webhook ||
        mbbCutoffDay !== originalMBB.cutoff ||
        mbbDisplaySheetUrl !== originalMBB.displaySheetUrl ||
        mbbDisplaySheetName !== originalMBB.displaySheetName ||
        mbbTabName !== originalMBB.tabName ||
        mbbNoteFormat !== originalMBB.noteFormat ||
        mbbFundSourceAccountId !== originalMBB.fundSourceAccountId

    const vibHasChanges =
        vibSheetUrl !== originalVIB.sheet ||
        vibImageUrl !== originalVIB.image ||
        vibWebhookUrl !== originalVIB.webhook ||
        vibCutoffDay !== originalVIB.cutoff ||
        vibDisplaySheetUrl !== originalVIB.displaySheetUrl ||
        vibDisplaySheetName !== originalVIB.displaySheetName ||
        vibTabName !== originalVIB.tabName ||
        vibNoteFormat !== originalVIB.noteFormat ||
        vibFundSourceAccountId !== originalVIB.fundSourceAccountId

    if (initialLoading) {
        return (
            <div className="bg-slate-50 flex flex-col items-center justify-center p-20 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Settings...</p>
            </div>
        )
    }

    return (
        <div className={hideHeader ? 'bg-white relative' : 'min-h-screen bg-slate-50'}>
            {loading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 border border-slate-100">
                        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                        <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">Saving Changes...</span>
                    </div>
                </div>
            )}
            <div className={hideHeader ? 'px-6 py-6' : 'container mx-auto px-4 py-8 max-w-4xl'}>
                {/* Header */}
                {!hideHeader && (
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/batch">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Batch Settings</h1>
                            <p className="text-slate-600">Configure sheet URLs and webhooks</p>
                        </div>
                    </div>
                )}

                <Tabs defaultValue="mbb" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-2xl h-14 mb-8 shadow-inner border border-slate-200">
                        <TabsTrigger value="mbb" className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:border-indigo-700 data-[state=active]:shadow-md">MB Bank</TabsTrigger>
                        <TabsTrigger value="vib" className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:border-indigo-700 data-[state=active]:shadow-md">VIB Bank</TabsTrigger>
                    </TabsList>

                    <TabsContent value="mbb" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <Tabs defaultValue="settings" className="w-full">
                            <TabsList className="flex bg-transparent p-0 gap-2 mb-6 overflow-x-auto no-scrollbar justify-start">
                                <TabsTrigger value="settings" className="px-6 h-10 rounded-xl border border-slate-200 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-indigo-200 font-bold text-[10px] uppercase tracking-widest">Global Settings</TabsTrigger>
                                <TabsTrigger value="phases" className="px-6 h-10 rounded-xl border border-slate-200 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-indigo-200 font-bold text-[10px] uppercase tracking-widest">Phase List</TabsTrigger>
                                <TabsTrigger value="masters" className="px-6 h-10 rounded-xl border border-slate-200 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-indigo-200 font-bold text-[10px] uppercase tracking-widest">Master Items</TabsTrigger>
                            </TabsList>

                            <TabsContent value="settings" className="space-y-6">
                                <Card className="border-slate-200/60 shadow-lg shadow-slate-100">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">MB Bank Settings</CardTitle>
                                        <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest">Configure Google Sheets integration for MBB batches</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <LinkInputField
                                                label="Google Apps Script URL"
                                                value={mbbSheetUrl}
                                                onChange={setMbbSheetUrl}
                                                placeholder="https://..."
                                            />
                                            <LinkInputField
                                                label="Google Sheet URL (Display)"
                                                value={mbbDisplaySheetUrl}
                                                onChange={setMbbDisplaySheetUrl}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <LinkInputField
                                                label="GAS Webhook URL"
                                                value={mbbWebhookUrl}
                                                onChange={setMbbWebhookUrl}
                                                placeholder="(Legacy/Optional) https://..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</Label>
                                                <Input value={mbbDisplaySheetName} onChange={(e) => setMbbDisplaySheetName(e.target.value)} placeholder="Master MBB" className="h-11 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sheet Tab Name</Label>
                                                <Input value={mbbTabName} onChange={(e) => setMbbTabName(e.target.value)} placeholder="eMB_BulkPayment" className="h-11 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <NoteFormatEditor label="Note Format" bankType="Mbb" value={mbbNoteFormat} onChange={setMbbNoteFormat} />
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step 1 Fund Account</Label>
                                                <Combobox
                                                    items={bankAccounts.map((acc) => ({
                                                        value: acc.id,
                                                        label: acc.name,
                                                        description: acc.account_number ? `Acc ${acc.account_number}` : undefined,
                                                        icon: acc.image_url ? (
                                                            <div className="h-7 w-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                                                <img src={acc.image_url} alt="" className="h-full w-full object-cover" />
                                                            </div>
                                                        ) : (
                                                            <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">
                                                                {String(acc.name || '?').slice(0, 2).toUpperCase()}
                                                            </div>
                                                        ),
                                                        searchValue: `${acc.name || ''} ${acc.account_number || ''} ${acc.bank_code || ''}`.trim(),
                                                    }))}
                                                    value={mbbFundSourceAccountId || undefined}
                                                    onValueChange={(value) => setMbbFundSourceAccountId(value || '')}
                                                    placeholder="Select funding source account"
                                                    inputPlaceholder="Search account name or number..."
                                                    className="w-full h-11 bg-slate-50 border-slate-100"
                                                    hideTriggerBadge
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleSaveMBB} disabled={loading || !mbbHasChanges} className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100">
                                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                                            Save MBB Settings
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="phases">
                                <BatchPhaseManager bankType="MBB" />
                            </TabsContent>

                            <TabsContent value="masters">
                                <BatchMasterManager
                                    bankType="MBB"
                                    accounts={accounts}
                                    bankMappings={[]}
                                />
                            </TabsContent>
                        </Tabs>
                    </TabsContent>

                    <TabsContent value="vib" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <Tabs defaultValue="settings" className="w-full">
                            <TabsList className="flex bg-transparent p-0 gap-2 mb-6 overflow-x-auto no-scrollbar justify-start">
                                <TabsTrigger value="settings" className="px-6 h-10 rounded-xl border border-slate-200 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-indigo-200 font-bold text-[10px] uppercase tracking-widest">Global Settings</TabsTrigger>
                                <TabsTrigger value="phases" className="px-6 h-10 rounded-xl border border-slate-200 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-indigo-200 font-bold text-[10px] uppercase tracking-widest">Phase List</TabsTrigger>
                                <TabsTrigger value="masters" className="px-6 h-10 rounded-xl border border-slate-200 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-indigo-200 font-bold text-[10px] uppercase tracking-widest">Master Items</TabsTrigger>
                            </TabsList>

                            <TabsContent value="settings" className="space-y-6">
                                <Card className="border-slate-200/60 shadow-lg shadow-slate-100">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">VIB Bank Settings</CardTitle>
                                        <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest">Configure Google Sheets integration for VIB batches</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <LinkInputField
                                                label="Google Apps Script URL"
                                                value={vibSheetUrl}
                                                onChange={setVibSheetUrl}
                                                placeholder="https://..."
                                            />
                                            <LinkInputField
                                                label="Google Sheet URL (Display)"
                                                value={vibDisplaySheetUrl}
                                                onChange={setVibDisplaySheetUrl}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <LinkInputField
                                                label="GAS Webhook URL"
                                                value={vibWebhookUrl}
                                                onChange={setVibWebhookUrl}
                                                placeholder="(Legacy/Optional) https://..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</Label>
                                                <Input value={vibDisplaySheetName} onChange={(e) => setVibDisplaySheetName(e.target.value)} placeholder="Master VIB" className="h-11 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sheet Tab Name</Label>
                                                <Input value={vibTabName} onChange={(e) => setVibTabName(e.target.value)} placeholder="Danh sách chuyển tiền" className="h-11 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <NoteFormatEditor label="Note Format" bankType="Vib" value={vibNoteFormat} onChange={setVibNoteFormat} />
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step 1 Fund Account</Label>
                                                <Combobox
                                                    items={bankAccounts.map((acc) => ({
                                                        value: acc.id,
                                                        label: acc.name,
                                                        description: acc.account_number ? `Acc ${acc.account_number}` : undefined,
                                                        icon: acc.image_url ? (
                                                            <div className="h-7 w-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                                                <img src={acc.image_url} alt="" className="h-full w-full object-cover" />
                                                            </div>
                                                        ) : (
                                                            <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">
                                                                {String(acc.name || '?').slice(0, 2).toUpperCase()}
                                                            </div>
                                                        ),
                                                        searchValue: `${acc.name || ''} ${acc.account_number || ''} ${acc.bank_code || ''}`.trim(),
                                                    }))}
                                                    value={vibFundSourceAccountId || undefined}
                                                    onValueChange={(value) => setVibFundSourceAccountId(value || '')}
                                                    placeholder="Select funding source account"
                                                    inputPlaceholder="Search account name or number..."
                                                    className="w-full h-11 bg-slate-50 border-slate-100"
                                                    hideTriggerBadge
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleSaveVIB} disabled={loading || !vibHasChanges} className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100">
                                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                                            Save VIB Settings
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="phases">
                                <BatchPhaseManager bankType="VIB" />
                            </TabsContent>

                            <TabsContent value="masters">
                                <BatchMasterManager
                                    bankType="VIB"
                                    accounts={accounts}
                                    bankMappings={[]}
                                />
                            </TabsContent>
                        </Tabs>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
