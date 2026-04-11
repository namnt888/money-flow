'use client'

import { useMemo, type ChangeEvent } from 'react'
import { Copy, ExternalLink, Globe2, KeyRound, MessageCircle, ShieldCheck, ShieldAlert, TriangleAlert, CheckCircle } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Textarea } from '../ui/textarea'
import { cn } from '../../lib/utils'
import {
  FLOW_BOT_FREE_PROVIDER_CATALOG,
  type FlowBotProviderConfig,
  type FlowBotProviderId,
  type FlowBotProviderStatus,
  type FlowBotSettings,
} from '../../lib/flow-bot'

interface FlowBotSettingsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: FlowBotSettings
  onSettingsChange: (next: FlowBotSettings) => void
  onCopyProviderLink: (label: string, url: string) => void
  onTestToken?: (message: string) => void
}

const statusMeta: Record<FlowBotProviderStatus, { label: string; className: string; icon: typeof ShieldCheck }> = {
  ready: { label: 'Ready', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: ShieldCheck },
  'needs-key': { label: 'Missing key', className: 'bg-amber-50 text-amber-700 border-amber-200', icon: ShieldAlert },
  depleted: { label: 'Budget exhausted', className: 'bg-rose-50 text-rose-700 border-rose-200', icon: TriangleAlert },
  disabled: { label: 'Disabled', className: 'bg-slate-50 text-slate-500 border-slate-200', icon: ShieldAlert },
}

