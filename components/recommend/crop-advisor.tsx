'use client'

import { CalendarDays, Check, Clock, Loader2, Sprout } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SOIL_TYPES } from '@/lib/services/crops'
import type { CropRecommendation } from '@/lib/types'

const NUMERIC_FIELDS = [
  { name: 'temperature', label: 'Average temperature', unit: '°C', defaultValue: 28, min: -10, max: 55 },
  { name: 'rainfall', label: 'Annual rainfall', unit: 'mm', defaultValue: 1100, min: 0, max: 5000 },
  { name: 'nitrogen', label: 'Nitrogen (N)', unit: 'kg/ha', defaultValue: 80, min: 0, max: 300 },
  { name: 'phosphorus', label: 'Phosphorus (P)', unit: 'kg/ha', defaultValue: 40, min: 0, max: 300 },
  { name: 'potassium', label: 'Potassium (K)', unit: 'kg/ha', defaultValue: 40, min: 0, max: 300 },
] as const

export function CropAdvisor() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<CropRecommendation[] | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = Object.fromEntries(new FormData(event.currentTarget))
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Something went wrong.')
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border bg-card p-5 lg:col-span-2">
        <div className="grid gap-2">
          <Label htmlFor="soilType" className="text-base">Soil type</Label>
          <select
            id="soilType"
            name="soilType"
            defaultValue="alluvial"
            className="h-12 w-full rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {SOIL_TYPES.map((soil) => (
              <option key={soil.value} value={soil.value}>
                {soil.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location" className="text-base">Location</Label>
          <Input id="location" name="location" defaultValue="Mandya, Karnataka" placeholder="Village or district" className="h-12 text-base" autoComplete="address-level2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {NUMERIC_FIELDS.slice(0, 2).map((field) => (
            <NumberField key={field.name} {...field} />
          ))}
        </div>

        <fieldset className="grid gap-3 rounded-xl bg-muted/60 p-4">
          <legend className="sr-only">Soil nutrients</legend>
          <p className="text-base font-semibold">Soil nutrients (from soil test)</p>
          <div className="grid grid-cols-3 gap-3">
            {NUMERIC_FIELDS.slice(2).map((field) => (
              <NumberField key={field.name} {...field} compact />
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="h-12 text-base" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Sprout aria-hidden="true" />}
          {loading ? 'Finding best crops…' : 'Get recommendations'}
        </Button>
      </form>

      <div aria-live="polite" className="lg:col-span-3">
        {results ? (
          <ol className="flex flex-col gap-4">
            {results.map((rec, index) => (
              <li key={rec.crop} className="rounded-2xl border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        index === 0
                          ? 'flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground'
                          : 'flex size-10 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-secondary-foreground'
                      }
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold">{rec.crop}</h3>
                      {index === 0 && <p className="text-sm font-semibold text-primary">Best match</p>}
                    </div>
                  </div>
                  <p className="text-right">
                    <span className="block text-2xl font-bold tabular-nums">{rec.suitability}%</span>
                    <span className="text-xs text-muted-foreground">suitability</span>
                  </p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${rec.suitability}%` }} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    {rec.season}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                    <Clock className="size-4" aria-hidden="true" />
                    {rec.duration}
                  </span>
                </div>
                {rec.reasons.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {rec.reasons.map((reason) => (
                      <li key={reason} className="flex gap-2 text-base">
                        <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden="true" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
            <Sprout className="size-10" aria-hidden="true" />
            <p className="max-w-xs text-base">Fill in your farm details to see which crops will grow best.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function NumberField({
  name,
  label,
  unit,
  defaultValue,
  min,
  max,
  compact = false,
}: {
  name: string
  label: string
  unit: string
  defaultValue: number
  min: number
  max: number
  compact?: boolean
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className={compact ? 'text-sm' : 'text-base'}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type="number"
          inputMode="decimal"
          required
          min={min}
          max={max}
          defaultValue={defaultValue}
          className="h-12 bg-background pr-14 text-base tabular-nums"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}
