"use client"

import { useState, useEffect } from "react"
import { Pencil, Play, Pause, Square, Coffee, Timer } from "lucide-react"

export function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const[timerRunning, setTimerRunning] = useState(false)
    const [selectedMinutes, setSelectedMinutes] = useState(25);
    const [selectedSeconds, setSelectedSeconds] = useState(0);

    const[breakTimeLeft, setBreakTimeLeft] = useState(10*60)
    const[breakTimerRunning, setBreakTimerRunning] = useState(false)
    const [selectedBreakMinutes, setSelectedBreakMinutes] = useState(10);
    const [selectedBreakSeconds, setSelectedBreakSeconds] = useState(0);

    const[timerStarted, setTimerStarted] = useState(false)
    const [sessionCount, setSessionCount] = useState(1)
    const[isWorking, setIsWorking] = useState(false) //false is break, true is work

    const breakActivities = [
        "Take 10 deep breaths",
        "Stretch your arms and neck",
        "Walk around for 2 minutes",
        "Drink a glass of water",
        "Look out the window",
        "Do 10 jumping jacks",
    ]

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }


    useEffect(() => {
        setTimeLeft(selectedMinutes * 60 + selectedSeconds);
    }, [selectedMinutes, selectedSeconds]);

    useEffect(() => {
        setBreakTimeLeft(selectedBreakMinutes * 60 + selectedBreakSeconds);
    }, [selectedBreakMinutes, selectedBreakSeconds]);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (timerStarted && timerRunning && timeLeft > 0 && isWorking) {
        interval = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)
        } else if (timerStarted && breakTimerRunning && breakTimeLeft > 0 && !isWorking) {
        interval = setInterval(() => {
            setBreakTimeLeft(breakTimeLeft - 1)
        }, 1000)
        } else if(isWorking && timerStarted && timerRunning && timeLeft == 0){
        setIsWorking(false)
        setTimerRunning(false)
        setBreakTimerRunning(true)
        setTimeLeft(selectedMinutes * 60 + selectedSeconds);
        } else if(!isWorking && timerStarted && breakTimerRunning && breakTimeLeft == 0){
        setIsWorking(true)
        setTimerRunning(true)
        setBreakTimerRunning(false)
        setBreakTimeLeft(selectedBreakMinutes * 60 + selectedBreakSeconds);
        }
        return () => clearInterval(interval)
    }, [isWorking, timerStarted, timerRunning, timeLeft, breakTimerRunning, breakTimeLeft])

    // Timer functions
    const startTimer = () => {
        if (!timerStarted){
        setTimerRunning(true); 
        setTimerStarted(true);
        setIsWorking(true)
        }
        else if (timerStarted && isWorking){
        setTimerRunning(true); 
        }
        else if (timerStarted && !isWorking){
        setBreakTimerRunning(true); 
        }
    }
    const pauseTimer = () => {
        if (timerRunning){
        setTimerRunning(false)
        }
        else if (breakTimerRunning){
        setBreakTimerRunning(false)
        }
    }
    const resetTimer = () => {
        setTimerStarted(false)
        setTimerRunning(false)
        setBreakTimerRunning(false)
        setIsWorking(true)

        setSessionCount(1)
    }

  return (
    <div className="glass-card rounded-2xl p-4 md:col-span-2 lg:col-span-1 flex flex-col justify-center widget-hover">
    <div className="flex items-center gap-2 mb-1">
        <Timer className="w-4 h-4 text-gray-300" />
        <span className="text-gray-300 text-sm font-medium">Pomodoro</span>
    </div>
    <div className="text-xs mb-3 text-gray-400">
        Click on the times to change them!
    </div>
    <div className="border border-gray-600 rounded-xl p-3 mt-2">
        <div className="flex items-center gap-2 mb-3 top-2">
        <Pencil className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Work Timer</span>
        </div>
        <div className="flex justify-center">
        <div className="text-center mb-2">
            {!timerStarted? (
            <>
                {/* Minutes Dropdown */}
                <select
                className="select-no-arrow w-12 text-2xl font-mono font-bold text-white bg-transparent border-b border-gray-500 text-center focus:outline-none"
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(Number(e.target.value))}
                >
                {[...Array(60)].map((_, i) => (
                    <option
                    className="bg-gray-900 w-12 text-2xl font-mono font-bold text-white"
                    key={i}
                    value={i}
                    >
                    {i.toString().padStart(2, "0")}
                    </option>
                ))}
                </select>

                <span className="w-8 text-2xl font-mono font-bold text-white">:</span>

                {/* Seconds Dropdown */}
                <select
                className="select-no-arrow w-12 text-2xl font-mono font-bold text-white bg-transparent border-b border-gray-500 text-center focus:outline-none"
                value={selectedSeconds}
                onChange={(e) => setSelectedSeconds(Number(e.target.value))}
                >
                {[...Array(60)].map((_, i) => (
                    <option
                    className="bg-gray-900 w-12 text-2xl font-mono font-bold text-white"
                    key={i}
                    value={i}
                    >
                    {i.toString().padStart(2, "0")}
                    </option>
                ))}
                </select>
            </>
            ) : (
            <div className="text-2xl font-mono font-bold text-white mb-1">
                {formatTime(timeLeft)}
            </div>
            )}
            <div className="text-gray-400 text-xs mb-1">
            Session {sessionCount}
            </div>
        </div>
        </div>
    </div>
    <div className="border border-gray-600 rounded-xl p-3 mt-2">
        <div className="flex items-center gap-2 mb-3 top-2">
        <Coffee className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Break Timer</span>
        </div>
        <div className="flex justify-center">
        <div className="text-center mb-3">
            {!timerStarted? (
            <>
                <select
                className="select-no-arrow w-12 text-2xl font-mono font-bold text-white bg-transparent border-b border-gray-500 text-center focus:outline-none"
                value={selectedBreakMinutes}
                onChange={(e) => setSelectedBreakMinutes(Number(e.target.value))}
                >
                {[...Array(60)].map((_, i) => (
                    <option
                    className="bg-gray-900 w-12 text-2xl font-mono font-bold text-white"
                    key={i}
                    value={i}
                    >
                    {i.toString().padStart(2, "0")}
                    </option>
                ))}
                </select>

                <span className="w-8 text-2xl font-mono font-bold text-white">:</span>

                <select
                className="select-no-arrow w-12 text-2xl font-mono font-bold text-white bg-transparent border-b border-gray-500 text-center focus:outline-none"
                value={selectedBreakSeconds}
                onChange={(e) => setSelectedBreakSeconds(Number(e.target.value))}
                >
                {[...Array(60)].map((_, i) => (
                    <option
                    className="bg-gray-900 w-12 text-2xl font-mono font-bold text-white"
                    key={i}
                    value={i}
                    >
                    {i.toString().padStart(2, "0")}
                    </option>
                ))}
                </select>
            </>
            ) : (
            <div className="text-2xl font-mono font-bold text-white mb-1">
                {formatTime(breakTimeLeft)}
            </div>
            )}
            <div className="text-xs text-gray-400 mb-1">
            {breakActivities[Math.floor(Math.random() * breakActivities.length)]}
            </div>
        </div>
        </div>
    </div>
    <div className="flex justify-center gap-2 mt-2">
        <button
        onClick={startTimer}
        disabled={timerRunning || breakTimerRunning}
        className="bg-button-bg hover:bg-button-hover-bg disabled:bg-gray-800 text-green-400 disabled:text-gray-500 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all duration-200 shadow-md"
        >
        <Play className="w-3 h-3" />
        Start
        </button>
        <button
        onClick={pauseTimer}
        disabled={!timerRunning && !breakTimerRunning}
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
  )
}
