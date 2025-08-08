"use client"

import { useState, useEffect } from "react"
import { Trash2, Play, Pause, Square, Cloud, Sun, Clock, Calculator, Coffee, PenTool, LayoutList, Headphones, Timer } from "lucide-react"
import { SocratesChatbot } from "@/components/socrates-chatbot"
import { InspirationQuote } from "@/components/inspiration-quote" // Import the new component
import { ColorPaletteSelector } from "@/components/ColorThemePicker"; //Import the Color theme picker componenet

export default function StudiioHomepage() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionCount, setSessionCount] = useState(1)
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)

  // Notes state
  const [notes, setNotes] = useState("")
  const [wordCount, setWordCount] = useState(0)

  // Study sounds state
  const [currentSound, setCurrentSound] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  // Current time state
  const [currentTime, setCurrentTime] = useState(new Date())

  // Calculator state
  const [calcDisplay, setCalcDisplay] = useState("0")
  const [calcPrevValue, setCalcPrevValue] = useState<number | null>(null)
  const [calcOperation, setCalcOperation] = useState<string | null>(null)
  const [calcWaitingForOperand, setCalcWaitingForOperand] = useState(false)

  // Break timer state
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60)
  const [isBreakRunning, setIsBreakRunning] = useState(false)

  // Reminders state
  const [reminders, setReminders] = useState([
    { id: 1, text: "Review math notes", time: "2:00 PM", completed: false },
    { id: 2, text: "Submit essay draft", time: "5:00 PM", completed: false },
  ])
  const [newReminder, setNewReminder] = useState("")

  const breakActivities = [
    "Take 10 deep breaths",
    "Stretch your arms and neck",
    "Walk around for 2 minutes",
    "Drink a glass of water",
    "Look out the window",
    "Do 10 jumping jacks",
  ]

  // Timer effect
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

  // Break timer effect
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

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Timer functions
  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => setIsRunning(false)
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(workDuration * 60)
    setIsBreak(false)
    setSessionCount(1)
  }

  // Break timer functions
  const startBreakTimer = () => setIsBreakRunning(true)
  const pauseBreakTimer = () => setIsBreakRunning(false)
  const resetBreakTimer = () => {
    setIsBreakRunning(false)
    setBreakTimeLeft(5 * 60)
  }

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculator functions
  const inputNumber = (num: string) => {
    if (calcWaitingForOperand) {
      setCalcDisplay(String(num))
      setCalcWaitingForOperand(false)
    } else {
      setCalcDisplay(calcDisplay === "0" ? String(num) : calcDisplay + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(calcDisplay)

    if (calcPrevValue === null) {
      setCalcPrevValue(inputValue)
    } else if (calcOperation) {
      const currentValue = calcPrevValue || 0
      const newValue = calculate(currentValue, inputValue, calcOperation)

      setCalcDisplay(String(newValue))
      setCalcPrevValue(newValue)
    }

    setCalcWaitingForOperand(true)
    setCalcOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "*":
        return firstValue * secondValue
      case "/":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(calcDisplay)

    if (calcPrevValue !== null && calcOperation) {
      const newValue = calculate(calcPrevValue, inputValue, calcOperation)
      setCalcDisplay(String(newValue))
      setCalcPrevValue(null)
      setCalcOperation(null)
      setCalcWaitingForOperand(true)
    }
  }

  const clearCalculator = () => {
    setCalcDisplay("0")
    setCalcPrevValue(null)
    setCalcOperation(null)
    setCalcWaitingForOperand(false)
  }

  // Reminder functions
  const addReminder = () => {
    if (newReminder.trim()) {
      const reminder = {
        id: Date.now(),
        text: newReminder,
        time: "Now",
        completed: false,
      }
      setReminders([...reminders, reminder])
      setNewReminder("")
    }
  }

  const toggleReminder = (id: number) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder)),
    )
  }

  const [linkName, setLinkName] = useState("")
  const [linkURL, setLinkURL] = useState("")
  const [links, setLinks] = useState<{ id: number; name: string; url: string }[]>([])

  const addLink = () => {
    if (!linkName.trim() || !linkURL.trim()) {
      alert("Please enter a value") 
      return
    }

    try {
      new URL(linkURL)
    } catch {
      alert("Please enter a valid URL")
      return
    }
    
    setLinks((prev) => [
      ...prev,
      { id: Date.now(), name: linkName.trim(), url: linkURL.trim() },
    ])
  }

  const removeLink = (id: number) =>{
    setLinks((prev) => prev.filter((link) => link.id !== id))
  }

  return (
    <div id="app-container" className="min-h-screen transition-colors duration-300">

    <div id="app-container" className="min-h-screen transition-colors duration-300">

      <div className="stars" /> {/* Starry background element */}
      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">Studiio</h1>
          <p className="text-gray-400 text-sm">Your Complete Study Hub - Stay Focused, Stay Organized</p>
        </div>
        {/* Widget Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
          {/* Current Time Widget */}
          <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col justify-center shadow-lg widget-hover">
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

          {/* Weather Widget */}
          <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col justify-center shadow-lg widget-hover">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-accent-white" />
                <span className="text-gray-300 text-sm font-medium">Weather</span>
              </div>
              <Sun className="w-5 h-5 text-gray-300" />
            </div>
            <div className="text-xl font-bold text-white">72°F</div>
            <div className="text-gray-400 text-xs">Sunny</div>
          </div>

          {/* Pomodoro Timer Widget - Spans 2 columns on MD, 1 on LG/XL */}
          <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 md:col-span-2 lg:col-span-1 flex flex-col justify-center shadow-lg widget-hover">
            <div className="flex items-center gap-2 mb-3">
              <Timer className="w-4 h-4 text-gray-300" />
              <span className="text-gray-300 text-sm font-medium">Pomodoro Timer</span>
            </div>
            <div className="text-center">
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

          {/* Quick Notes Widget */}
          <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col shadow-lg widget-hover">
            <div className="flex items-center gap-2 mb-2">
              <PenTool className="w-4 h-4 text-accent-white" />
              <span className="text-gray-300 text-sm font-medium">Quick Notes</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value)
                setWordCount(e.target.value.split(/\s+/).filter((word) => word.length > 0).length)
              }}
              placeholder="Jot down thoughts..."
              className="flex-1 w-full bg-input-bg border border-input-border rounded-xl px-3 py-2 text-white text-xs placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-accent-white"
            />
            <div className="text-gray-400 text-xs mt-1">{wordCount} words</div>
          </div>

          {/* Study Sounds Widget */}
          <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col shadow-lg widget-hover">
            <div className="flex items-center gap-2 mb-3">
              <Headphones className="w-4 h-4 text-accent-white" />
              <span className="text-gray-300 text-sm font-medium">Study Sounds</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3 flex-1">
              {["Rain", "Vibe", "Nature", "White"].map((sound) => (
                <button
                  key={sound}
                  onClick={() => {
                    setCurrentSound(sound)
                    setIsPlaying(!isPlaying || currentSound !== sound)
                  }}
                  className={`p-2 rounded-xl text-xs transition-all duration-200 shadow-md ${
                    currentSound === sound && isPlaying
                      ? "bg-white/20 text-white border border-white/30 shadow-white/10"
                      : "bg-button-bg text-gray-300 hover:bg-button-hover-bg border border-border"
                  }`}
                >
                  {sound}
                </button>
              ))}
            </div>
            {currentSound && isPlaying && (
              <div className="text-xs text-gray-300 text-center animate-pulse">♪ {currentSound}</div>
            )}
          </div>

          {/* Socrates AI Chatbot Widget - Fixed height to prevent stretching */}
          <div className="h-[450px]">
            <SocratesChatbot />
          </div>

          {/* Study Break Timer Widget */}
          <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col shadow-lg widget-hover h-[540px]">
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

          {/* Quick Calculator Widget - Moved to Reminders' old spot */}
          <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col shadow-lg widget-hover h-[540px]">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-accent-white" />
              <span className="text-gray-300 text-sm font-medium">Calculator</span>
            </div>
            <div className="flex-1 flex flex-col">
              {/* Display */}
              <div className="bg-input-bg border border-input-border rounded-xl p-2 mb-2">
                <div className="text-right text-white text-sm font-mono truncate">{calcDisplay}</div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-4 gap-1 h-full grid-rows-5">
                <button
                  onClick={clearCalculator}
                  className="bg-button-bg hover:bg-button-hover-bg text-red-400 rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  C
                </button>
                <button
                  onClick={() => inputOperation("/")}
                  className="bg-button-bg hover:bg-button-hover-bg text-gray-300 rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  ÷
                </button>
                <button
                  onClick={() => inputOperation("*")}
                  className="bg-button-bg hover:bg-button-hover-bg text-gray-300 rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  ×
                </button>
                <button
                  onClick={() => inputOperation("-")}
                  className="bg-button-bg hover:bg-button-hover-bg text-gray-300 rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  −
                </button>

                <button
                  onClick={() => inputNumber("7")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  7
                </button>
                <button
                  onClick={() => inputNumber("8")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  8
                </button>
                <button
                  onClick={() => inputNumber("9")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  9
                </button>
                <button
                  onClick={() => inputOperation("+")}
                  className="bg-button-bg hover:bg-button-hover-bg text-gray-300 rounded-lg text-xs row-span-2 transition-all duration-200 shadow-md calc-button-outline"
                >
                  +
                </button>

                <button
                  onClick={() => inputNumber("4")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  4
                </button>
                <button
                  onClick={() => inputNumber("5")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  5
                </button>
                <button
                  onClick={() => inputNumber("6")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  6
                </button>

                <button
                  onClick={() => inputNumber("1")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  1
                </button>
                <button
                  onClick={() => inputNumber("2")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  2
                </button>
                <button
                  onClick={() => inputNumber("3")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  3
                </button>
                <button
                  onClick={performCalculation}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs row-span-2 transition-all duration-200 shadow-md calc-button-outline"
                >
                  =
                </button>

                <button
                  onClick={() => inputNumber("0")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs col-span-2 transition-all duration-200 shadow-md calc-button-outline"
                >
                  0
                </button>
                <button
                  onClick={() => inputNumber(".")}
                  className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
                >
                  .
                </button>
              </div>
            </div>
          </div>

          {/* Inspiration/Quote Widget */}
          <InspirationQuote />

          {/* Theme selector Widget */}
          <ColorPaletteSelector />
          
          {/* Links and Resources Widget */}
          <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col shadow-lg widget-hover">
            <div className="flex items-center gap-2 mb-2">
              <LayoutList className="w-4 h-4 text-accent-white" />
              <span className="text-gray-300 text-sm font-medium">Links & Resources</span>
            </div>

            <ul className="flex flex-col gap-2 text-[13px]">
              {links.length === 0 && (
                <li className="text-gray-500 text-xs italic text-center">
                  No links added yet
                </li>
              )}
              {links.map(({ id, name, url }) => (
                <li
                  key={id}
                  className="flex items-center border border-gray-600 rounded p-2 hover:border-white transition-colors"
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-white text-sm truncate max-w-[80%] hover:underline text-[12px]"
                    title={url}
                  >
                    {name}
                  </a>
                  <button
                    onClick={() => removeLink(id)}
                    className="text-red-500 hover:text-red-350 p-1 rounded ml-auto"
                    aria-label={`Remove ${name}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-gray-500"></div>
            <div className= "mt-2 text-gray-300 text-sm font-medium mb-2 text-center">Create a New Link:</div>
            <div className="flex flex-col gap-2 mb-4">
              <input
                type="text"
                placeholder="Insert Link Name"
                value={linkName}
                onChange={(e) => setLinkName(e.target.value)}
                className="border border-gray-600 rounded p-2 hover:border-white transition-colors text-[12px]"
              />
              <input
                type="url"
                placeholder="URL (https://studiio.xyz/)"
                value={linkURL}
                onChange={(e) => setLinkURL(e.target.value)}
                className="bg-card border border-gray-600 rounded p-2 hover:border-white transition-colors text-[12px]"
              />
              <button
                onClick={addLink}
                className="bg-gray-600 hover:bg-button-hover-bg text-white px-3 py-1.5 rounded-xl text-xs transition-all duration-200 shadow-md"
              >
                Add Link
              </button>
            </div>
          </div>
        
        </div>
      </div>
    </div>
    </div>
  )
}
