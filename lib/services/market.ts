import type { MarketPrice } from '@/lib/types'

const PRICES: MarketPrice[] = [
  { crop: 'Rice', variety: 'Sona Masuri', unit: 'quintal', price: 3250, previousPrice: 3180, market: 'Mandya APMC', history: [3050, 3090, 3120, 3100, 3160, 3180, 3250] },
  { crop: 'Wheat', variety: 'Lokwan', unit: 'quintal', price: 2580, previousPrice: 2610, market: 'Indore Mandi', history: [2640, 2630, 2650, 2620, 2600, 2610, 2580] },
  { crop: 'Tomato', variety: 'Hybrid', unit: 'quintal', price: 1820, previousPrice: 1450, market: 'Kolar APMC', history: [1200, 1260, 1310, 1380, 1420, 1450, 1820] },
  { crop: 'Onion', variety: 'Red (Nashik)', unit: 'quintal', price: 2150, previousPrice: 2380, market: 'Lasalgaon', history: [2600, 2540, 2490, 2450, 2410, 2380, 2150] },
  { crop: 'Maize', variety: 'Yellow', unit: 'quintal', price: 2190, previousPrice: 2190, market: 'Davangere APMC', history: [2160, 2170, 2180, 2195, 2185, 2190, 2190] },
  { crop: 'Coconut', variety: 'Tender', unit: '100 nuts', price: 2800, previousPrice: 2650, market: 'Tiptur APMC', history: [2500, 2540, 2560, 2600, 2620, 2650, 2800] },
  { crop: 'Cotton', variety: 'Long staple', unit: 'quintal', price: 7120, previousPrice: 7210, market: 'Raichur APMC', history: [7300, 7280, 7260, 7240, 7230, 7210, 7120] },
  { crop: 'Turmeric', variety: 'Salem', unit: 'quintal', price: 13400, previousPrice: 12950, market: 'Erode', history: [12400, 12550, 12700, 12800, 12900, 12950, 13400] },
]

/** Swap for a live source such as data.gov.in Agmarknet. */
export async function getMarketPrices(): Promise<MarketPrice[]> {
  return PRICES
}

export function getPriceChange(item: MarketPrice) {
  const diff = item.price - item.previousPrice
  const percent = item.previousPrice === 0 ? 0 : (diff / item.previousPrice) * 100
  const direction: 'up' | 'down' | 'flat' = Math.abs(percent) < 0.5 ? 'flat' : diff > 0 ? 'up' : 'down'
  return { diff, percent, direction }
}
