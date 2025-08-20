"use client"

import { useState, useEffect } from "react"
import {
  Trash2,
  Cloud,
  Sun,
  Clock,
  PenTool,
  LayoutList,
  Headphones,
  Music,
} from "lucide-react"
import { closestCorners, DndContext } from '@dnd-kit/core'
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
import { TemplateWidget } from "@/components/widgetTemplate"



export default function StudiioHomepage() {
  return (
    <div id="app-container" className="min-h-screen transition-colors duration-300 pt-6 pb-6">
      <div id="app-container" className="min-h-screen transition-colors duration-300">
        <div className="stars" />
        <div className="max-w-7xl mx-auto flex flex-col relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">Studiio</h1>
            <p className="text-white-400 text-sm">studying made simple.</p>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
            <DndContext collisionDetection={closestCorners}>
              <CurrentTimeWidget />
              <WeatherWidget />
              <PomodoroTimer />
              <QuickNotesWidget />
              <StudySoundsWidget />
              <div className="h-[450px]">
                <SocratesChatbot />
              </div>
              <BreakTimer />
              <CalculatorWidget />
              <InspirationQuote />
              <ColorPaletteSelector />
              <LinksWidget />
              <TemplateWidget />
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  )
}