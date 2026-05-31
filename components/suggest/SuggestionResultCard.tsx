'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import type { DestinationSuggestion } from '@/types/suggest'

const TYPE_GRADIENTS: Record<string, string> = {
  mountain: 'from-emerald-900 via-slate-800 to-slate-900',
  coastal: 'from-sky-900 via-slate-800 to-slate-900',
  province: 'from-amber-900 via-slate-800 to-slate-900',
  city: 'from-violet-900 via-slate-800 to-slate-900',
  highway: 'from-zinc-800 via-slate-800 to-slate-900',
}

const TYPE_EMOJI: Record<string, string> = {
  mountain: '🏔️',
  coastal: '🌊',
  province: '🌾',
  city: '🏙️',
  highway: '🛣️',
}

const DIFFICULTY_STYLE: Record<string, { label: string; className: string }> = {
  easy: { label: 'Easy', className: 'text-ride-green bg-ride-green/10' },
  moderate: { label: 'Moderate', className: 'text-ride-yellow bg-ride-yellow/10' },
  challenging: { label: 'Hard', className: 'text-red-400 bg-red-400/10' },
}

const CP_EMOJI: Record<string, string> = {
  fuel: '⛽',
  food: '🍚',
  scenic: '📸',
  rest: '🏨',
  attraction: '⭐',
}

type Props = {
  suggestion: DestinationSuggestion
  rideType: string
}

export default function SuggestionResultCard({ suggestion, rideType }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const gradient = TYPE_GRADIENTS[rideType] ?? TYPE_GRADIENTS.province
  const emoji = TYPE_EMOJI[rideType] ?? '🛣️'
  const diff = DIFFICULTY_STYLE[suggestion.difficulty] ?? DIFFICULTY_STYLE.easy
  const previewCheckpoints = suggestion.checkpoints.slice(0, 4)

  async function handleViewRoute() {
    setSaving(true)
    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(suggestion),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/destination/${data.id}`)
    } catch {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-ride-border bg-ride-surface">
      {/* Gradient hero */}
      <div className={`relative h-32 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-5xl">{emoji}</span>
        <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${diff.className}`}>
          {diff.label}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Name + province */}
        <div>
          <h3 className="font-bold text-ride-text text-base leading-tight">{suggestion.name}</h3>
          <p className="text-ride-muted text-xs mt-0.5 flex items-center gap-1">
            <MapPin size={10} />
            {suggestion.province}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-ride-muted text-xs">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {suggestion.estimated_distance_km} km
          </span>
          <span>·</span>
          <span>{suggestion.estimated_duration_hours}h</span>
          <span>·</span>
          <span className="truncate">{suggestion.road_type}</span>
        </div>

        {/* Why great */}
        <p className="text-ride-text text-sm leading-relaxed line-clamp-2">
          {suggestion.why_great_for_riders}
        </p>

        {/* Checkpoint pills */}
        {previewCheckpoints.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {previewCheckpoints.map((cp, i) => (
              <span
                key={i}
                className="bg-ride-surface2 border border-ride-border text-ride-muted text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1"
              >
                {CP_EMOJI[cp.type] ?? '📍'} {cp.name}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={handleViewRoute}
          disabled={saving}
          className="w-full bg-ride-orange text-white font-semibold rounded-xl py-3 text-sm disabled:opacity-60 active:opacity-80 transition-opacity mt-1"
        >
          {saving ? 'Loading...' : 'View Route →'}
        </button>
      </div>
    </div>
  )
}
