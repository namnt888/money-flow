'use client'

import { useEffect, useMemo, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import { BotMessageSquare, Copy, Settings2, Sparkles, ShieldCheck, ShieldAlert, TriangleAlert, Activity, Waves, Zap, PanelRightOpen } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Textarea } from '../ui/textarea'
import { Sheet, SheetTrigger } from '../ui/sheet'
import { cn } from '../../lib/utils'
import {
  FLOW_BOT_STORAGE_KEY,
  createDefaultFlowBotSettings,
  estimateTokens,
  type FlowBotProviderStatus,
  type FlowBotSettings,
} from '../../lib/flow-bot'
import { FlowBotSettingsSheet } from './flow-bot-settings-sheet'

type FlowBotMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
}

const initialMessages: FlowBotMessage[] = [
  {
    id: 'assistant-welcome',
    role: 'assistant',
    content: 'Flow Bot is ready. Open settings in the right slide, then send a prompt to preview the chat-first workflow.',
  },
]

const statusMeta: Record<FlowBotProviderStatus, { label: string; className: string; icon: typeof ShieldCheck }> = {
  ready: { label: 'Ready', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: ShieldCheck },
  'needs-key': { label: 'Missing key', className: 'bg-amber-50 text-amber-700 border-amber-200', icon: ShieldAlert },
  depleted: { label: 'Budget exhausted', className: 'bg-rose-50 text-rose-700 border-rose-200', icon: TriangleAlert },
  disabled: { label: 'Disabled', className: 'bg-slate-50 text-slate-500 border-slate-200', icon: ShieldAlert },
}

function loadSettings(): FlowBotSettings {
  if (typeof window === 'undefined') {
    return createDefaultFlowBotSettings()
  }

  try {
    const stored = window.localStorage.getItem(FLOW_BOT_STORAGE_KEY)
    if (!stored) return createDefaultFlowBotSettings()
    const parsed = JSON.parse(stored) as FlowBotSettings
    return parsed?.providers?.length ? parsed : createDefaultFlowBotSettings()
  } catch {
    return createDefaultFlowBotSettings()
  }
}

function snapshotProvider(provider: FlowBotSettings['providers'][number]) {
  const remaining = provider.monthlyTokenBudget - provider.usedTokens
  const status: FlowBotProviderStatus = !provider.enabled
    ? 'disabled'
    : provider.apiKey.trim()
      ? (remaining > 0 ? 'ready' : 'depleted')
      : 'needs-key'

  return {
    remaining,
    status,
  }
}

