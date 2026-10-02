import { ArrowRight, CloudSun, IndianRupee, Lightbulb, ScanLine, Sprout } from 'lucide-react'
import Link from 'next/link'

const ACTIONS = [
  { href: '/disease', label: 'Crop Disease Detection', description: 'Snap a leaf photo to find disease', icon: ScanLine, tone: 'bg-primary text-primary-foreground' },
  { href: '/weather', label: 'Weather Forecast', description: 'Plan the week ahead', icon: CloudSun, tone: 'bg-chart-3/15 text-chart-3' },
  { href: '/recommend', label: 'Crop Recommendation', description: 'Best crops for your soil', icon: Sprout, tone: 'bg-success/15 text-success' },
  { href: '/market', label: 'Market Prices', description: "Today's mandi rates", icon: IndianRupee, tone: 'bg-accent/30 text-accent-foreground dark:text-accent' },
  { href: '/assistant', label: 'Farming Tips', description: 'Ask the farming assistant', icon: Lightbulb, tone: 'bg-chart-4/15 text-chart-4' },
]

export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title">
      <h2 id="quick-actions-title" className="mb-4 text-xl font-bold">
        Quick actions
      </h2>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {ACTIONS.map(({ href, label, description, icon: Icon, tone }, index) => (
          <li key={href} className={index === 0 ? 'col-span-2 md:col-span-1' : undefined}>
            <Link
              href={href}
              className="group flex h-full min-h-36 flex-col justify-between gap-4 rounded-2xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className={`flex size-12 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span>
                <span className="flex items-center justify-between gap-2 text-base font-semibold leading-tight">
                  {label}
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
