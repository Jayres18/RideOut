"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Sparkles, Bookmark, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Map },
  { href: "/suggest", label: "Suggest", icon: Sparkles },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-ride-surface border-t border-ride-border px-2 pb-safe">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 py-3 px-4 min-w-0"
          >
            <Icon
              size={22}
              className={isActive ? "text-ride-orange" : "text-ride-muted"}
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className={`text-[10px] font-medium tracking-wide ${
                isActive ? "text-ride-orange" : "text-ride-muted"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
