import { Droplets, MapPin, Umbrella, Wind } from 'lucide-react'
import { WeatherIcon } from '@/components/weather/weather-icon'
import type { CurrentWeather } from '@/lib/types'

export function CurrentWeatherCard({ weather, showWind = false }: { weather: CurrentWeather; showWind?: boolean }) {
  const stats = [
    { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%` },
    { icon: Umbrella, label: 'Rainfall', value: `${weather.rainfall} mm` },
    ...(showWind ? [{ icon: Wind, label: 'Wind', value: `${weather.windSpeed} km/h` }] : []),
  ]

  return (
    <section
      aria-label="Current weather"
      className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-primary p-6 text-primary-foreground"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-medium opacity-90">
            <MapPin className="size-4" aria-hidden="true" />
            {weather.location}
          </p>
          <p className="mt-3 text-6xl font-bold tracking-tight tabular-nums">{weather.temperature}°C</p>
          <p className="mt-1 text-base opacity-90">
            {weather.summary} · Feels like {weather.feelsLike}°
          </p>
        </div>
        <span className="flex size-16 items-center justify-center rounded-2xl bg-primary-foreground/15">
          <WeatherIcon condition={weather.condition} className="size-10 text-primary-foreground" />
        </span>
      </div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-primary-foreground/10 p-3">
            <dt className="flex items-center gap-1.5 text-sm opacity-90">
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </dt>
            <dd className="mt-1 text-xl font-bold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
