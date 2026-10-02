import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { getPriceChange } from '@/lib/services/market'
import type { MarketPrice } from '@/lib/types'
import { cn } from '@/lib/utils'

export function PriceTrendBadge({ item }: { item: MarketPrice }) {
  const { percent, direction } = getPriceChange(item)
  const Icon = direction === 'up' ? ArrowUpRight : direction === 'down' ? ArrowDownRight : Minus
  const label = direction === 'up' ? 'Rising' : direction === 'down' ? 'Falling' : 'Stable'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold tabular-nums',
        direction === 'up' && 'bg-success/15 text-success',
        direction === 'down' && 'bg-destructive/10 text-destructive',
        direction === 'flat' && 'bg-muted text-muted-foreground',
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="sr-only">{label}</span>
      {direction === 'flat' ? '0.0' : `${percent > 0 ? '+' : ''}${percent.toFixed(1)}`}%
    </span>
  )
}

export function Sparkline({ values, className }: { values: number[]; className?: string }) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const width = 96
  const height = 32
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * width},${height - 2 - ((v - min) / range) * (height - 4)}`)
    .join(' ')
  const rising = values.at(-1)! >= values[0]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('h-8 w-24', rising ? 'text-success' : 'text-destructive', className)}
      aria-hidden="true"
    >
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
}
