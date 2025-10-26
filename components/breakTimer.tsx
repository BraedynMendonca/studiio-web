"use client"

import { useState, useEffect } from "react"
import { Coffee } from "lucide-react"

export function BreakTimer() {
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60)
  const [isBreakRunning, setIsBreakRunning] = useState(false)
  const [mounted, setMounted] = useState(false)

  const breakActivities = [
    "Take 10 deep breaths",
    "Stretch your arms and neck",
    "Walk around for 2 minutes",
    "Drink a glass of water",
    "Look out the window",
    "Do 10 jumping jacks",
  ]

  // Load saved state from localStorage on mount
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("studiio-break-timer")
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState)
          setBreakTimeLeft(parsed.timeLeft || 5 * 60)
        } catch (error) {
          console.error("Error loading break timer state:", error)
        }
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const state = {
        timeLeft: breakTimeLeft,
      }
      localStorage.setItem("studiio-break-timer", JSON.stringify(state))
    }
  }, [breakTimeLeft, mounted])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isBreakRunning && breakTimeLeft > 0) {
      interval = setInterval(() => {
        setBreakTimeLeft(breakTimeLeft - 1)
      }, 1000)
    } else if (breakTimeLeft === 0) {
      setIsBreakRunning(false)
      setBreakTimeLeft(5 * 60)
    }
    return () => clearInterval(interval)
  }, [isBreakRunning, breakTimeLeft])

  const startBreakTimer = () => setIsBreakRunning(true)
  const pauseBreakTimer = () => setIsBreakRunning(false)
  const resetBreakTimer = () => {
    setIsBreakRunning(false)
    setBreakTimeLeft(5 * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col justify-center widget-hover flex-1"
      style={{ height: "100%", justifyContent: "flex-start" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Coffee className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Break Timer</span>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-3">
          <div className="text-2xl font-mono font-bold text-white mb-1">{formatTime(breakTimeLeft)}</div>
          <div className="text-xs text-gray-400 mb-2">
            {breakActivities[Math.floor(Math.random() * breakActivities.length)]}
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={startBreakTimer}
            disabled={isBreakRunning}
            className="flex-1 bg-button-bg hover:bg-button-hover-bg disabled:bg-gray-800 text-green-400 disabled:text-gray-500 py-1.5 rounded-lg text-xs transition-all duration-200 shadow-md"
          >
            Start
          </button>
          <button
            onClick={pauseBreakTimer}
            disabled={!isBreakRunning}
            className="flex-1 bg-button-bg hover:bg-button-hover-bg disabled:bg-gray-800 text-yellow-400 disabled:text-gray-500 py-1.5 rounded-lg text-xs transition-all duration-200 shadow-md"
          >
            Pause
          </button>
          <button
            onClick={resetBreakTimer}
            className="flex-1 bg-button-bg hover:bg-button-hover-bg text-red-400 py-1.5 rounded-lg text-xs transition-all duration-200 shadow-md"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
