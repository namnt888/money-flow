export type FlowBotProviderId = 'gemini' | 'opencode' | 'openrouter' | 'groq'

export type FlowBotProviderStatus = 'ready' | 'needs-key' | 'depleted' | 'disabled'

export type FlowBotProviderConfig = {
  id: FlowBotProviderId
  label: string
  model: string
  apiKey: string
  monthlyTokenBudget: number
  usedTokens: number
  enabled: boolean
  notes: string
}

export type FlowBotTelegramConfig = {
  enabled: boolean
  botToken: string
  webhookSecret: string
  chatId: string
}

export type FlowBotSettings = {
  activeProviderId: FlowBotProviderId
  providers: FlowBotProviderConfig[]
  telegram: FlowBotTelegramConfig
  updatedAt: string
}

export const FLOW_BOT_STORAGE_KEY = 'flow-bot-settings-v1'

export type FlowBotProviderCatalogItem = {
  id: string
  label: string
  badge: string
  description: string
  siteUrl: string
  docsUrl: string
  keyHint: string
}

export const FLOW_BOT_FREE_PROVIDER_CATALOG: FlowBotProviderCatalogItem[] = [
  {
    id: 'gemini',
    label: 'Gemini',
    badge: 'Best free tier',
    description: 'Fast, practical, and the easiest fallback for Vietnamese UX. Good starting point for Flow Bot.',
    siteUrl: 'https://aistudio.google.com/app/apikey',
    docsUrl: 'https://ai.google.dev/gemini-api/docs',
    keyHint: 'AI Studio key for Gemini API',
  },
  {
    id: 'groq',
    label: 'Groq',
    badge: 'Low latency',
    description: 'Very fast inference with generous free developer access for prompt routing and quick replies.',
    siteUrl: 'https://console.groq.com/keys',
    docsUrl: 'https://console.groq.com/docs',
    keyHint: 'Groq API key',
  },
  {
    id: 'openrouter',
    label: 'OpenRouter',
    badge: 'Model switchboard',
    description: 'One dashboard for many models. Free routes vary, so keep it as a flexible fallback.',
    siteUrl: 'https://openrouter.ai/keys',
    docsUrl: 'https://openrouter.ai/docs',
    keyHint: 'OpenRouter API key',
  },
  {
    id: 'huggingface',
    label: 'Hugging Face',
    badge: 'Open ecosystem',
    description: 'Great for open models, experimentation, and lower-cost options when you want more control.',
    siteUrl: 'https://huggingface.co/settings/tokens',
    docsUrl: 'https://huggingface.co/docs',
    keyHint: 'Hugging Face token',
  },
  {
    id: 'cloudflare',
    label: 'Cloudflare Workers AI',
    badge: 'Edge ready',
    description: 'Useful when you want low-latency hosted inference close to the edge.',
    siteUrl: 'https://dash.cloudflare.com/',
    docsUrl: 'https://developers.cloudflare.com/workers-ai/',
    keyHint: 'Cloudflare account + API token',
  },
  {
    id: 'deepinfra',
    label: 'DeepInfra',
    badge: 'Pay-as-you-go',
    description: 'Good backup when you need broad open-model support and cheap experimentation.',
    siteUrl: 'https://deepinfra.com/dash/api_keys',
    docsUrl: 'https://deepinfra.com/docs',
    keyHint: 'DeepInfra API key',
  },
  {
    id: 'mistral',
    label: 'Mistral',
    badge: 'Compact models',
    description: 'Useful for concise, efficient assistant responses and alternative free trials/credits.',
    siteUrl: 'https://console.mistral.ai/api-keys/',
    docsUrl: 'https://docs.mistral.ai/',
    keyHint: 'Mistral API key',
  },
  {
    id: 'openai',
    label: 'OpenAI',
    badge: 'Mainstream fallback',
    description: 'Not usually free long-term, but keep it in the list for copy-ready setup when credits are available.',
    siteUrl: 'https://platform.openai.com/api-keys',
    docsUrl: 'https://platform.openai.com/docs',
    keyHint: 'OpenAI API key',
  },
  {
    id: 'opencode',
    label: 'OpenCode',
    badge: 'Local/open lane',
    description: 'Keep this as an open/local profile slot for experiments or self-hosted gateways.',
    siteUrl: 'https://github.com/',
    docsUrl: 'https://github.com/',
    keyHint: 'Self-hosted or local gateway settings',
  },
]

export const FLOW_BOT_PROVIDER_PRESETS: Array<Omit<FlowBotProviderConfig, 'apiKey' | 'monthlyTokenBudget' | 'usedTokens' | 'enabled'>> = [
  {
    id: 'gemini',
    label: 'Gemini',
    model: 'gemini-1.5-flash',
    notes: 'Fast fallback for Vietnamese responses and lightweight routing.',
  },
  {
    id: 'opencode',
    label: 'OpenCode',
    model: 'open-code-default',
    notes: 'Local/open provider profile for free-tier experiments.',
  },
  {
    id: 'openrouter',
    label: 'OpenRouter',
    model: 'openrouter-auto',
    notes: 'Model switchboard for cheap/free compatible routes.',
  },
  {
    id: 'groq',
    label: 'Groq',
    model: 'llama-3.1-8b-instant',
    notes: 'Ultra-fast option when latency matters.',
  },
]

export const createDefaultFlowBotSettings = (): FlowBotSettings => ({
  activeProviderId: 'gemini',
  providers: FLOW_BOT_PROVIDER_PRESETS.map((preset, index) => ({
    ...preset,
    apiKey: '',
    monthlyTokenBudget: index === 0 ? 250000 : 150000,
    usedTokens: 0,
    enabled: index === 0,
  })),
  telegram: {
    enabled: false,
    botToken: '',
    webhookSecret: '',
    chatId: '',
  },
  updatedAt: new Date().toISOString(),
})

export const estimateTokens = (text: string) => {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return Math.max(1, Math.ceil(trimmed.length / 4))
}