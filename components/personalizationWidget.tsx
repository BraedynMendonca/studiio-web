"use client"

import { useState, useEffect } from "react"
import { Palette } from "lucide-react"

const themes = [
  { name: "Default", class: "theme-default", color: "#ffffff" },
  { name: "Blue", class: "theme-blue", color: "#3b82f6" },
  { name: "Purple", class: "theme-purple", color: "#9333ea" },
  { name: "Green", class: "theme-green", color: "#22c55e" },
  { name: "Red", class: "theme-red", color: "#ef4444" },
]

export function PersonalizationWidget() {
  const [selectedTheme, setSelectedTheme] = useState("theme-default")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("studiio-theme")
    if (savedTheme && themes.some(theme => theme.class === savedTheme)) {
      setSelectedTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // If no valid theme is saved, set and apply the default theme
      const defaultTheme = "theme-default"
      setSelectedTheme(defaultTheme)
      applyTheme(defaultTheme)
      localStorage.setItem("studiio-theme", defaultTheme)
    }
    setMounted(true)
  }, [])

  const applyTheme = (themeClass: string) => {
    if (typeof window === "undefined") return
    const container = document.getElementById("app-container")
    if (container) {
      // Remove all theme classes
      themes.forEach((theme) => {
        container.classList.remove(theme.class)
      })
      // Add selected theme class
      container.classList.add(themeClass)
    }
  }

  const handleThemeChange = (themeClass: string) => {
    if (typeof window === "undefined") return
    setSelectedTheme(themeClass)
    applyTheme(themeClass)
    localStorage.setItem("studiio-theme", themeClass)
  }

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col justify-center widget-hover flex-1"
      style={{ height: "100%", justifyContent: "flex-start" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Theme</span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {themes.map((theme) => (
          <button
            key={theme.class}
            onClick={() => handleThemeChange(theme.class)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedTheme === theme.class ? "border-white scale-110" : "border-gray-600 hover:border-gray-400"
              }`}
            style={{ backgroundColor: theme.color }}
            title={theme.name}
          />
        ))}
      </div>

      <div className="text-xs text-gray-400 mt-2 text-center">
        {mounted ? themes.find((t) => t.class === selectedTheme)?.name : "Loading"} Theme
      </div>
    </div>
  )
}
