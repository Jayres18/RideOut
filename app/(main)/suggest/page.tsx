import { Sparkles } from "lucide-react";

export default function SuggestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
      <div className="w-16 h-16 rounded-2xl bg-ride-surface flex items-center justify-center mb-4 border border-ride-border">
        <Sparkles size={28} className="text-ride-orange" />
      </div>
      <h1 className="text-ride-text font-bold text-xl mb-2">AI Ride Suggestion</h1>
      <p className="text-ride-muted text-sm max-w-xs">
        Tell us your starting point, mood, and duration — we&apos;ll find the perfect ride.
      </p>
    </div>
  );
}
