import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
      <div className="w-16 h-16 rounded-2xl bg-ride-surface flex items-center justify-center mb-4 border border-ride-border">
        <User size={28} className="text-ride-orange" />
      </div>
      <h1 className="text-ride-text font-bold text-xl mb-2">Profile</h1>
      <p className="text-ride-muted text-sm max-w-xs">
        Set up your rider profile — home city, bike type, and ride preferences.
      </p>
    </div>
  );
}
