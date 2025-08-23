"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function CurrentTimeWidget() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col justify-center shadow-lg widget-hover flex-1" style={{ height:'100%', justifyContent:'flex-start' }}>
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Time</span>
      </div>
      <div className="text-xl font-bold text-white">
        {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="text-gray-400 text-xs">
        {currentTime.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
      </div>
    </div>
  )
}
