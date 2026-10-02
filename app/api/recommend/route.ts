import { NextResponse } from 'next/server'
import { recommendCrops, SOIL_TYPES } from '@/lib/services/crops'
import type { CropRecommendationInput } from '@/lib/types'

function toNumber(value: unknown, min: number, max: number) {
  const n = Number(value)
  return Number.isFinite(n) && n >= min && n <= max ? n : null
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const soilType = SOIL_TYPES.find((s) => s.value === body.soilType)?.value
  const temperature = toNumber(body.temperature, -10, 55)
  const rainfall = toNumber(body.rainfall, 0, 5000)
  const nitrogen = toNumber(body.nitrogen, 0, 300)
  const phosphorus = toNumber(body.phosphorus, 0, 300)
  const potassium = toNumber(body.potassium, 0, 300)

  if (!soilType || temperature === null || rainfall === null || nitrogen === null || phosphorus === null || potassium === null) {
    return NextResponse.json({ error: 'Please check that every field has a valid value.' }, { status: 400 })
  }

  const input: CropRecommendationInput = {
    soilType,
    location: String(body.location ?? '').slice(0, 80),
    temperature,
    rainfall,
    nitrogen,
    phosphorus,
    potassium,
  }

  return NextResponse.json(await recommendCrops(input))
}
