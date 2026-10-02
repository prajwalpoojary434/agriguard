import { MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { FarmingChat } from '@/components/assistant/farming-chat'
import { DemoModeBadge } from '@/components/demo-mode-badge'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Farming Assistant',
  description: 'Ask any farming question and get practical advice.',
}

export default function AssistantPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader icon={MessageCircle} title="Farming Assistant" description="Ask in simple words — about pests, fertilizer, water, soil or prices.">
        <DemoModeBadge />
      </PageHeader>
      <FarmingChat />
    </div>
  )
}
