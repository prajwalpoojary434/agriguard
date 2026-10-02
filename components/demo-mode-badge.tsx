import { FlaskConical } from 'lucide-react'
import { DEMO_MODE } from '@/lib/config'
import { cn } from '@/lib/utils'

export function DemoModeBadge({ className }: { className?: string }) {
  if (!DEMO_MODE) return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-accent/60 bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground dark:text-accent',
        className,
      )}
      title="Some data in this app is simulated for demonstration"
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      <FlaskConical className="size-3.5" aria-hidden="true" />
      Demo Mode
    </span>
  )
}

export function DemoNotice({ children }: { children: React.ReactNode }) {
  if (!DEMO_MODE) return null
  return (
    <p className="flex items-start gap-2 rounded-xl border border-dashed border-accent/70 bg-accent/10 px-4 py-3 text-sm text-foreground/80">
      <FlaskConical className="mt-0.5 size-4 shrink-0 text-accent-foreground dark:text-accent" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
