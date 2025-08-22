"use client"
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
import { SpotifyWidget } from "@/components/spotifyWidget"

export default function StudiioHomepage() {
  return (
    <div id="app-container" className="min-h-screen transition-colors duration-300 pt-6 pb-6">
      <div id="app-container" className="min-h-screen transition-colors duration-300">
        <div className="stars" />
        <div className="max-w-7xl mx-auto flex flex-col relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">Studiio</h1>
            <p className="text-white-400 text-sm">studying made simple.</p>
          </div>

          {/* Widget Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
            {/* Current Time Widget */}
            <CurrentTimeWidget />

            {/* Weather Widget */}
            <WeatherWidget />

            {/* Pomodoro Timer Widget - Spans 2 columns on MD, 1 on LG/XL */}
            <div className="md:col-span-2 lg:col-span-1">
              <PomodoroTimer />
            </div>

            {/* Quick Notes Widget */}
            <QuickNotesWidget />

            {/* Study Sounds Widget */}
            <StudySoundsWidget />

            {/* Socrates AI Chatbot Widget - Fixed height to prevent stretching */}
            <div className="h-[450px]">
              <SocratesChatbot />
            </div>

            {/* Study Break Timer Widget */}
            <div className="h-[540px]">
              <BreakTimer />
            </div>

            {/* Quick Calculator Widget */}
            <div className="h-[540px]">
              <CalculatorWidget />
            </div>

            {/* Inspiration/Quote Widget */}
            <InspirationQuote />

            {/* Theme selector Widget */}
            <ColorPaletteSelector />

            {/* Links and Resources Widget */}
            <LinksWidget />

            {/* Spotify Widget */}
            <SpotifyWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
