import { Eye, Pill, ShieldCheck, type LucideIcon } from 'lucide-react'
import type { DiseaseResult } from '@/lib/types'
import { cn } from '@/lib/utils'

const SEVERITY = {
  low: { label: 'Low severity', className: 'bg-success/15 text-success' },
  moderate: { label: 'Moderate severity', className: 'bg-accent/30 text-accent-foreground dark:text-accent' },
  high: { label: 'High severity', className: 'bg-destructive/10 text-destructive' },
}

function Section({ icon: Icon, title, items, tone }: { icon: LucideIcon; title: string; items: string[]; tone: string }) {
  return (
    <section>
      <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
        <span className={cn('flex size-8 items-center justify-center rounded-lg', tone)}>
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {title}
      </h3>
      <ol className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={item} className="flex gap-3 rounded-xl bg-muted/60 p-3 text-base leading-relaxed">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background text-sm font-bold tabular-nums">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </section>
  )
}

export function DiseaseResultCard({ result }: { result: DiseaseResult }) {
  const severity = SEVERITY[result.severity]

  return (
    <article className="flex flex-col gap-6 rounded-2xl border bg-card p-5">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">{result.crop}</span>
          <span className={cn('rounded-full px-3 py-1 text-sm font-semibold', severity.className)}>{severity.label}</span>
        </div>
        <h2 className="text-2xl font-bold">{result.disease}</h2>
        <div>
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-muted-foreground">Confidence</span>
            <span className="font-bold tabular-nums">{result.confidence}%</span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={result.confidence}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Detection confidence"
          >
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${result.confidence}%` }} />
          </div>
        </div>
      </header>

      <Section icon={Eye} title="Symptoms" items={result.symptoms} tone="bg-chart-3/15 text-chart-3" />
      <Section icon={Pill} title="Treatment" items={result.treatment} tone="bg-chart-4/15 text-chart-4" />
      <Section icon={ShieldCheck} title="Prevention" items={result.prevention} tone="bg-success/15 text-success" />
    </article>
  )
}
