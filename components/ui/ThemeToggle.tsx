"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/providers/ThemeProvider"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full bg-ride-surface border border-ride-border active:opacity-70 transition-opacity"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-ride-text" />
      ) : (
        <Moon size={18} className="text-ride-text" />
      )}
    </button>
  )
}
