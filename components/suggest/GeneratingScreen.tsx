'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Scouting routes...',
  'Checking road conditions...',
  'Finding hidden gems...',
  'Almost there...',
]

type Props = {
  error: string | null
  onRetry: () => void
}

export default function GeneratingScreen({ error, onRetry }: Props) {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    if (error) return
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [error])

  return (
    <div className="fixed inset-0 bg-ride-bg z-50 flex flex-col items-center justify-center gap-6 px-8">
      <span className="text-6xl">🏍️</span>
      <span className="text-ride-orange font-bold text-2xl tracking-tight">RideOut</span>

      {error ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="bg-ride-orange text-white font-semibold rounded-xl px-6 py-3 text-sm active:opacity-80 transition-opacity"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Spinning ring */}
          <div className="w-14 h-14 rounded-full border-4 border-ride-surface border-t-ride-orange animate-spin" />
          <p className="text-ride-muted text-sm">{MESSAGES[msgIndex]}</p>
        </>
      )}
    </div>
  )
}
