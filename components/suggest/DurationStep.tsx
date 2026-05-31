'use client'

type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onBack: () => void
}

const DURATIONS = [
  { value: 'half_day', label: 'Half day', sublabel: '~3–4 hrs' },
  { value: 'full_day', label: 'Full day', sublabel: '~6–8 hrs' },
  { value: 'overnight', label: 'Overnight / Weekend', sublabel: '2+ days' },
]

export default function DurationStep({ value, onChange, onSubmit, onBack }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-ride-text font-bold text-2xl mb-1">How long will you ride?</h2>
        <p className="text-ride-muted text-sm">Choose your ride window.</p>
      </div>

      <div className="flex flex-col gap-3">
        {DURATIONS.map((d) => {
          const selected = value === d.value
          return (
            <button
              key={d.value}
              type="button"
              onClick={() => onChange(d.value)}
              className={`flex items-center justify-between rounded-xl border px-4 py-4 transition-all active:opacity-70 ${
                selected
                  ? 'border-ride-orange bg-ride-orange/10'
                  : 'border-ride-border bg-ride-surface'
              }`}
            >
              <span className={`font-semibold text-sm ${selected ? 'text-ride-orange' : 'text-ride-text'}`}>
                {d.label}
              </span>
              <span className="text-ride-muted text-sm">{d.sublabel}</span>
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
          onClick={onSubmit}
          disabled={!value}
          className="flex-[2] bg-ride-orange text-white font-semibold rounded-xl py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed active:opacity-80 transition-opacity"
        >
          Generate My Ride →
        </button>
      </div>
    </div>
  )
}
