"use client"

import { useState, useEffect } from "react"
import { Timer, Play, Pause, Square } from "lucide-react"

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionCount, setSessionCount] = useState(1)
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [mounted, setMounted] = useState(false)

  // Load saved state from localStorage on mount
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("studiio-pomodoro")
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState)
          setTimeLeft(parsed.timeLeft || 25 * 60)
          setIsBreak(parsed.isBreak || false)
          setSessionCount(parsed.sessionCount || 1)
          setWorkDuration(parsed.workDuration || 25)
          setBreakDuration(parsed.breakDuration || 5)
        } catch (error) {
          console.error("Error loading pomodoro state:", error)
        }
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const state = {
        timeLeft,
        isBreak,
        sessionCount,
        workDuration,
        breakDuration,
      }
      localStorage.setItem("studiio-pomodoro", JSON.stringify(state))
    }
  }, [timeLeft, isBreak, sessionCount, workDuration, breakDuration, mounted])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (!isBreak) {
        setTimeLeft(breakDuration * 60)
        setIsBreak(true)
      } else {
        setTimeLeft(workDuration * 60)
        setIsBreak(false)
        setSessionCount(sessionCount + 1)
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak, workDuration, breakDuration, sessionCount])

  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => setIsRunning(false)
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(workDuration * 60)
    setIsBreak(false)
    setSessionCount(1)
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
        <Timer className="w-4 h-4 text-gray-300" />
        <span className="text-gray-300 text-sm font-medium">Pomodoro Timer</span>
      </div>
      <div className="text-center flex-1 flex flex-col justify-center">
        <div className="text-3xl font-mono font-bold text-white mb-2 drop-shadow-lg">{formatTime(timeLeft)}</div>
        <div className="text-gray-400 text-xs mb-3">
          {isBreak ? "Break Time" : "Work Time"} • Session {sessionCount}
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className="bg-button-bg hover:bg-button-hover-bg disabled:bg-gray-800 text-green-400 disabled:text-gray-500 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all duration-200 shadow-md"
          >
            <Play className="w-3 h-3" />
            Start
          </button>
          <button
            onClick={pauseTimer}
            disabled={!isRunning}
            className="bg-button-bg hover:bg-button-hover-bg disabled:bg-gray-800 text-yellow-400 disabled:text-gray-500 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all duration-200 shadow-md"
          >
            <Pause className="w-3 h-3" />
            Pause
          </button>
          <button
            onClick={resetTimer}
            className="bg-button-bg hover:bg-button-hover-bg text-red-400 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all duration-200 shadow-md"
          >
            <Square className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
