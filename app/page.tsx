"use client"

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

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
import { TemplateWidget } from "@/components/widgetTemplate"

import GridLayout from "react-grid-layout"
import { Wrench, NotepadText } from "lucide-react"

export default function StudiioHomepage() {
  const [isEditing, setIsEditing] = useState(false)

  const widgetList = [
    CurrentTimeWidget,    //0
    PomodoroTimer,        //1
    WeatherWidget,        //2
    QuickNotesWidget,     //3
    StudySoundsWidget,    //4
    SocratesChatbot,      //5
    BreakTimer,           //6
    CalculatorWidget,     //7
    InspirationQuote,     //8
    ColorPaletteSelector, //9
    LinksWidget           //10
  ]

  const layout = localStorage.getItem("layout") ?
  JSON.parse(localStorage.getItem("layout"))
  :
  [
    { i: '0', x: 0, y: 0, w: 2, h: 1, },                  { i: '1', x: 2, y: 0, w: 2, h: 2, minW: 2, minH: 2 },  { i: '2', x: 4, y: 0, w: 2, h: 2, minH: 2},
    { i: '3', x: 0, y: 1, w: 2, h: 5, minH: 2 },          { i: '4', x: 2, y: 2, w: 2, h: 2, minH: 2 },           { i: '5', x: 4, y: 2, w: 2, h: 6, minW: 2, minH: 1 },
    { i: '6', x: 0, y: 2, w: 2, h: 2, minH: 2, minW: 2 }, { i: '7', x: 2, y: 4, w: 2, h: 4, minH: 2 },           { i: '8', x: 4, y: 8, w: 2, h: 2, minW: 2, minH: 2 },
    { i: '9', x: 0, y: 4, w: 2, h: 2, minH: 2 },          { i: '10', x: 2, y: 8, w: 2, h: 5, minW: 2, minH: 5 },
  ]

  return (
    <div id="app-container" className="min-h-screen transition-colors duration-300 pt-6 pb-6">
      <div id="app-container" className="min-h-screen transition-colors duration-300">
        <div className="stars" />
        <div className="max-w-7xl mx-auto flex flex-col relative z-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">Studiio</h1>
            <p className="text-white-400 text-sm">studying made simple.</p>
          </div>
          <GridLayout 
            className="layout"
            layout={layout}
            cols={6}
            rowHeight={100}
            width={1200}
            isResizable={isEditing}
            isDraggable={isEditing}
            resizeHandles={['se']}
            onLayoutChange={(layout) => { localStorage.setItem("layout", JSON.stringify(layout)) }}
          >
            {
              widgetList.map((widget, id) => {
                return (
                  <div
                    key={id.toString()}
                  >
                    {widget()}
                  </div>
                )
              })
            }
          </GridLayout>
          
        <button 
          onClick={() => { setIsEditing(!isEditing) }}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
          }}
          title={isEditing? 'Stop Editing' : 'Edit'}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: 999,
            alignContent: 'center',
            padding: 10
          }}>
            {
              isEditing ?
              <NotepadText style={{ color: 'black' }} />
              :
              <Wrench style={{ color: 'black' }} />
            }
          </div>
        </button>
        </div>
      </div>
    </div>
  )
}