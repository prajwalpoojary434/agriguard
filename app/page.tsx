import { AlertTriangle, ArrowRight, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { DemoNotice } from '@/components/demo-mode-badge'
import { formatPrice, PriceTrendBadge } from '@/components/market/price-trend'
import { CurrentWeatherCard } from '@/components/weather/current-weather-card'
import { WeatherIcon } from '@/components/weather/weather-icon'
import { APP_TIMEZONE } from '@/lib/config'
import { getMarketPrices } from '@/lib/services/market'
import { getWeather } from '@/lib/services/weather'

export const dynamic = 'force-dynamic'

function hourInAppTimezone() {
  const hour = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    hourCycle: 'h23',
    timeZone: APP_TIMEZONE,
  })
    .formatToParts(new Date())
    .find((part) => part.type === 'hour')?.value

  return Number(hour)
}

function greeting() {
  const hour = hourInAppTimezone()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default async function DashboardPage() {
  const [weather, prices] = await Promise.all([getWeather(), getMarketPrices()])
  const topPrices = prices.slice(0, 5)

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-3xl">
        <Image
          src="/images/farm-hero.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.2_0.05_150/0.92)] via-[oklch(0.2_0.05_150/0.7)] to-transparent" />
        <div className="relative flex flex-col gap-4 px-6 py-10 text-white md:px-10 md:py-14">
          <p className="flex items-center gap-2 text-sm font-medium text-white/85">
            <Sun className="size-4" aria-hidden="true" />
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              timeZone: APP_TIMEZONE,
            })}
          </p>
          <h1 className="max-w-xl text-balance text-3xl font-bold tracking-tight md:text-5xl">
            {greeting()}, farmer.
          </h1>
          <p className="max-w-lg text-pretty text-base text-white/85 md:text-lg">
            Check your crops, the weather, and today&apos;s prices — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/disease"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-5 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Scan a leaf
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="/assistant"
              className="inline-flex h-12 items-center rounded-xl border border-white/40 bg-white/10 px-5 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <DemoNotice>Weather, prices and AI results shown here are simulated demo data.</DemoNotice>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CurrentWeatherCard weather={weather.current} showWind />
        </div>
        <section aria-labelledby="advisory-title" className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
          <div className="flex items-center gap-2 text-accent-foreground dark:text-accent">
            <AlertTriangle className="size-5" aria-hidden="true" />
            <h2 id="advisory-title" className="text-lg font-bold text-foreground">
              Farm advisory
            </h2>
          </div>
          <p className="text-pretty text-base leading-relaxed">{weather.advisory}</p>
          <ul className="mt-auto flex justify-between gap-1 rounded-xl bg-muted p-3">
            {weather.forecast.slice(0, 5).map((day) => (
              <li key={day.date} className="flex flex-col items-center gap-1 text-sm">
                <span className="font-medium text-muted-foreground">{day.day}</span>
                <WeatherIcon condition={day.condition} className="size-6" />
                <span className="font-semibold tabular-nums">{day.high}°</span>
              </li>
            ))}
          </ul>
          <Link href="/weather" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Full 7-day forecast
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      </div>

      <QuickActions />

      <section aria-labelledby="prices-title" className="rounded-2xl border bg-card">
        <div className="flex items-center justify-between gap-4 border-b p-5">
          <h2 id="prices-title" className="text-xl font-bold">
            Today&apos;s market prices
          </h2>
          <Link href="/market" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View all
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="divide-y">
          {topPrices.map((item) => (
            <li key={item.crop} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-base font-semibold">{item.crop}</p>
                <p className="text-sm text-muted-foreground">{item.market}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-right">
                  <span className="block text-lg font-bold tabular-nums">{formatPrice(item.price)}</span>
                  <span className="block text-xs text-muted-foreground">per {item.unit}</span>
                </p>
                <PriceTrendBadge item={item} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
