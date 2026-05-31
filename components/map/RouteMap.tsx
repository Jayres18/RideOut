'use client'

import { Map, Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

type CpType = 'fuel' | 'food' | 'scenic' | 'rest' | 'attraction'

type CheckpointItem = {
  id: string
  name: string
  type: CpType
  latitude: number
  longitude: number
}

type Props = {
  latitude: number
  longitude: number
  checkpoints?: CheckpointItem[]
}

const CP_COLOR: Record<CpType, string> = {
  fuel:       '#FACC15',
  food:       '#22C55E',
  scenic:     '#38BDF8',
  rest:       '#A78BFA',
  attraction: '#F97316',
}

const CP_EMOJI: Record<CpType, string> = {
  fuel:       '⛽',
  food:       '🍚',
  scenic:     '📸',
  rest:       '🏨',
  attraction: '⭐',
}

export default function RouteMap({ latitude, longitude, checkpoints = [] }: Props) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!token) {
    return (
      <div className="h-64 rounded-xl bg-ride-surface border border-ride-border flex items-center justify-center">
        <p className="text-ride-muted text-sm">Map unavailable</p>
      </div>
    )
  }

  return (
    <div className="h-64 rounded-xl overflow-hidden border border-ride-border">
      <Map
        mapboxAccessToken={token}
        initialViewState={{ longitude, latitude, zoom: 10 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {/* Destination pin */}
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <div className="w-9 h-9 rounded-full bg-ride-orange border-2 border-white flex items-center justify-center text-base shadow-lg">
            🏁
          </div>
        </Marker>

        {/* Checkpoint pins */}
        {checkpoints.map((cp) => (
          <Marker key={cp.id} longitude={cp.longitude} latitude={cp.latitude} anchor="bottom">
            <div
              style={{ backgroundColor: CP_COLOR[cp.type] }}
              className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs shadow-md"
            >
              {CP_EMOJI[cp.type]}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  )
}
