'use client'

import { Camera, ImageUp, Loader2, RotateCcw, ScanLine } from 'lucide-react'
import { useRef, useState } from 'react'
import { DiseaseResultCard } from '@/components/disease/disease-result-card'
import { Button } from '@/components/ui/button'
import type { DiseaseResult } from '@/lib/types'
import { cn } from '@/lib/utils'

export function DiseaseDetector() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DiseaseResult | null>(null)

  function selectFile(next: File | undefined) {
    if (!next) return
    if (!next.type.startsWith('image/')) {
      setError('Please choose an image file (JPG or PNG).')
      return
    }
    if (preview) URL.revokeObjectURL(preview)
    setFile(next)
    setPreview(URL.createObjectURL(next))
    setResult(null)
    setError(null)
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function analyze() {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const response = await fetch('/api/disease', { method: 'POST', body: formData })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Something went wrong.')
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          id="leaf-image"
          onChange={(e) => selectFile(e.target.files?.[0])}
        />

        {preview ? (
          <div className="relative overflow-hidden rounded-xl bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
            <img src={preview} alt="Selected leaf" className="aspect-[4/3] w-full object-cover" />
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm">
                <div className="absolute inset-x-0 h-1 animate-scan bg-primary shadow-[0_0_16px_var(--primary)]" />
                <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
                <p className="font-semibold">Analyzing leaf…</p>
              </div>
            )}
          </div>
        ) : (
          <label
            htmlFor="leaf-image"
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              selectFile(e.dataTransfer.files?.[0])
            }}
            className={cn(
              'flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-6 text-center transition-colors hover:border-primary hover:bg-secondary/40',
              dragging && 'border-primary bg-secondary/60',
            )}
          >
            <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ImageUp className="size-8" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-semibold">Upload a leaf photo</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                Tap to take a photo or choose from gallery. JPG or PNG, up to 8 MB.
              </span>
            </span>
          </label>
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          {preview ? (
            <>
              <Button size="lg" className="h-12 text-base sm:flex-1" onClick={analyze} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : <ScanLine aria-hidden="true" />}
                {loading ? 'Analyzing…' : result ? 'Analyze again' : 'Detect disease'}
              </Button>
              <Button size="lg" variant="outline" className="h-12 text-base" onClick={reset} disabled={loading}>
                <RotateCcw aria-hidden="true" />
                New photo
              </Button>
            </>
          ) : (
            <Button size="lg" className="h-12 text-base sm:flex-1" onClick={() => inputRef.current?.click()}>
              <Camera aria-hidden="true" />
              Take or choose photo
            </Button>
          )}
        </div>

        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
          <li className="rounded-lg bg-muted px-3 py-2">Use daylight, no flash</li>
          <li className="rounded-lg bg-muted px-3 py-2">Fill the frame with one leaf</li>
          <li className="rounded-lg bg-muted px-3 py-2">Show the affected spots</li>
        </ul>
      </div>

      <div aria-live="polite">
        {result ? (
          <DiseaseResultCard result={result} />
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
            <ScanLine className="size-10" aria-hidden="true" />
            <p className="max-w-xs text-base">Your diagnosis, treatment and prevention steps will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
