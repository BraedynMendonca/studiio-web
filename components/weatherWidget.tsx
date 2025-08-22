"use client"

import { useState, useEffect } from "react"
import { Cloud, Sun } from "lucide-react"

export function WeatherWidget() {
  const [temp, setTemp] = useState<string>("Loading...")
  const [condition, setCondition] = useState<string>("Loading weather...")
  const [city, setCity] = useState<string>("")
  const [zip, setZip] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("zip") || "10002" : "10002",
  )

  const getWeatherData = async (countryCode = "us") => {
    try {
      const response = await fetch(`/api/weather?zip=${zip}&country=${countryCode}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        setTemp("Weather unavailable")
        setCondition(data.error)
        setCity("")
      } else {
        setTemp(data.temp)
        setCondition(data.condition)
        setCity(data.city)
      }
    } catch (error) {
      console.error("Weather fetch error:", error)
      setTemp("Weather unavailable")
      setCondition("Unable to load weather")
      setCity("")
    }
  }

  useEffect(() => {
    getWeatherData("us")
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("zip", zip)
      getWeatherData("us")
    }
  }, [zip])

  return (
    <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col justify-center shadow-lg widget-hover flex-1" style={{ height:'100%', justifyContent:'flex-start' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-accent-white" />
          <span className="text-gray-300 text-sm font-medium">Weather</span>
        </div>
        <Sun className="w-5 h-5 text-gray-300" />
      </div>

      <div className="text-xl font-bold text-white">{temp}</div>
      <div className="text-gray-400 text-xs">{condition}</div>
      <div className="text-gray-400 text-xs">{city}</div>
      <br />

      <input
        type="text"
        placeholder="Enter ZIP code and press Enter"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setZip((e.target as HTMLInputElement).value)
          }
        }}
        className="flex-1 bg-input-bg border border-input-border rounded-xl px-3 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-white"
      />
    </div>
  )
}