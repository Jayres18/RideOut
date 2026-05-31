"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/providers/ThemeProvider"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const root = document.documentElement
    root.style.setProperty("--vt-x", `${x}px`)
    root.style.setProperty("--vt-y", `${y}px`)
    root.style.setProperty("--vt-r", `${Math.ceil(endRadius)}px`)

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void
    }

    if (doc.startViewTransition) {
      doc.startViewTransition(() => toggleTheme())
    } else {
      toggleTheme()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full bg-ride-surface border border-ride-border active:opacity-70"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-ride-text" />
      ) : (
        <Moon size={18} className="text-ride-text" />
      )}
    </button>
  )
}
