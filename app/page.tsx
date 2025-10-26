"use client"

import { useState, useEffect } from "react"
import Script from "next/script"
import { InspirationQuote } from "@/components/inspiration-quote"
import { PersonalizationWidget } from "@/components/personalizationWidget"
import { BreakTimer } from "@/components/breakTimer"
import { CalculatorWidget } from "@/components/calculatorWidget"
import { CurrentTimeWidget } from "@/components/currentTimeWidget"
import { LinksWidget } from "@/components/linksWidget"
import { PomodoroTimer } from "@/components/pomodoroTimer"
import { QuickNotesWidget } from "@/components/quickNotesWidget"
import { StudySoundsWidget } from "@/components/studySoundsWidget"
import { WeatherWidget } from "@/components/weatherWidget"
import { TodoListWidget } from "@/components/todoListWidget"
import { ThemedLiquidEther } from "@/components/backgrounds/ThemedLiquidEther"
import { ThemedGradientBlinds } from "@/components/backgrounds/ThemedGradientBlinds"

import { useThemeStore } from "@/lib/themeStore"

// Extend Window interface to include chtlConfig
declare global {
  interface Window {
    chtlConfig: {
      chatbotId: string
    }
  }
}

export default function StudiioHomepage() {
  const [mounted, setMounted] = useState(false)
  const background = useThemeStore((state) => state.background)
  const color = useThemeStore((state) => state.color)

  useEffect(() => {
    setMounted(true)

    // Set up Chatling configuration
    if (typeof window !== "undefined") {
      window.chtlConfig = {
        chatbotId: "4171265299",
      }
    }
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
    <>
      {/* Chatling Script */}
      <Script id="chtl-script" src="https://chatling.ai/js/embed.js" data-id="4171265299" strategy="afterInteractive" />

      <div
        id="app-container"
        className="min-h-screen transition-colors duration-300 pt-6 pb-6"
        style={{ backgroundColor: background === "solid-color" ? color : "transparent" }}
      >
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
          {background === "liquid-ether" && <ThemedLiquidEther />}
          {background === "gradient-blinds" && <ThemedGradientBlinds />}
        </div>
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

          {/* Widget Grid Layout - Symmetrical 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
            {/* Row 1 - Top row with 4 widgets */}
            <div className="h-32">
              <CurrentTimeWidget />
            </div>
            <div className="h-48">
              <PomodoroTimer />
            </div>
            <div className="h-48">
              <WeatherWidget />
            </div>
            <div className="h-48">
              <BreakTimer />
            </div>

            {/* Row 2 - Two tall widgets and two medium widgets */}
            <div className="h-96 md:row-span-2">
              <QuickNotesWidget />
            </div>
            <div className="h-48">
              <StudySoundsWidget />
            </div>
            <div className="h-48">
              <PersonalizationWidget />
            </div>
            <div className="h-96 md:row-span-2">
              <CalculatorWidget />
            </div>

            {/* Row 3 - Inspiration quote and Todo List */}
            <div className="h-64">
              <InspirationQuote />
            </div>
            <div className="h-64">
              <TodoListWidget />
            </div>

            {/* Row 4 - Full width Links widget */}
            <div className="h-96 md:col-span-2 lg:col-span-3 xl:col-span-4">
              <LinksWidget />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
