"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, MapPin, ChevronDown, Search, Sparkles, ChevronRight } from "lucide-react";
import DestinationCard from "@/components/destination/DestinationCard";
import { FEATURED, POPULAR } from "@/lib/seed-data";

const FILTER_CHIPS = [
  "All",
  "Near Me",
  "Mountain",
  "Coastal",
  "Long Ride",
  "Short Ride",
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex flex-col min-h-full bg-ride-bg">
      {/* Header */}
      <header className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-ride-orange font-bold text-xl tracking-tight">
            RideOut
          </span>
          <button className="relative p-2 rounded-full bg-ride-surface border border-ride-border">
            <Bell size={18} className="text-ride-text" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-ride-orange" />
          </button>
        </div>
        <p className="text-ride-muted text-sm">Where are you riding today?</p>

        {/* Location pill */}
        <button className="mt-3 flex items-center gap-1.5 bg-ride-surface border border-ride-border rounded-full px-3 py-1.5 text-sm text-ride-text">
          <MapPin size={13} className="text-ride-orange" />
          <span className="font-medium">Metro Manila</span>
          <ChevronDown size={13} className="text-ride-muted ml-0.5" />
        </button>
      </header>

      {/* Suggest a Ride CTA */}
      <div className="px-5 mb-5">
        <Link href="/suggest">
          <button className="w-full flex items-center justify-center gap-2 bg-ride-orange hover:bg-orange-500 active:bg-orange-600 text-white font-semibold rounded-2xl py-3.5 text-[15px] transition-colors shadow-lg shadow-ride-orange/20">
            <Sparkles size={18} />
            Suggest a Ride
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-2.5 bg-ride-surface border border-ride-border rounded-xl px-4 py-3">
          <Search size={16} className="text-ride-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="Search destinations..."
            className="bg-transparent text-ride-text placeholder-ride-muted text-sm outline-none w-full"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="mb-5">
        <div className="flex gap-2 px-5 overflow-x-auto scrollbar-hide">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
                activeFilter === chip
                  ? "bg-ride-orange border-ride-orange text-white"
                  : "bg-ride-surface2 border-ride-border text-ride-muted"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Rides */}
      <section className="mb-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="text-ride-text font-semibold text-[15px]">
            Featured Rides
          </h2>
          <Link
            href="/explore"
            className="flex items-center gap-0.5 text-ride-orange text-[13px] font-medium"
          >
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide pb-1">
          {FEATURED.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} variant="card" />
          ))}
        </div>
      </section>

      {/* Popular Routes */}
      <section className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-ride-text font-semibold text-[15px]">
            Popular Routes
          </h2>
          <Link
            href="/explore"
            className="flex items-center gap-0.5 text-ride-orange text-[13px] font-medium"
          >
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {POPULAR.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} variant="list" />
          ))}
        </div>
      </section>
    </div>
  );
}
