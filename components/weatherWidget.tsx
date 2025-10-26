"use client"

import { useState, useEffect } from "react"
import { Cloud, Sun, AlertCircle, RefreshCw } from "lucide-react"

export function WeatherWidget() {
  const [temp, setTemp] = useState<string>("Loading...")
  const [condition, setCondition] = useState<string>("Loading weather...")
  const [city, setCity] = useState<string>("")
  const [zip, setZip] = useState<string>("")
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved zip from localStorage only after component mounts
    if (typeof window !== "undefined") {
      const savedZip = localStorage.getItem("zip") || "10002"
      setZip(savedZip)
    }
  }, [])

  const getWeatherData = async (countryCode = "us") => {
    try {
      setError("")
      setIsLoading(true)
      setTemp("Loading...")
      setCondition("Loading weather...")

      const response = await fetch(`/api/weather?zip=${zip}&country=${countryCode}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        setTemp("Weather unavailable")
        setCondition(data.error)
        setCity("")
        setError(data.error)
      } else {
        setTemp(data.temp)
        setCondition(data.condition)
        setCity(data.city)
        setError("")
      }
    } catch (error) {
      console.error("Weather fetch error:", error)
      const errorMessage = error instanceof Error ? error.message : "Unable to load weather"
      setTemp("Weather unavailable")
      setCondition(errorMessage)
      setCity("")
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      getWeatherData("us")
    }
  }, [mounted])

  useEffect(() => {
    if (mounted && zip && typeof window !== "undefined") {
      localStorage.setItem("zip", zip)
      getWeatherData("us")
    }
  }, [zip, mounted])

  const handleZipChange = (newZip: string) => {
    if (mounted && newZip.trim()) {
      setZip(newZip.trim())
    }
  }

  const retryWeather = () => {
    if (mounted) {
      getWeatherData("us")
    }
  }

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col justify-center widget-hover flex-1"
      style={{ height: "100%", justifyContent: "flex-start" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-accent-white" />
          <span className="text-gray-300 text-sm font-medium">Weather</span>
        </div>
        <div className="flex items-center gap-1">
          {error ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : isLoading ? (
            <RefreshCw className="w-4 h-4 text-gray-300 animate-spin" />
          ) : (
            <Sun className="w-4 h-4 text-gray-300" />
          )}
        </div>
      </div>

      <div className="text-xl font-bold text-white">{temp}</div>
      <div className="text-gray-400 text-xs">{condition}</div>
      {city && <div className="text-gray-400 text-xs">{city}</div>}

      {error && (
        <button
          onClick={retryWeather}
          disabled={isLoading}
          className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Retrying..." : "Retry"}
        </button>
      )}

      <div className="mt-2">
        <input
          type="text"
          placeholder="Enter ZIP code and press Enter"
          defaultValue={zip}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              handleZipChange((e.target as HTMLInputElement).value)
            }
          }}
          className="w-full bg-input-bg border border-input-border rounded-xl px-3 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-white disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  )
}
