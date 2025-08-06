"use client"

import { useEffect, useState } from "react"

const COLORS = [
  { name: "Sakura Pink", hex: "#F472B6" },
  { name: "Ocean Blue", hex: "#3B82F6" },
  { name: "Mint Green", hex: "#34D399" },
  { name: "Sunset Orange", hex: "#FB923C" },
  { name: "Lavender Purple", hex: "#A78BFA" },
  { name: "Lemon Yellow", hex: "#FACC15" },
  { name: "Sky Teal", hex: "#2DD4BF" },
  { name: "Rose Red", hex: "#E11D48" },
]

export function ColorPaletteSelector() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  // When page loads, apply stored color
  useEffect(() => {
    const savedColor = localStorage.getItem("selectedColor")
    if (savedColor) {
      setSelectedColor(savedColor)
      updateContainerColor(savedColor)
    }
  }, [])

  // Directly apply color to #app-container
  const updateContainerColor = (color: string) => {
    const container = document.getElementById("app-container")
    if (container) {
      container.style.backgroundColor = color
    } else {
      console.warn("App container not found")
    }
  }

  const handleColorClick = (color: string) => {
    setSelectedColor(color)
    localStorage.setItem("selectedColor", color)
    updateContainerColor(color)
  }

  return (
    <div className="rounded-2xl border border-border p-6 h-[540px] flex flex-col shadow-lg widget-hover bg-[#2a333b]">
      <div className="text-gray-300 text-sm font-medium mb-4">Choose a color theme</div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {COLORS.map((color, index) => (
          <div
            key={index}
            onClick={() => handleColorClick(color.hex)}
            style={{
              backgroundColor: color.hex,
              borderColor: selectedColor === color.hex ? "#ffffff" : "transparent",
            }}
            className="rounded-xl w-full h-20 cursor-pointer border-2 px-4 py-3 flex items-center justify-between transition-all"
          >
            <span className="text-white font-medium drop-shadow">{color.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
