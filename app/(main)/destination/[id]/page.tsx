import { ArrowLeft, Bookmark, MapPin, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SEED_DESTINATIONS } from "@/lib/seed-data";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = SEED_DESTINATIONS.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
        <p className="text-ride-muted">Destination not found.</p>
        <Link href="/" className="mt-4 text-ride-orange text-sm font-medium">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const diffColors = {
    easy: "text-ride-green bg-ride-green/10",
    moderate: "text-ride-yellow bg-ride-yellow/10",
    challenging: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="flex flex-col min-h-screen bg-ride-bg">
      {/* Hero */}
      <div className="relative h-52 bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <span className="text-7xl opacity-40">
          {destination.type === "mountain" ? "🏔️" : destination.type === "coastal" ? "🌊" : "🌾"}
        </span>
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
        <div className="absolute bottom-4 left-5">
          <h1 className="text-white font-bold text-2xl">{destination.name}</h1>
          <p className="text-white/70 text-sm flex items-center gap-1 mt-0.5">
            <MapPin size={12} />
            {destination.province}, {destination.region}
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-around px-5 py-4 bg-ride-surface border-b border-ride-border">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-ride-text font-bold text-base">{destination.estimatedDistanceKm} km</span>
          <span className="text-ride-muted text-[11px]">Distance</span>
        </div>
        <div className="w-px h-8 bg-ride-border" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-ride-text font-bold text-base">{destination.estimatedDurationHours}h</span>
          <span className="text-ride-muted text-[11px]">Duration</span>
        </div>
        <div className="w-px h-8 bg-ride-border" />
        <div className="flex flex-col items-center gap-0.5">
          <span className={`font-bold text-sm px-2 py-0.5 rounded-full ${diffColors[destination.difficulty]}`}>
            {destination.difficulty.charAt(0).toUpperCase() + destination.difficulty.slice(1)}
          </span>
          <span className="text-ride-muted text-[11px]">Difficulty</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 pb-24">
        <div className="bg-ride-surface rounded-xl p-4 mb-4 border border-ride-border">
          <h2 className="text-ride-text font-semibold text-[15px] mb-2 flex items-center gap-2">
            <Clock size={15} className="text-ride-orange" />
            Best Time to Visit
          </h2>
          <p className="text-ride-muted text-sm">{destination.bestTimeToVisit}</p>
        </div>

        <div className="bg-ride-surface rounded-xl p-4 mb-4 border border-ride-border">
          <h2 className="text-ride-text font-semibold text-[15px] mb-2 flex items-center gap-2">
            <TrendingUp size={15} className="text-ride-orange" />
            Road Type
          </h2>
          <p className="text-ride-muted text-sm">{destination.roadType}</p>
        </div>

        {/* Map placeholder */}
        <div className="h-48 rounded-xl bg-ride-surface border border-ride-border flex items-center justify-center">
          <p className="text-ride-muted text-sm">Interactive map — coming soon</p>
        </div>

        <button className="mt-4 w-full bg-ride-orange text-white font-semibold rounded-2xl py-3.5 text-[15px]">
          Save Route
        </button>
      </div>
    </div>
  );
}
