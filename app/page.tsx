"use client"

import { useState, useEffect } from "react"
import { SocratesChatbot } from "@/components/socrates-chatbot"
import { InspirationQuote } from "@/components/inspiration-quote"
import { ColorPaletteSelector } from "@/components/ColorThemePicker"
import { BreakTimer } from "@/components/breakTimer"
import { CalculatorWidget } from "@/components/calculatorWidget"
import { CurrentTimeWidget } from "@/components/currentTimeWidget"
import { LinksWidget } from "@/components/linksWidget"
import { PomodoroTimer } from "@/components/pomodoroTimer"
import { QuickNotesWidget } from "@/components/quickNotesWidget"
import { StudySoundsWidget } from "@/components/studySoundsWidget"
import { WeatherWidget } from "@/components/weatherWidget"

export default function StudiioHomepage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-white">Loading Studiio...</p>
        </div>
      </div>
    )
  }

  return (
    <div id="app-container" className="min-h-screen transition-colors duration-300 pt-6 pb-6">
      <div className="stars" />
      <div className="max-w-7xl mx-auto flex flex-col relative z-10 px-4">
        {/* Header with ProductHunt badge and title */}
        <div className="flex items-center justify-between mb-6 relative">
          {/* ProductHunt Badge - Left */}
          <div className="flex-shrink-0">
            <a
              href="https://www.producthunt.com/products/studiio?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-studiio"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1012236&theme=dark&t=1757179546827"
                alt="Studiio - Personalized Study Dashboard for Students! | Product Hunt"
                className="w-[200px] h-[43px] lg:w-[250px] lg:h-[54px]"
                width="250"
                height="54"
              />
            </a>
          </div>

          {/* Title - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Studiio</h1>
            <p className="text-white-400 text-xs lg:text-sm">studying made simple.</p>
          </div>

          {/* Spacer for balance - Right */}
          <div className="flex-shrink-0 w-[200px] lg:w-[250px]"></div>
        </div>

        {/* Widget Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
          {/* Row 1 */}
          <div className="h-24">
            <CurrentTimeWidget />
          </div>
          <div className="h-48 md:col-span-1 lg:col-span-1">
            <PomodoroTimer />
          </div>
          <div className="h-48">
            <WeatherWidget />
          </div>
          <div className="h-96 md:col-span-1 lg:col-span-1 xl:col-span-1 md:row-span-2">
            <SocratesChatbot />
          </div>

          {/* Row 2 */}
          <div className="h-96 md:col-span-1 lg:col-span-1 xl:col-span-1 md:row-span-2">
            <QuickNotesWidget />
          </div>
          <div className="h-48">
            <StudySoundsWidget />
          </div>
          <div className="h-48">
            <BreakTimer />
          </div>

          {/* Row 3 */}
          <div className="h-96 md:col-span-1 lg:col-span-1 xl:col-span-1 md:row-span-2">
            <CalculatorWidget />
          </div>
          <div className="h-48">
            <InspirationQuote />
          </div>
          <div className="h-48">
            <ColorPaletteSelector />
          </div>

          {/* Row 4 */}
          <div className="h-96 md:col-span-2 lg:col-span-2 xl:col-span-2">
            <LinksWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
