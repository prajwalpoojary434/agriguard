export type WeatherCondition =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'storm'
  | 'drizzle'

export interface CurrentWeather {
  location: string
  updatedAt: string
  temperature: number
  feelsLike: number
  humidity: number
  rainfall: number
  windSpeed: number
  uvIndex: number
  condition: WeatherCondition
  summary: string
}

export interface ForecastDay {
  day: string
  date: string
  condition: WeatherCondition
  high: number
  low: number
  rainChance: number
  rainfall: number
}

export interface WeatherReport {
  current: CurrentWeather
  forecast: ForecastDay[]
  advisory: string
}

export interface DiseaseResult {
  disease: string
  crop: string
  confidence: number
  severity: 'low' | 'moderate' | 'high'
  symptoms: string[]
  treatment: string[]
  prevention: string[]
}

export type SoilType = 'alluvial' | 'black' | 'red' | 'laterite' | 'sandy' | 'clay' | 'loamy'

export interface CropRecommendationInput {
  soilType: SoilType
  location: string
  temperature: number
  rainfall: number
  nitrogen: number
  phosphorus: number
  potassium: number
}

export interface CropRecommendation {
  crop: string
  suitability: number
  season: string
  duration: string
  reasons: string[]
}

export interface MarketPrice {
  crop: string
  variety: string
  unit: string
  price: number
  previousPrice: number
  market: string
  history: number[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}
