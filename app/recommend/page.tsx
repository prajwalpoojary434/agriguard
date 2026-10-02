import { Sprout } from 'lucide-react'
import type { Metadata } from 'next'
import { DemoNotice } from '@/components/demo-mode-badge'
import { PageHeader } from '@/components/page-header'
import { CropAdvisor } from '@/components/recommend/crop-advisor'

export const metadata: Metadata = {
  title: 'Crop Advisor',
  description: 'Find the best crops for your soil, climate and nutrients.',
}

export default function RecommendPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader icon={Sprout} title="Crop Recommendation" description="Tell us about your land and we'll suggest the crops most likely to do well." />
      <DemoNotice>Uses a simple rule-based model. Swap in an ML model in lib/services/crops.ts.</DemoNotice>
      <CropAdvisor />
    </div>
  )
}
