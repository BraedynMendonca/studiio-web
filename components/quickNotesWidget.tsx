"use client"

import { useState } from "react"
import { PenTool } from "lucide-react"

export function QuickNotesWidget() {
  const [notes, setNotes] = useState("")
  const [wordCount, setWordCount] = useState(0)

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col justify-center widget-hover flex-1"
      style={{ height: "105%", justifyContent: "flex-start" }}
    >
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
  )
}
