import { ArrowLeft, Bookmark, MapPin, Clock, TrendingUp, Info } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { SEED_DESTINATIONS } from '@/lib/seed-data'
import RouteMap from '@/components/map/RouteMap'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const TYPE_GRADIENTS: Record<string, string> = {
  mountain: 'from-emerald-900 via-slate-800 to-slate-900',
  coastal:  'from-sky-900 via-slate-800 to-slate-900',
  province: 'from-amber-900 via-slate-800 to-slate-900',
  city:     'from-violet-900 via-slate-800 to-slate-900',
  highway:  'from-zinc-800 via-slate-800 to-slate-900',
}

const TYPE_EMOJI: Record<string, string> = {
  mountain: '🏔️',
  coastal:  '🌊',
  province: '🌾',
  city:     '🏙️',
  highway:  '🛣️',
}

const DIFF_STYLE: Record<string, { label: string; className: string }> = {
  easy:       { label: 'Easy',     className: 'text-ride-green bg-ride-green/10' },
  moderate:   { label: 'Moderate', className: 'text-ride-yellow bg-ride-yellow/10' },
  challenging:{ label: 'Hard',     className: 'text-red-400 bg-red-400/10' },
}

const CP_EMOJI: Record<string, string> = {
  fuel:       '⛽',
  food:       '🍚',
  scenic:     '📸',
  rest:       '🏨',
  attraction: '⭐',
}

