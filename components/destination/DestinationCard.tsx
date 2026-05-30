import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import type { SeedDestination } from "@/lib/seed-data";

const TYPE_GRADIENTS: Record<SeedDestination["type"], string> = {
  mountain: "from-emerald-900 via-slate-800 to-slate-900",
  coastal: "from-sky-900 via-slate-800 to-slate-900",
  province: "from-amber-900 via-slate-800 to-slate-900",
  city: "from-violet-900 via-slate-800 to-slate-900",
  highway: "from-zinc-800 via-slate-800 to-slate-900",
};

const TYPE_EMOJI: Record<SeedDestination["type"], string> = {
  mountain: "🏔️",
  coastal: "🌊",
  province: "🌾",
  city: "🏙️",
  highway: "🛣️",
};

const DIFFICULTY_STYLE: Record<
  SeedDestination["difficulty"],
  { label: string; className: string }
> = {
  easy: { label: "Easy", className: "text-ride-green bg-ride-green/10" },
  moderate: { label: "Moderate", className: "text-ride-yellow bg-ride-yellow/10" },
  challenging: { label: "Hard", className: "text-red-400 bg-red-400/10" },
};

type Props = {
  destination: SeedDestination;
  variant?: "card" | "list";
};

export default function DestinationCard({ destination, variant = "card" }: Props) {
  const gradient = TYPE_GRADIENTS[destination.type];
  const emoji = TYPE_EMOJI[destination.type];
  const diff = DIFFICULTY_STYLE[destination.difficulty];

  if (variant === "list") {
    return (
      <Link href={`/destination/${destination.id}`}>
        <div className="flex gap-3 bg-ride-surface rounded-xl p-3 border border-ride-border active:opacity-80 transition-opacity">
          {/* Thumbnail */}
          <div
            className={`w-20 h-20 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-2xl">{emoji}</span>
          </div>
          {/* Info */}
          <div className="flex flex-col justify-between min-w-0 py-0.5">
            <div>
              <h3 className="font-semibold text-ride-text text-sm leading-tight truncate">
                {destination.name}
              </h3>
              <p className="text-ride-muted text-xs mt-0.5 flex items-center gap-1">
                <MapPin size={10} />
                {destination.province}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-ride-muted text-[11px] flex items-center gap-1">
                <Clock size={10} />
                {destination.estimatedDistanceKm} km
              </span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${diff.className}`}>
                {diff.label}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/destination/${destination.id}`} className="flex-shrink-0">
      <div className="w-[150px] rounded-xl overflow-hidden border border-ride-border bg-ride-surface active:opacity-80 transition-opacity">
        {/* Image area */}
        <div
          className={`relative h-[100px] bg-gradient-to-br ${gradient} flex items-center justify-center`}
        >
          <span className="text-4xl">{emoji}</span>
          {/* Type badge */}
          <span className="absolute top-2 right-2 bg-ride-orange text-white text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full">
            {destination.type}
          </span>
        </div>
        {/* Info */}
        <div className="p-2.5">
          <h3 className="font-semibold text-ride-text text-[13px] leading-tight line-clamp-1">
            {destination.name}
          </h3>
          <p className="text-ride-muted text-[11px] mt-0.5">{destination.province}</p>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-ride-muted text-[11px]">
              {destination.estimatedDistanceKm} km
            </span>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${diff.className}`}>
              {diff.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
