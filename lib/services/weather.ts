import { APP_TIMEZONE, DEFAULT_LOCATION } from '@/lib/config'
import type { ForecastDay, WeatherCondition, WeatherReport } from '@/lib/types'

const FORECAST_PATTERN: Array<{
  condition: WeatherCondition
  high: number
  low: number
  rainChance: number
  rainfall: number
}> = [
  { condition: 'partly-cloudy', high: 31, low: 22, rainChance: 20, rainfall: 0 },
  { condition: 'sunny', high: 33, low: 23, rainChance: 5, rainfall: 0 },
  { condition: 'cloudy', high: 30, low: 22, rainChance: 40, rainfall: 2 },
  { condition: 'rain', high: 27, low: 21, rainChance: 80, rainfall: 18 },
  { condition: 'storm', high: 26, low: 20, rainChance: 90, rainfall: 32 },
  { condition: 'drizzle', high: 28, low: 21, rainChance: 55, rainfall: 4 },
  { condition: 'partly-cloudy', high: 30, low: 22, rainChance: 25, rainfall: 1 },
]

function calendarDateInAppTimezone(daysFromToday: number) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value)

  return new Date(Date.UTC(value('year'), value('month') - 1, value('day') + daysFromToday))
}

function buildForecast(): ForecastDay[] {
  return FORECAST_PATTERN.map((entry, index) => {
    const date = calendarDateInAppTimezone(index)
    return {
      ...entry,
      day: index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
    }
  })
}

/**
 * Replace the body with a real provider call (e.g. OpenWeatherMap, Open-Meteo)
 * and map its response to `WeatherReport`. Callers don't need to change.
 */
export async function getWeather(location: string = DEFAULT_LOCATION): Promise<WeatherReport> {
  return {
    current: {
      location,
      updatedAt: new Date().toISOString(),
      temperature: 29,
      feelsLike: 32,
      humidity: 68,
      rainfall: 3.2,
      windSpeed: 12,
      uvIndex: 7,
      condition: 'partly-cloudy',
      summary: 'Warm and humid with passing clouds',
    },
    forecast: buildForecast(),
    advisory:
      'Heavy rain expected in 3–4 days. Finish pesticide spraying and harvest mature crops before then, and clear field drainage channels.',
  }
}
