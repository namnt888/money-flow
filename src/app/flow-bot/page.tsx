import type { Metadata } from 'next'
import { FlowBotWorkspace } from '@/components/flow-bot/flow-bot-workspace'

export const metadata: Metadata = {
  title: 'Flow Bot | Money Flow 3',
  description: 'A new Flow Bot workspace for token-aware financial assistant settings and sandbox chat.',
}

export default function FlowBotPage() {
  return <FlowBotWorkspace />
}