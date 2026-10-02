import type { LucideIcon } from 'lucide-react'

export function WeatherStat({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-bold tabular-nums">
          {value}
          {unit && <span className="ml-0.5 text-sm font-medium text-muted-foreground">{unit}</span>}
        </p>
      </div>
    </div>
  )
}
