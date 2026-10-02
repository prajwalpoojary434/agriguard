import { Droplets } from 'lucide-react'
import { conditionLabel, WeatherIcon } from '@/components/weather/weather-icon'
import type { ForecastDay } from '@/lib/types'

export function ForecastList({ forecast }: { forecast: ForecastDay[] }) {
  const min = Math.min(...forecast.map((d) => d.low))
  const max = Math.max(...forecast.map((d) => d.high))
  const span = Math.max(1, max - min)

  return (
    <ul className="divide-y">
      {forecast.map((day) => (
        <li key={day.date} className="grid grid-cols-[4.5rem_2.5rem_1fr] items-center gap-3 py-3 sm:grid-cols-[6rem_2.5rem_7rem_1fr]">
          <div>
            <p className="font-semibold">{day.day}</p>
            <p className="text-xs text-muted-foreground">{day.date}</p>
          </div>
          <WeatherIcon condition={day.condition} className="size-7" />
          <p className="hidden items-center gap-1 text-sm text-chart-3 sm:flex">
            <Droplets className="size-4" aria-hidden="true" />
            <span className="tabular-nums">{day.rainChance}%</span>
            <span className="sr-only">chance of rain, {conditionLabel(day.condition)}</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="w-8 text-right text-sm text-muted-foreground tabular-nums">{day.low}°</span>
            <div className="relative h-2 flex-1 rounded-full bg-muted" aria-hidden="true">
              <div
                className="absolute inset-y-0 rounded-full bg-gradient-to-r from-chart-3 via-chart-2 to-chart-4"
                style={{
                  left: `${((day.low - min) / span) * 100}%`,
                  right: `${100 - ((day.high - min) / span) * 100}%`,
                }}
              />
            </div>
            <span className="w-8 text-sm font-semibold tabular-nums">{day.high}°</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
