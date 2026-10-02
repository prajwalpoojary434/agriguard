import type { DiseaseResult } from '@/lib/types'

const DEMO_RESULTS: DiseaseResult[] = [
  {
    disease: 'Early Blight',
    crop: 'Tomato',
    confidence: 92,
    severity: 'moderate',
    symptoms: [
      'Dark brown spots with concentric rings ("target" pattern) on older leaves',
      'Yellowing tissue around the spots',
      'Lower leaves dry up and drop early',
    ],
    treatment: [
      'Remove and destroy infected leaves — do not compost them',
      'Spray Mancozeb 75% WP at 2.5 g per litre of water every 7–10 days',
      'Alternatively use Chlorothalonil or a copper-based fungicide',
    ],
    prevention: [
      'Rotate with non-solanaceous crops for 2–3 years',
      'Water at the base of the plant, not on leaves',
      'Mulch soil to stop spores splashing onto leaves',
      'Keep 60 cm spacing for good airflow',
    ],
  },
  {
    disease: 'Rice Blast',
    crop: 'Rice',
    confidence: 87,
    severity: 'high',
    symptoms: [
      'Spindle-shaped spots with grey centres and brown edges',
      'Lesions merge and leaves wither',
      'Neck of the panicle turns black and breaks',
    ],
    treatment: [
      'Spray Tricyclazole 75% WP at 0.6 g per litre of water',
      'Repeat after 10–15 days if symptoms persist',
      'Stop extra nitrogen fertilizer until the crop recovers',
    ],
    prevention: [
      'Use resistant varieties suited to your region',
      'Treat seeds with Carbendazim before sowing',
      'Apply nitrogen in split doses',
      'Remove weed hosts from field bunds',
    ],
  },
  {
    disease: 'Leaf Rust',
    crop: 'Wheat',
    confidence: 78,
    severity: 'low',
    symptoms: [
      'Small orange-brown pustules scattered on leaf surface',
      'Pustules rub off as rusty powder',
      'Leaves yellow in severe cases',
    ],
    treatment: [
      'Spray Propiconazole 25% EC at 1 ml per litre of water',
      'Repeat after 15 days if new pustules appear',
    ],
    prevention: [
      'Sow rust-resistant varieties',
      'Avoid late sowing',
      'Monitor fields weekly from tillering stage',
    ],
  },
]

/**
 * Replace with a call to a vision model (e.g. AI SDK `generateObject` with an
 * image part, or a hosted plant-disease classifier). Keep the `DiseaseResult` shape.
 */
export async function detectDisease(image: { name: string; size: number }): Promise<DiseaseResult> {
  await new Promise((resolve) => setTimeout(resolve, 1400))
  const index = (image.name.length + image.size) % DEMO_RESULTS.length
  return DEMO_RESULTS[index]
}
