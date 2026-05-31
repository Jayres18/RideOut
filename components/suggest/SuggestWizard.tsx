'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LocationStep from './LocationStep'
import MoodStep from './MoodStep'
import DurationStep from './DurationStep'
import GeneratingScreen from './GeneratingScreen'
import type { SuggestFormState } from '@/types/suggest'

export default function SuggestWizard() {
  const router = useRouter()
  const [state, setState] = useState<SuggestFormState>({
    step: 1,
    startLocation: '',
    rideType: '',
    duration: '',
    loading: false,
    error: null,
  })

  const progressPercent = state.step === 1 ? 33 : state.step === 2 ? 66 : 100

  async function handleSubmit() {
    setState((s) => ({ ...s, loading: true, error: null }))
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startLocation: state.startLocation,
          rideType: state.rideType,
          duration: state.duration,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      router.push(`/suggest/results?id=${data.id}`)
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to generate suggestions',
      }))
    }
  }

  function handleRetry() {
    setState((s) => ({ ...s, loading: false, error: null, step: 3 }))
  }

  if (state.loading || state.error) {
    return <GeneratingScreen error={state.error} onRetry={handleRetry} />
  }

  return (
    <div className="flex flex-col px-5 pt-6 pb-8 min-h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-ride-text font-bold text-lg mb-3">AI Ride Suggestion</h1>
        {/* Progress bar */}
        <div className="h-1.5 bg-ride-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-ride-orange rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-ride-muted text-xs mt-1.5">Step {state.step} of 3</p>
      </div>

      {/* Steps */}
      {state.step === 1 && (
        <LocationStep
          value={state.startLocation}
          onChange={(v) => setState((s) => ({ ...s, startLocation: v }))}
          onNext={() => setState((s) => ({ ...s, step: 2 }))}
        />
      )}
      {state.step === 2 && (
        <MoodStep
          value={state.rideType}
          onChange={(v) => setState((s) => ({ ...s, rideType: v }))}
          onNext={() => setState((s) => ({ ...s, step: 3 }))}
          onBack={() => setState((s) => ({ ...s, step: 1 }))}
        />
      )}
      {state.step === 3 && (
        <DurationStep
          value={state.duration}
          onChange={(v) => setState((s) => ({ ...s, duration: v }))}
          onSubmit={handleSubmit}
          onBack={() => setState((s) => ({ ...s, step: 2 }))}
        />
      )}
    </div>
  )
}
