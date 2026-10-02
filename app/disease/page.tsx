import { ScanLine } from 'lucide-react'
import type { Metadata } from 'next'
import { DemoNotice } from '@/components/demo-mode-badge'
import { DiseaseDetector } from '@/components/disease/disease-detector'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Disease Detection',
  description: 'Upload a leaf photo to detect crop disease and get treatment advice.',
}

export default function DiseasePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader icon={ScanLine} title="Crop Disease Detection" description="Take a clear photo of a sick leaf to find out what's wrong and how to treat it." />
      <DemoNotice>Results are simulated. Connect a vision model in lib/services/disease.ts.</DemoNotice>
      <DiseaseDetector />
    </div>
  )
}
