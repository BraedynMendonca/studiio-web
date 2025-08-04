"use client"

import { useState, useEffect } from "react"
import { Lightbulb } from "lucide-react"

export function InspirationQuote() {
  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      quote: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 5000) // Change quote every 5 seconds

    return () => clearInterval(interval)
  }, [quotes.length])

  const currentQuote = quotes[currentQuoteIndex]

  return (
    <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col justify-center shadow-lg widget-hover h-[540px]">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Inspiration</span>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
        <p className="text-white text-lg font-semibold mb-2 italic">&ldquo;{currentQuote.quote}&rdquo;</p>
        <p className="text-gray-400 text-sm">&mdash; {currentQuote.author}</p>
      </div>
    </div>
  )
}
