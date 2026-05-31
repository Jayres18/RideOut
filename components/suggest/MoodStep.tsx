'use client'

type Props = {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

const MOODS = [
  { value: 'mountain', label: 'Mountain / Scenic', emoji: '🏔️' },
  { value: 'coastal', label: 'Coastal / Beach', emoji: '🌊' },
  { value: 'province', label: 'Province / Countryside', emoji: '🌾' },
  { value: 'city', label: 'City Escape', emoji: '🏙️' },
  { value: 'highway', label: 'Long Highway Cruise', emoji: '🛣️' },
]

export default function MoodStep({ value, onChange, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-ride-text font-bold text-2xl mb-1">What&apos;s your vibe?</h2>
        <p className="text-ride-muted text-sm">Pick the kind of ride you&apos;re feeling.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MOODS.map((mood) => {
          const selected = value === mood.value
          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => onChange(mood.value)}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border py-5 px-3 text-center transition-all active:opacity-70 ${
                selected
                  ? 'border-ride-orange bg-ride-orange/10'
                  : 'border-ride-border bg-ride-surface'
              } ${mood.value === 'highway' ? 'col-span-2' : ''}`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className={`text-sm font-medium ${selected ? 'text-ride-orange' : 'text-ride-text'}`}>
                {mood.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-ride-surface border border-ride-border text-ride-muted font-semibold rounded-xl py-3.5 text-sm active:opacity-70 transition-opacity"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!value}
          className="flex-[2] bg-ride-orange text-white font-semibold rounded-xl py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed active:opacity-80 transition-opacity"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