export function FlowBotSettingsSheet({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
  onCopyProviderLink,
  onTestToken,
}: FlowBotSettingsSheetProps) {
  const activeProvider = useMemo(
    () => settings.providers.find((provider) => provider.id === settings.activeProviderId) ?? settings.providers[0],
    [settings.activeProviderId, settings.providers]
  )

  const updateProvider = (providerId: FlowBotProviderId, patch: Partial<FlowBotProviderConfig>) => {
    onSettingsChange({
      ...settings,
      updatedAt: new Date().toISOString(),
      providers: settings.providers.map((provider) =>
        provider.id === providerId ? { ...provider, ...patch } : provider
      ),
    })
  }

  const updateTelegram = (patch: Partial<FlowBotSettings['telegram']>) => {
    onSettingsChange({
      ...settings,
      updatedAt: new Date().toISOString(),
      telegram: { ...settings.telegram, ...patch },
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-hidden p-0 sm:max-w-3xl md:max-w-4xl">
        <div className="flex h-full flex-col bg-slate-50">
          <SheetHeader className="border-b border-slate-200 bg-white px-5 py-4 text-left shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <SheetTitle className="text-xl font-black tracking-tight">Flow Bot Settings</SheetTitle>
                <SheetDescription className="text-sm text-slate-500">
                  Auth, provider list, Telegram lane, and token budget are kept here. The main page stays chat-first.
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <Tabs defaultValue="providers" className="space-y-4">
              <TabsList className="grid h-auto grid-cols-3 rounded-2xl bg-slate-100 p-1">
                <TabsTrigger value="providers" className="rounded-xl py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Providers</TabsTrigger>
                <TabsTrigger value="telegram" className="rounded-xl py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Telegram</TabsTrigger>
                <TabsTrigger value="catalog" className="rounded-xl py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">Free APIs</TabsTrigger>
              </TabsList>

              <TabsContent value="providers" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                  <Card className="border-slate-200/80 shadow-sm">
                    <CardHeader className="space-y-2 border-b border-slate-100">
                      <CardTitle className="text-2xl font-black tracking-tight">Active Provider</CardTitle>
                      <CardDescription>
                        Select the active provider, paste the key, and set the local token budget. This is a shell for phase 2 health checks.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-5">
                      {settings.providers.map((provider) => {
                        const StatusIcon = statusMeta[(provider.enabled ? (provider.apiKey ? 'ready' : 'needs-key') : 'disabled') as FlowBotProviderStatus].icon
                        const status = provider.enabled ? (provider.apiKey ? 'ready' : 'needs-key') : 'disabled'
                        const snapshot = {
                          remaining: provider.monthlyTokenBudget - provider.usedTokens,
                          status,
                        }

                        return (
                          <div key={provider.id} className={cn('rounded-3xl border p-4 transition-colors', settings.activeProviderId === provider.id ? 'border-slate-900 bg-white shadow-sm' : 'border-slate-200 bg-slate-50/80')}>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-black">{provider.label}</h3>
                                  <Badge className={cn('rounded-full border px-3 py-1 font-bold', statusMeta[status].className)}>
                                    <StatusIcon className="mr-1 h-3.5 w-3.5" />
                                    {statusMeta[status].label}
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-500">{provider.notes}</p>
                              </div>
                              <Button
                                type="button"
                                variant={settings.activeProviderId === provider.id ? 'default' : 'outline'}
                                className={cn('h-10 rounded-xl px-4', settings.activeProviderId === provider.id ? 'bg-slate-950 text-white hover:bg-slate-800' : 'border-slate-200')}
                                onClick={() => onSettingsChange({ ...settings, activeProviderId: provider.id, updatedAt: new Date().toISOString() })}
                              >
                                {settings.activeProviderId === provider.id ? 'Active' : 'Set active'}
                              </Button>
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                              <label className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">API key</span>
                                <Input
                                  value={provider.apiKey}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) => updateProvider(provider.id, { apiKey: event.target.value })}
                                  placeholder={`Paste ${provider.label} key`}
                                  className="h-11 rounded-xl border-slate-200 bg-white"
                                />
                              </label>
                              <label className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Model</span>
                                <Input
                                  value={provider.model}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) => updateProvider(provider.id, { model: event.target.value })}
                                  className="h-11 rounded-xl border-slate-200 bg-white"
                                />
                              </label>
                              <label className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Monthly token budget</span>
                                <Input
                                  type="number"
                                  min="0"
                                  value={provider.monthlyTokenBudget}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) => updateProvider(provider.id, { monthlyTokenBudget: Number(event.target.value) || 0 })}
                                  className="h-11 rounded-xl border-slate-200 bg-white"
                                />
                              </label>
                              <label className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Used tokens</span>
                                <Input
                                  type="number"
                                  min="0"
                                  value={provider.usedTokens}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) => updateProvider(provider.id, { usedTokens: Number(event.target.value) || 0 })}
                                  className="h-11 rounded-xl border-slate-200 bg-white"
                                />
                              </label>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                              <div className="rounded-2xl bg-white px-4 py-3 border border-slate-200">
                                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Remaining</div>
                                <div className="mt-1 text-lg font-black">{Math.max(snapshot.remaining, 0).toLocaleString()}</div>
                              </div>
                              <div className="rounded-2xl bg-white px-4 py-3 border border-slate-200">
                                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Availability</div>
                                <div className="mt-1 text-lg font-black">
                                  {provider.monthlyTokenBudget > 0 ? `${Math.max(Math.round((Math.max(snapshot.remaining, 0) / provider.monthlyTokenBudget) * 100), 0)}%` : 'n/a'}
                                </div>
                              </div>
                              <div className="rounded-2xl bg-white px-4 py-3 border border-slate-200">
                                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Source</div>
                                <div className="mt-1 text-sm font-semibold text-slate-600">{activeProvider?.id === provider.id ? 'Main lane' : 'Standby lane'}</div>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3 sm:grid sm:grid-cols-2">
                              <Button
                                type="button"
                                variant="outline"
                                className="h-10 rounded-xl border-slate-200 flex-1 sm:flex-none"
                                onClick={() => {
                                  const catalogItem = FLOW_BOT_FREE_PROVIDER_CATALOG.find((item) => item.id === provider.id)
                                  if (catalogItem) {
                                    window.open(catalogItem.siteUrl, '_blank')
                                  }
                                }}
                              >
                                <ExternalLink className="mr-2 h-4 w-4" /> Open page
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className="h-10 rounded-xl border-slate-200 flex-1 sm:flex-none"
                                onClick={() => {
                                  if (!provider.apiKey.trim()) {
                                    alert('Please enter an API key first')
                                    return
                                  }
                                  onTestToken?.(`Testing ${provider.label} token: ${provider.apiKey.slice(0, 4)}***... (Phase 2 will add real validation here)`)
                                }}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" /> Test token
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200/80 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <MessageCircle className="h-5 w-5 text-indigo-600" />
                        Quick lane
                      </CardTitle>
                      <CardDescription>
                        Keep Telegram ready and separated from the chat shell.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Active provider</div>
                        <div className="mt-1 text-xl font-black">{activeProvider?.label ?? 'None'}</div>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Health note</div>
                        <div className="mt-1 text-sm leading-6 text-slate-600">Phase 2 will replace this local snapshot with live token and auth validation.</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="telegram" className="space-y-4">
                <Card className="border-slate-200/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black tracking-tight">Telegram setup</CardTitle>
                    <CardDescription>
                      This lane is isolated from the main chat surface. Use it for webhook and chat id prep.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 lg:grid-cols-3">
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Bot token</span>
                      <Input value={settings.telegram.botToken} onChange={(event: ChangeEvent<HTMLInputElement>) => updateTelegram({ botToken: event.target.value })} className="h-11 rounded-xl border-slate-200 bg-white" placeholder="123456:ABC..." />
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Webhook secret</span>
                      <Input value={settings.telegram.webhookSecret} onChange={(event: ChangeEvent<HTMLInputElement>) => updateTelegram({ webhookSecret: event.target.value })} className="h-11 rounded-xl border-slate-200 bg-white" placeholder="shared-secret" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Chat id</span>
                      <Input value={settings.telegram.chatId} onChange={(event: ChangeEvent<HTMLInputElement>) => updateTelegram({ chatId: event.target.value })} className="h-11 rounded-xl border-slate-200 bg-white" placeholder="-100..." />
                    </label>
                    <label className="space-y-2 lg:col-span-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Notes</span>
                      <Textarea value={settings.telegram.enabled ? 'Telegram lane is enabled' : 'Telegram lane is currently off'} readOnly className="min-h-[100px] rounded-3xl border-slate-200 bg-slate-50" />
                    </label>
                    <div className="lg:col-span-3 flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Toggle</div>
                        <div className="text-sm font-semibold text-slate-600">Enable Telegram support when you are ready.</div>
                      </div>
                      <Button type="button" variant={settings.telegram.enabled ? 'default' : 'outline'} className={cn('h-11 rounded-xl px-5', settings.telegram.enabled ? 'bg-slate-950 text-white' : 'border-slate-200')} onClick={() => updateTelegram({ enabled: !settings.telegram.enabled })}>
                        {settings.telegram.enabled ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="catalog" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {FLOW_BOT_FREE_PROVIDER_CATALOG.map((item: (typeof FLOW_BOT_FREE_PROVIDER_CATALOG)[number]) => (
                    <Card key={item.id} className="border-slate-200/80 shadow-sm">
                      <CardHeader className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <CardTitle className="text-xl font-black">{item.label}</CardTitle>
                          <Badge className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">{item.badge}</Badge>
                        </div>
                        <CardDescription className="leading-6">{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-slate-400" /> {item.siteUrl}</div>
                          <div className="flex items-center gap-2"><KeyRound className="h-4 w-4 text-slate-400" /> {item.keyHint}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" variant="outline" className="h-10 rounded-xl border-slate-200" onClick={() => onCopyProviderLink(item.label, item.siteUrl)}>
                            <Copy className="mr-2 h-4 w-4" /> Copy
                          </Button>
                          <Button type="button" className="h-10 rounded-xl bg-slate-950 text-white hover:bg-slate-800" asChild>
                            <a href={item.docsUrl} target="_blank" rel="noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" /> Open docs
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
