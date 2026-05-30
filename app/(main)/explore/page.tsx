import { Map } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
      <div className="w-16 h-16 rounded-2xl bg-ride-surface flex items-center justify-center mb-4 border border-ride-border">
        <Map size={28} className="text-ride-orange" />
      </div>
      <h1 className="text-ride-text font-bold text-xl mb-2">Explore Map</h1>
      <p className="text-ride-muted text-sm max-w-xs">
        Interactive map view of all destinations across the Philippines — coming soon.
      </p>
    </div>
  );
}
