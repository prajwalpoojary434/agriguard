import type { CropRecommendation, CropRecommendationInput, SoilType } from '@/lib/types'

export const SOIL_TYPES: Array<{ value: SoilType; label: string }> = [
  { value: 'alluvial', label: 'Alluvial' },
  { value: 'black', label: 'Black (Regur)' },
  { value: 'red', label: 'Red' },
  { value: 'laterite', label: 'Laterite' },
  { value: 'sandy', label: 'Sandy' },
  { value: 'clay', label: 'Clay' },
  { value: 'loamy', label: 'Loamy' },
]

interface CropProfile {
  crop: string
  season: string
  duration: string
  soils: SoilType[]
  temp: [number, number]
  rain: [number, number]
  npk: [number, number, number]
}

const CROPS: CropProfile[] = [
  { crop: 'Rice', season: 'Kharif', duration: '110–150 days', soils: ['alluvial', 'clay', 'loamy'], temp: [22, 35], rain: [1000, 2500], npk: [80, 40, 40] },
  { crop: 'Wheat', season: 'Rabi', duration: '120–140 days', soils: ['alluvial', 'loamy', 'clay'], temp: [12, 25], rain: [400, 900], npk: [100, 50, 40] },
  { crop: 'Maize', season: 'Kharif / Rabi', duration: '90–120 days', soils: ['alluvial', 'loamy', 'red', 'black'], temp: [18, 32], rain: [500, 1000], npk: [90, 45, 40] },
  { crop: 'Cotton', season: 'Kharif', duration: '150–180 days', soils: ['black', 'alluvial'], temp: [21, 35], rain: [500, 1000], npk: [100, 50, 50] },
  { crop: 'Groundnut', season: 'Kharif', duration: '100–130 days', soils: ['sandy', 'red', 'loamy'], temp: [22, 33], rain: [500, 1000], npk: [25, 50, 40] },
  { crop: 'Ragi (Finger millet)', season: 'Kharif', duration: '90–120 days', soils: ['red', 'laterite', 'sandy', 'loamy'], temp: [20, 32], rain: [500, 1000], npk: [50, 40, 25] },
  { crop: 'Sugarcane', season: 'Year-round', duration: '10–18 months', soils: ['alluvial', 'black', 'loamy'], temp: [20, 35], rain: [750, 1500], npk: [150, 60, 60] },
  { crop: 'Coconut', season: 'Perennial', duration: '5–6 years to bear', soils: ['laterite', 'sandy', 'red', 'loamy'], temp: [20, 32], rain: [1000, 2500], npk: [50, 30, 120] },
  { crop: 'Tomato', season: 'Rabi / Summer', duration: '90–120 days', soils: ['loamy', 'red', 'sandy'], temp: [18, 30], rain: [400, 800], npk: [100, 60, 60] },
  { crop: 'Chickpea', season: 'Rabi', duration: '95–110 days', soils: ['black', 'loamy', 'clay'], temp: [15, 28], rain: [300, 700], npk: [20, 50, 20] },
]

function rangeScore(value: number, [min, max]: [number, number]) {
  if (value >= min && value <= max) return 1
  const span = max - min
  const distance = value < min ? min - value : value - max
  return Math.max(0, 1 - distance / span)
}

function nutrientScore(actual: number, ideal: number) {
  return Math.max(0, 1 - Math.abs(actual - ideal) / Math.max(ideal, 40))
}

/**
 * Rule-based scoring for the demo. Replace with an ML model or LLM call that
 * returns `CropRecommendation[]`.
 */
export async function recommendCrops(input: CropRecommendationInput): Promise<CropRecommendation[]> {
  const scored = CROPS.map((profile) => {
    const soilMatch = profile.soils.includes(input.soilType)
    const tempScore = rangeScore(input.temperature, profile.temp)
    const rainScore = rangeScore(input.rainfall, profile.rain)
    const nScore = nutrientScore(input.nitrogen, profile.npk[0])
    const pScore = nutrientScore(input.phosphorus, profile.npk[1])
    const kScore = nutrientScore(input.potassium, profile.npk[2])
    const npkScore = (nScore + pScore + kScore) / 3

    const total = (soilMatch ? 0.3 : 0.05) + tempScore * 0.25 + rainScore * 0.25 + npkScore * 0.2

    const reasons: string[] = []
    if (soilMatch) {
      reasons.push(`Grows well in ${input.soilType} soil.`)
    }
    if (tempScore === 1) {
      reasons.push(`${input.temperature}°C is within its ideal range of ${profile.temp[0]}–${profile.temp[1]}°C.`)
    } else if (tempScore > 0.6) {
      reasons.push(`Temperature is close to its ideal range (${profile.temp[0]}–${profile.temp[1]}°C).`)
    }
    if (rainScore === 1) {
      reasons.push(`${input.rainfall} mm annual rainfall matches its water needs.`)
    } else if (rainScore > 0.6) {
      reasons.push(`Rainfall is near its need (${profile.rain[0]}–${profile.rain[1]} mm); plan supplemental irrigation.`)
    }
    if (npkScore > 0.7) {
      reasons.push('Your soil N-P-K levels suit this crop with little extra fertilizer.')
    } else if (nScore < 0.5) {
      reasons.push(`Needs more nitrogen — about ${profile.npk[0]} kg/ha is ideal.`)
    }
    if (input.location.trim()) {
      reasons.push(`Commonly grown in the ${profile.season} season around ${input.location.trim()}.`)
    }

    return {
      crop: profile.crop,
      season: profile.season,
      duration: profile.duration,
      suitability: Math.round(total * 100),
      reasons,
    }
  })

  await new Promise((resolve) => setTimeout(resolve, 700))
  return scored.sort((a, b) => b.suitability - a.suitability).slice(0, 4)
}
