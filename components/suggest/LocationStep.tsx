'use client'

import { MapPin, Navigation } from 'lucide-react'

type Props = {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export default function LocationStep({ value, onChange, onNext }: Props) {
  async function handleUseLocation() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        if (!token) {
          onChange(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
          return
        }
        try {
          const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${token}&types=place`
          )
          const data = await res.json()
          const place = data.features?.[0]?.text
          if (place) onChange(place)
        } catch {
          onChange(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
        }
      },
      () => {
        // User denied geolocation — do nothing
      }
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-ride-text font-bold text-2xl mb-1">Where are you starting?</h2>
        <p className="text-ride-muted text-sm">Enter your city or province.</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative">
          <MapPin
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ride-muted"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. Metro Manila, Cebu City"
            className="w-full bg-ride-surface border border-ride-border rounded-xl pl-9 pr-4 py-3 text-ride-text placeholder:text-ride-muted text-sm focus:outline-none focus:border-ride-orange transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={handleUseLocation}
          className="flex items-center justify-center gap-2 w-full bg-ride-surface2 border border-ride-border rounded-xl py-3 text-ride-sky text-sm font-medium active:opacity-70 transition-opacity"
        >
          <Navigation size={16} />
          Use my location
        </button>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!value.trim()}
        className="w-full bg-ride-orange text-white font-semibold rounded-xl py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed active:opacity-80 transition-opacity mt-2"
      >
        Next →
      </button>
    </div>
  )
}
