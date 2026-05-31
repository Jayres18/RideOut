'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SuggestionResultCard from '@/components/suggest/SuggestionResultCard'
import type { DestinationSuggestion } from '@/types/suggest'

type Props = { id: string | null }

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-ride-border bg-ride-surface animate-pulse">
      <div className="h-32 bg-ride-surface2" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-ride-surface2 rounded w-2/3" />
        <div className="h-3 bg-ride-surface2 rounded w-1/3" />
        <div className="h-3 bg-ride-surface2 rounded w-full" />
        <div className="h-3 bg-ride-surface2 rounded w-3/4" />
        <div className="h-10 bg-ride-surface2 rounded-xl mt-1" />
      </div>
    </div>
  )
}

export default function ResultsClient({ id }: Props) {
  const [suggestions, setSuggestions] = useState<DestinationSuggestion[] | null>(null)
  const [rideType, setRideType] = useState<string>('province')
  const [error, setError] = useState<string | null>(id ? null : 'No suggestion ID found.')
  const [loading, setLoading] = useState(!!id)

  useEffect(() => {
    if (!id) return
    fetch(`/api/suggest?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setSuggestions(data.suggestions as DestinationSuggestion[])
        // Infer rideType from first suggestion for card theming
        const first = data.suggestions?.[0]
        if (first) {
          const text = (first.name + ' ' + first.description).toLowerCase()
          if (text.includes('coast') || text.includes('beach')) setRideType('coastal')
          else if (text.includes('mountain') || text.includes('volcano')) setRideType('mountain')
          else if (text.includes('city') || text.includes('urban')) setRideType('city')
          else if (text.includes('highway')) setRideType('highway')
        }
      })
      .catch((err) => setError(err.message ?? 'Could not load suggestions'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="px-5 pt-6 pb-8 flex flex-col gap-4">
        <div className="h-6 bg-ride-surface2 rounded w-40 animate-pulse mb-2" />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

  if (error || !suggestions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center gap-4">
        <p className="text-ride-muted text-sm">
          Could not load your suggestions. Go back and try again.
        </p>
        <Link href="/suggest" className="text-ride-orange text-sm font-semibold">
          ← Back to suggest
        </Link>
      </div>
    )
  }

  return (
    <div className="px-5 pt-6 pb-8 flex flex-col gap-4">
      <div className="mb-2">
        <h1 className="text-ride-text font-bold text-xl">Your Ride Picks 🏍️</h1>
        <p className="text-ride-muted text-sm mt-0.5">3 destinations picked just for you</p>
      </div>
      {suggestions.map((s, i) => (
        <SuggestionResultCard key={i} suggestion={s} rideType={rideType} />
      ))}
    </div>
  )
}
