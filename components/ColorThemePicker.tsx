"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type ThemeOption = {
  name: string
  color: string
}

const themes: ThemeOption[] = [
  { name: "Midnight Pulse", color: "#1E1E2F" },
  { name: "Neon Wave", color: "#0FF0FC" },
  { name: "Solar Flare", color: "#FF6F00" },
  { name: "Lush Meadow", color: "#2E8B57" },
  { name: "Retro Pop", color: "#FF4C98" },
  { name: "Skybound", color: "#87CEFA" },
  { name: "Mocha Mist", color: "#A9746E" },
  { name: "Cyber Lime", color: "#BFFF00" },
  { name: "Driftwood", color: "#C2B280" },
]

export function ThemeSelector() {
  const [selectedColor, setSelectedColor] = useState("#1E1E2F")

  useEffect(() => {
    const saved = localStorage.getItem("bgColor")
    if (saved) {
      document.body.style.backgroundColor = saved
      setSelectedColor(saved)
    }
  }, [])

  const handleColorChange = (color: string) => {
    document.body.style.backgroundColor = color
    localStorage.setItem("bgColor", color)
    setSelectedColor(color)
  }

  return (
    <div className="mt-4 px-4">
      <h2 className="text-xl font-bold mb-2 text-white">🎨 Theme Selector</h2>
      <motion.div
        className="flex gap-4 overflow-x-auto pb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {themes.map((theme) => (
          <motion.button
            key={theme.name}
            onClick={() => handleColorChange(theme.color)}
            className={`flex-shrink-0 rounded-2xl p-4 w-36 h-24 flex flex-col items-center justify-end transition-all duration-300 shadow-md ${
              selectedColor === theme.color ? "ring-4 ring-white scale-105" : ""
            }`}
            style={{ backgroundColor: theme.color }}
            whileHover={{ scale: 1.08 }}
          >
            <span className="text-sm font-semibold text-white drop-shadow-sm">
              {theme.name}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
