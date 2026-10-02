import type { ChatMessage } from '@/lib/types'

export const SUGGESTED_QUESTIONS = [
  'How do I control aphids on my chilli plants?',
  'When should I apply urea to paddy?',
  'What is drip irrigation and is it worth it?',
  'How can I improve my soil naturally?',
]

const RESPONSES: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['aphid', 'pest', 'insect', 'bug', 'whitefly'],
    answer:
      'For aphids and other soft-bodied pests:\n\n1. Spray neem oil (5 ml per litre of water with a few drops of soap) in the evening, every 7 days.\n2. Encourage ladybugs — avoid broad-spectrum insecticides.\n3. Put up yellow sticky traps (10–12 per acre).\n4. If the attack is severe, use Imidacloprid 17.8% SL at 0.3 ml per litre.\n\nAlways check the underside of leaves — that is where aphids hide.',
  },
  {
    keywords: ['urea', 'fertilizer', 'fertiliser', 'nitrogen', 'paddy', 'rice'],
    answer:
      'For paddy, split urea into three doses:\n\n• 50% at transplanting (basal)\n• 25% at tillering (about 20–25 days after transplanting)\n• 25% at panicle initiation (about 45–50 days)\n\nApply when there is a thin layer of water in the field, and avoid applying right before heavy rain to prevent nutrient loss.',
  },
  {
    keywords: ['drip', 'irrigation', 'water', 'sprinkler'],
    answer:
      'Drip irrigation delivers water straight to the roots through pipes and emitters.\n\nBenefits:\n• Saves 30–60% water\n• Raises yield by 20–50% for vegetables and fruits\n• Fewer weeds and less disease\n• Fertilizer can be given through the same pipes (fertigation)\n\nMany state governments offer 50–90% subsidy under PM Krishi Sinchayee Yojana. Check with your local agriculture office.',
  },
  {
    keywords: ['soil', 'compost', 'organic', 'manure', 'health'],
    answer:
      'To improve soil naturally:\n\n1. Add 5–10 tonnes of farmyard manure or compost per acre each year.\n2. Grow green manure crops like sunhemp or dhaincha and plough them in before flowering.\n3. Rotate cereals with pulses — pulses add nitrogen.\n4. Keep soil covered with mulch or crop residue instead of burning it.\n5. Get a soil test every 2–3 years (free under the Soil Health Card scheme).',
  },
  {
    keywords: ['weather', 'rain', 'monsoon', 'forecast'],
    answer:
      'Rain is expected in the next 3–4 days in your area. Finish spraying and harvesting before then, clear drainage channels, and hold back irrigation for now. Open the Weather page for the full 7-day forecast.',
  },
  {
    keywords: ['price', 'market', 'sell', 'mandi'],
    answer:
      'Tomato and coconut prices are rising this week, while onion prices are falling. If you can store onions safely, consider waiting for prices to recover. See the Market Prices page for the latest rates and trends.',
  },
]

const FALLBACK =
  "That's a good question. In demo mode I can help with pests, fertilizer, irrigation, soil health, weather and market prices. Try asking about one of those, or contact your nearest Krishi Vigyan Kendra (KVK) for expert local advice."

/**
 * Replace with an AI SDK `streamText` call through AI Gateway; the route and UI
 * already send the full message history.
 */
export async function getAssistantReply(messages: ChatMessage[]): Promise<string> {
  const last = messages.at(-1)?.content.toLowerCase() ?? ''
  const match = RESPONSES.find((entry) => entry.keywords.some((keyword) => last.includes(keyword)))
  await new Promise((resolve) => setTimeout(resolve, 800))
  return match?.answer ?? FALLBACK
}