export function FlowBotWorkspace() {
  const [settings, setSettings] = useState<FlowBotSettings>(createDefaultFlowBotSettings)
  const [messages, setMessages] = useState<FlowBotMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [healthTick, setHealthTick] = useState(() => new Date().toISOString())

  useEffect(() => {
    setSettings(loadSettings())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(FLOW_BOT_STORAGE_KEY, JSON.stringify(settings))
  }, [hydrated, settings])

  const activeProvider = useMemo(() => {
    return settings.providers.find((provider) => provider.id === settings.activeProviderId) ?? settings.providers[0]
  }, [settings.activeProviderId, settings.providers])

  const activeSnapshot = activeProvider ? snapshotProvider(activeProvider) : null
  const totalRemaining = settings.providers.reduce((sum: number, provider: FlowBotSettings['providers'][number]) => sum + Math.max(snapshotProvider(provider).remaining, 0), 0)
  const readyCount = settings.providers.filter((provider: FlowBotSettings['providers'][number]) => snapshotProvider(provider).status === 'ready').length
  const promptTokens = estimateTokens(draft)

  const setNextSettings = (nextSettings: FlowBotSettings) => {
    setSettings({ ...nextSettings, updatedAt: new Date().toISOString() })
    setHealthTick(new Date().toISOString())
  }

  const handleSend = () => {
    const content = draft.trim()
    if (!content || !activeProvider) return

    const assistantContent = `Flow Bot shell captured your message under ${activeProvider.label}. Phase 1 keeps token tracking local until the live runtime lands.`
    const spend = estimateTokens(content) + estimateTokens(assistantContent)

    setMessages((current: FlowBotMessage[]) => [
      ...current,
      { id: `${Date.now()}-user`, role: 'user', content },
      { id: `${Date.now()}-assistant`, role: 'assistant', content: assistantContent },
    ])

    setSettings((current: FlowBotSettings) => ({
      ...current,
      updatedAt: new Date().toISOString(),
      providers: current.providers.map((provider: FlowBotSettings['providers'][number]) => {
        if (provider.id !== activeProvider.id) return provider
        return { ...provider, usedTokens: provider.usedTokens + spend }
      }),
    }))

    setDraft('')
    setHealthTick(new Date().toISOString())
  }

  const handleCopyLink = async (label: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setMessages((current: FlowBotMessage[]) => [
        ...current,
        {
          id: `${Date.now()}-copy`,
          role: 'assistant',
          content: `${label} URL copied to clipboard.`,
        },
      ])
    } catch {
      setMessages((current: FlowBotMessage[]) => [
        ...current,
        {
          id: `${Date.now()}-copy-fallback`,
          role: 'assistant',
          content: `Copy failed. Open the provider page manually: ${url}`,
        },
      ])
    }
  }

  return (
    <div className="min-h-[calc(100vh-1.5rem)] w-full bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(99,102,241,0.12),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eff6ff_48%,_#eef2ff_100%)]">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-7xl flex-col px-3 py-3 sm:px-4 lg:px-6">
        <div className="mb-3 flex flex-row items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-white/85 px-3 py-2 shadow-sm backdrop-blur sm:px-4 sm:py-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
              <BotMessageSquare className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-black tracking-tight text-slate-950 sm:text-base truncate">Flow Bot</h1>
              <div className="text-[10px] font-semibold text-slate-500 truncate hidden sm:block">Chat-first workspace</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 justify-end sm:gap-2 shrink-0">
            <Badge className={cn('rounded-full border px-2 py-1 text-xs font-bold hidden sm:flex', activeSnapshot?.status ? statusMeta[activeSnapshot.status].className : 'bg-slate-50 text-slate-500 border-slate-200')}>
              {activeSnapshot?.status ? statusMeta[activeSnapshot.status].label : 'No provider'}
            </Badge>
            <Badge className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-xs font-bold text-sky-700 hidden xs:flex">
              {Math.max(activeSnapshot?.remaining ?? 0, 0) > 9999 ? `${(Math.max(activeSnapshot?.remaining ?? 0, 0) / 1000).toFixed(0)}k` : Math.max(activeSnapshot?.remaining ?? 0, 0)}
            </Badge>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button type="button" className="h-9 rounded-xl bg-slate-950 px-3 text-white hover:bg-slate-800 sm:h-10 sm:px-4">
                  <Settings2 className="h-4 w-4" />
                  <span className="ml-1 hidden sm:inline">Settings</span>
                </Button>
              </SheetTrigger>
              <FlowBotSettingsSheet
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                settings={settings}
                onSettingsChange={setNextSettings}
                onCopyProviderLink={handleCopyLink}
                onTestToken={(message: string) => {
                  setMessages((current: FlowBotMessage[]) => [
                    ...current,
                    { id: `${Date.now()}-test`, role: 'assistant', content: message },
                  ])
                }}
              />
            </Sheet>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <Card className="flex min-h-[calc(100vh-10.5rem)] flex-1 flex-col overflow-hidden border-slate-200/80 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:min-h-[calc(100vh-9rem)]">
            <CardContent className="flex h-full flex-1 flex-col p-0">
              <div className="hidden sm:flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Main chat</div>
                  <div className="text-sm font-semibold text-slate-600">Full-tab canvas for mobile and desktop</div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  Health updated {new Date(healthTick).toLocaleTimeString('vi-VN')}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[80%]',
                        message.role === 'user'
                          ? 'ml-auto rounded-br-md bg-slate-950 text-white'
                          : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
                      )}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 bg-white px-3 py-3 sm:px-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-bold text-indigo-700">Token estimate live</Badge>
                  <Badge className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-bold text-slate-600">Mobile full-screen ready</Badge>
                  <Badge className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-bold text-emerald-700">Settings in right slide</Badge>
                </div>
                <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
                  <Textarea
                    value={draft}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDraft(event.target.value)}
                    placeholder="Ask about cashback, budget, Telegram, or token health..."
                    className="min-h-[110px] rounded-2xl border-slate-200 bg-white text-sm"
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <Badge className="rounded-full bg-white text-slate-700 border-slate-200">Prompt {promptTokens.toLocaleString()} tokens</Badge>
                      <Badge className="rounded-full bg-white text-slate-700 border-slate-200">Remaining {Math.max((activeSnapshot?.remaining ?? 0) - promptTokens, 0).toLocaleString()}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" className="h-11 rounded-xl border-slate-200" onClick={() => setSheetOpen(true)}>
                        <PanelRightOpen className="mr-2 h-4 w-4" /> Settings
                      </Button>
                      <Button type="button" onClick={handleSend} className="h-11 rounded-xl bg-slate-950 px-5 font-semibold text-white hover:bg-slate-800">
                        <Waves className="mr-2 h-4 w-4" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Badge className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-bold text-slate-600">Active {activeProvider?.label ?? 'None'}</Badge>
              <Badge className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-bold text-sky-700">Remaining {Math.max(activeSnapshot?.remaining ?? 0, 0).toLocaleString()}</Badge>
              <Badge className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-bold text-emerald-700">Ready {readyCount}</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Copy className="h-3.5 w-3.5" />
              Copy provider links from settings slide.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