const CP_COLOR: Record<string, string> = {
  fuel:       'bg-yellow-400/20 text-yellow-400',
  food:       'bg-green-400/20 text-green-400',
  scenic:     'bg-sky-400/20 text-sky-400',
  rest:       'bg-purple-400/20 text-purple-400',
  attraction: 'bg-ride-orange/20 text-ride-orange',
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  type Checkpoint = {
    id: string
    name: string
    type: 'fuel' | 'food' | 'scenic' | 'rest' | 'attraction'
    description: string
    latitude: number
    longitude: number
    orderIndex: number
  }

  type Dest = {
    id: string
    name: string
    province: string
    region: string
    type: string
    difficulty: string
    estimatedDistanceKm: number
    estimatedDurationHours: number
    roadType: string
    bestTimeToVisit: string
    latitude: number
    longitude: number
    description?: string | null
  }

  let dest: Dest | null = null
  let checkpoints: Checkpoint[] = []

  // Try DB for real UUID destinations
  if (UUID_RE.test(id)) {
    const row = await prisma.destination.findUnique({
      where: { id },
      include: { checkpoints: { orderBy: { orderIndex: 'asc' } } },
    })
    if (row) {
      dest = row
      checkpoints = row.checkpoints
    }
  }

  // Fall back to seed data
  if (!dest) {
    const seed = SEED_DESTINATIONS.find((d) => d.id === id)
    if (seed) dest = { ...seed, description: null }
  }

  if (!dest) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <p className="text-ride-muted">Destination not found.</p>
        <Link href="/" className="mt-4 text-ride-orange text-sm font-medium">
          ← Back to Home
        </Link>
      </div>
    )
  }

  const gradient = TYPE_GRADIENTS[dest.type] ?? TYPE_GRADIENTS.province
  const emoji = TYPE_EMOJI[dest.type] ?? '🛣️'
  const diff = DIFF_STYLE[dest.difficulty] ?? DIFF_STYLE.easy

  return (
    <div className="flex flex-col min-h-screen bg-ride-bg">
      {/* Hero */}
      <div className={`relative h-56 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-8xl opacity-40">{emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-ride-bg via-transparent to-transparent" />

        <Link
          href="/"
          className="absolute top-12 left-4 p-2 rounded-full bg-black/40 backdrop-blur-sm"
        >
          <ArrowLeft size={20} className="text-white" />
        </Link>

        <button className="absolute top-12 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm">
          <Bookmark size={20} className="text-white" />
        </button>

        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <h1 className="text-white font-bold text-2xl leading-tight">{dest.name}</h1>
            <p className="text-white/70 text-sm flex items-center gap-1 mt-0.5">
              <MapPin size={12} />
              {dest.province}, {dest.region}
            </p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diff.className}`}>
            {diff.label}
          </span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-around px-5 py-4 bg-ride-surface border-b border-ride-border">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-ride-text font-bold text-base">{dest.estimatedDistanceKm} km</span>
          <span className="text-ride-muted text-[11px]">Distance</span>
        </div>
        <div className="w-px h-8 bg-ride-border" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-ride-text font-bold text-base">{dest.estimatedDurationHours}h</span>
          <span className="text-ride-muted text-[11px]">Duration</span>
        </div>
        <div className="w-px h-8 bg-ride-border" />
        <div className="flex flex-col items-center gap-0.5">
          <span className={`font-bold text-sm px-2 py-0.5 rounded-full ${diff.className}`}>
            {diff.label}
          </span>
          <span className="text-ride-muted text-[11px]">Difficulty</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 pb-28 flex flex-col gap-3">

        {/* Description (AI-generated destinations only) */}
        {dest.description && (
          <div className="bg-ride-surface rounded-xl p-4 border border-ride-border">
            <h2 className="text-ride-text font-semibold text-[15px] mb-2 flex items-center gap-2">
              <Info size={15} className="text-ride-orange" />
              About
            </h2>
            <p className="text-ride-muted text-sm leading-relaxed">{dest.description}</p>
          </div>
        )}

        {/* Best Time */}
        <div className="bg-ride-surface rounded-xl p-4 border border-ride-border">
          <h2 className="text-ride-text font-semibold text-[15px] mb-2 flex items-center gap-2">
            <Clock size={15} className="text-ride-orange" />
            Best Time to Visit
          </h2>
          <p className="text-ride-muted text-sm">{dest.bestTimeToVisit}</p>
        </div>

        {/* Road Type */}
        <div className="bg-ride-surface rounded-xl p-4 border border-ride-border">
          <h2 className="text-ride-text font-semibold text-[15px] mb-2 flex items-center gap-2">
            <TrendingUp size={15} className="text-ride-orange" />
            Road Type
          </h2>
          <p className="text-ride-muted text-sm">{dest.roadType}</p>
        </div>

        {/* Map */}
        <RouteMap
          latitude={dest.latitude}
          longitude={dest.longitude}
          checkpoints={checkpoints}
        />

        {/* Checkpoints */}
        {checkpoints.length > 0 && (
          <div className="bg-ride-surface rounded-xl border border-ride-border overflow-hidden">
            <div className="px-4 py-3 border-b border-ride-border">
              <h2 className="text-ride-text font-semibold text-[15px]">
                Checkpoints ({checkpoints.length})
              </h2>
            </div>
            {checkpoints.map((cp, i) => (
              <div key={cp.id}>
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 mt-0.5 ${CP_COLOR[cp.type] ?? 'bg-ride-surface2 text-ride-muted'}`}>
                    {CP_EMOJI[cp.type] ?? '📍'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-ride-text font-semibold text-sm">{cp.name}</span>
                      <span className="text-[10px] text-ride-muted bg-ride-surface2 px-1.5 py-0.5 rounded-full">
                        #{cp.orderIndex}
                      </span>
                    </div>
                    <p className="text-ride-muted text-xs mt-0.5 leading-relaxed">{cp.description}</p>
                  </div>
                </div>
                {i < checkpoints.length - 1 && <div className="mx-4 h-px bg-ride-border" />}
              </div>
            ))}
          </div>
        )}

        {/* Save Route */}
        <button className="w-full bg-ride-orange text-white font-semibold rounded-2xl py-3.5 text-[15px] mt-1">
          Save Route
        </button>
      </div>
    </div>
  )
}
