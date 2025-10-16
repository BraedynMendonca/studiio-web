"use client"

import { useState, useEffect } from "react"
import { Quote, RefreshCw } from "lucide-react"

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
    author: "Unknown",
  },
  {
    text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
    author: "Steve Jobs",
  },
  {
    text: "Experience is a hard teacher because she gives the test first, the lesson afterwards.",
    author: "Vernon Law",
  },
  {
    text: "To know how much there is to know is the beginning of learning to live.",
    author: "Dorothy West",
  },
]

export function InspirationQuote() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getRandomQuote = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setCurrentQuote(quotes[randomIndex])
      setIsRefreshing(false)
    }, 300)
  }

  useEffect(() => {
    // Set initial random quote
    getRandomQuote()
  }, [])

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col justify-center widget-hover flex-1"
      style={{ height: "75%", justifyContent: "flex-start" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-accent-white" />
          <span className="text-gray-300 text-sm font-medium">Daily Inspiration</span>
        </div>
        <button
          onClick={getRandomQuote}
          disabled={isRefreshing}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-gray-400 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <blockquote className="text-white text-sm leading-relaxed mb-4 italic">"{currentQuote.text}"</blockquote>
        <cite className="text-gray-400 text-xs text-right">— {currentQuote.author}</cite>
      </div>
    </div>
  )
}
