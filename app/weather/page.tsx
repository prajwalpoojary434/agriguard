import { CloudSun, Droplets, Gauge, Sun, Thermometer, Umbrella, Wind } from 'lucide-react'
import type { Metadata } from 'next'
import { DemoNotice } from '@/components/demo-mode-badge'
import { PageHeader } from '@/components/page-header'
import { CurrentWeatherCard } from '@/components/weather/current-weather-card'
import { ForecastList } from '@/components/weather/forecast-list'
import { WeatherStat } from '@/components/weather/weather-stat'
import { getWeather } from '@/lib/services/weather'

export const metadata: Metadata = { title: 'Weather', description: 'Current conditions and a 7-day farm forecast.' }

export const dynamic = 'force-dynamic'

export default async function WeatherPage() {
  const { current, forecast, advisory } = await getWeather()
  const weeklyRain = forecast.reduce((sum, d) => sum + d.rainfall, 0)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader icon={CloudSun} title="Weather" description="Current conditions and the week ahead for your farm." />
      <DemoNotice>Simulated weather data. Connect a provider in lib/services/weather.ts.</DemoNotice>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CurrentWeatherCard weather={current} />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-2">
          <WeatherStat icon={Thermometer} label="Temperature" value={current.temperature} unit="°C" />
          <WeatherStat icon={Droplets} label="Humidity" value={current.humidity} unit="%" />
          <WeatherStat icon={Umbrella} label="Rainfall today" value={current.rainfall} unit="mm" />
          <WeatherStat icon={Wind} label="Wind speed" value={current.windSpeed} unit="km/h" />
          <WeatherStat icon={Sun} label="UV index" value={current.uvIndex} />
          <WeatherStat icon={Gauge} label="Rain this week" value={weeklyRain} unit="mm" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <section aria-labelledby="forecast-title" className="rounded-2xl border bg-card p-5 lg:col-span-3">
          <h2 id="forecast-title" className="mb-2 text-xl font-bold">
            7-day forecast
          </h2>
          <ForecastList forecast={forecast} />
        </section>
        <section aria-labelledby="tips-title" className="flex flex-col gap-4 rounded-2xl border bg-secondary/50 p-5 lg:col-span-2">
          <h2 id="tips-title" className="text-xl font-bold">
            What this means for your farm
          </h2>
          <p className="text-base leading-relaxed">{advisory}</p>
          <ul className="flex flex-col gap-3 text-base">
            <li className="rounded-xl bg-card p-4">
              <span className="font-semibold">Irrigation:</span> Skip watering for the next 4–5 days — rain will cover it.
            </li>
            <li className="rounded-xl bg-card p-4">
              <span className="font-semibold">Spraying:</span> Best window is the next 2 days, early morning with low wind.
            </li>
            <li className="rounded-xl bg-card p-4">
              <span className="font-semibold">Disease risk:</span> High humidity raises fungal risk. Inspect leaves after the rain.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
