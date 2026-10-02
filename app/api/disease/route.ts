import { NextResponse } from 'next/server'
import { detectDisease } from '@/lib/services/disease'

const MAX_BYTES = 8 * 1024 * 1024

export async function POST(request: Request) {
  const formData = await request.formData()
  const image = formData.get('image')

  if (!(image instanceof File)) {
    return NextResponse.json({ error: 'Please upload an image.' }, { status: 400 })
  }
  if (!image.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File must be an image.' }, { status: 400 })
  }
  if (image.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image must be smaller than 8 MB.' }, { status: 400 })
  }

  const result = await detectDisease({ name: image.name, size: image.size })
  return NextResponse.json(result)
}
