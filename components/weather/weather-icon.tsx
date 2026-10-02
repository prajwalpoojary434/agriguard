import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSun, Sun, type LucideIcon } from 'lucide-react'
import type { WeatherCondition } from '@/lib/types'
import { cn } from '@/lib/utils'

const ICONS: Record<WeatherCondition, { icon: LucideIcon; label: string; color: string }> = {
  sunny: { icon: Sun, label: 'Sunny', color: 'text-accent-foreground dark:text-accent' },
  'partly-cloudy': { icon: CloudSun, label: 'Partly cloudy', color: 'text-accent-foreground dark:text-accent' },
  cloudy: { icon: Cloud, label: 'Cloudy', color: 'text-muted-foreground' },
  drizzle: { icon: CloudDrizzle, label: 'Drizzle', color: 'text-chart-3' },
  rain: { icon: CloudRain, label: 'Rain', color: 'text-chart-3' },
  storm: { icon: CloudLightning, label: 'Thunderstorm', color: 'text-chart-3' },
}

export function conditionLabel(condition: WeatherCondition) {
  return ICONS[condition].label
}

export function WeatherIcon({ condition, className }: { condition: WeatherCondition; className?: string }) {
  const { icon: Icon, label, color } = ICONS[condition]
  return <Icon className={cn(color, className)} aria-label={label} role="img" />
}
