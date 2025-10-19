"use client"

import { useState, useEffect } from "react"
import { Palette, Plus } from "lucide-react"
import { useThemeStore } from "@/lib/themeStore"

interface Theme {
  name: string;
  class: string;
  color: string;
  isCustom?: boolean;
}

const themes: Theme[] = [
  { name: "Default", class: "theme-default", color: "#ffffff" },
  { name: "Ocean", class: "theme-blue", color: "#3b82f6" },
  { name: "Lavender", class: "theme-purple", color: "#9333ea" },
  { name: "Forest", class: "theme-green", color: "#22c55e" },
  { name: "Cherry", class: "theme-red", color: "#ef4444" },
  { name: "Custom", class: "theme-custom", color: "#ffffff", isCustom: true },
]

export function PersonalizationWidget() {
  const [selectedTheme, setSelectedTheme] = useState("theme-default")
  const [customColor, setCustomColor] = useState("#ffffff")
  const [mounted, setMounted] = useState(false)
  const setColor = useThemeStore((state) => state.setColor)
  const setBackground = useThemeStore((state) => state.setBackground)
  const background = useThemeStore((state) => state.background)

  useEffect(() => {
    const savedTheme = localStorage.getItem("studiio-theme")
    const savedCustomColor = localStorage.getItem("studiio-custom-color")
    const savedBackground = localStorage.getItem("studiio-background")

    if (savedBackground) {
      setBackground(savedBackground)
    }

    if (savedTheme && themes.some(theme => theme.class === savedTheme)) {
      setSelectedTheme(savedTheme)
      if (savedTheme === "theme-custom" && savedCustomColor) {
        setCustomColor(savedCustomColor)
        handleThemeChange(savedTheme, savedCustomColor)
      } else {
        const theme = themes.find(t => t.class === savedTheme)
        if (theme) {
          setColor(theme.color)
          applyTheme(savedTheme)
        }
      }
    } else {
      // If no valid theme is saved, set and apply the default theme
      const defaultTheme = "theme-default"
      setSelectedTheme(defaultTheme)
      setColor(themes.find(t => t.class === defaultTheme)!.color)
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

  const handleThemeChange = (themeClass: string, customColorValue?: string) => {
    if (typeof window === "undefined") return
    setSelectedTheme(themeClass)

    if (themeClass === "theme-custom" && customColorValue) {
      setCustomColor(customColorValue)
      setColor(customColorValue)
      const container = document.getElementById("app-container")
      if (container) {
        // Remove all theme classes
        themes.forEach((theme) => {
          container.classList.remove(theme.class)
        })
        container.classList.add(themeClass)
        container.style.setProperty("--custom-theme-color", customColorValue)
      }
    } else {
      const theme = themes.find(t => t.class === themeClass)
      if (theme) {
        setColor(theme.color)
      }
      applyTheme(themeClass)
    }

    localStorage.setItem("studiio-theme", themeClass)
    if (customColorValue) {
      localStorage.setItem("studiio-custom-color", customColorValue)
    }
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setCustomColor(newColor)
    setColor(newColor)
    if (selectedTheme === "theme-custom") {
      handleThemeChange("theme-custom", newColor)
    }
  }

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col justify-center widget-hover flex-1"
      style={{ height: "100%", justifyContent: "flex-start" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Personalization</span>
      </div>

      <div className="flex gap-3 justify-center items-center">
        {themes.map((theme) => theme.isCustom ? (
          <div key={theme.class} className="relative">
            <div className="w-8 h-8 rounded-full relative">
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  handleThemeChange('theme-custom', e.target.value);
                }}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                title="Choose custom color"
              />
              <div
                className={`absolute inset-0 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${selectedTheme === theme.class ? "border-white scale-110" : "border-gray-600 hover:border-gray-400"
                  }`}
                style={{ backgroundColor: selectedTheme === 'theme-custom' ? customColor : theme.color }}
              >
                <Plus className="w-4 h-4 text-white/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]" />
              </div>
            </div>
          </div>
        ) : (
          <button
            key={theme.class}
            onClick={() => handleThemeChange(theme.class)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedTheme === theme.class ? "border-white scale-110" : "border-gray-600 hover:border-gray-400"}`}
            style={{ backgroundColor: theme.color }}
            title={theme.name}
          />
        ))}
      </div>

      <div className="text-xs text-gray-400 mt-2 text-center">
        {mounted ? themes.find((t) => t.class === selectedTheme)?.name : "Loading"} Theme
      </div>

      <div className="mt-4">
        <label htmlFor="background-select" className="text-xs text-gray-400">Background</label>
        <select
          id="background-select"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-1 text-xs text-white mt-1"
        >
          <option value="solid-color">Solid Color</option>
          <option value="liquid-ether">Liquid Ether</option>
          <option value="gradient-blinds">Gradient Blinds</option>
        </select>
      </div>
    </div>
  )
}
