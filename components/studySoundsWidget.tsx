"use client"

import { useState } from "react"
import { Headphones } from "lucide-react"
import { Audio } from "@/components/audio"

export function StudySoundsWidget() {
  const [currentSound, setCurrentSound] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col justify-center shadow-lg widget-hover flex-1" style={{ height:'100%', justifyContent:'flex-start' }}>
      <div className="flex items-center gap-2 mb-3">
        <Headphones className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Study Sounds</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3 flex-1">
        {[
          ["Rain", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_syqWhZkmI8lj18redM9IyJxmMS3Q/VPjukmNqICQI9QqUDI7RBf/public/audio/rain.mp3"],
          ["Vibe", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_syqWhZkmI8lj18redM9IyJxmMS3Q/nu9OXtUthheyEPoFyS0_R9/public/audio/vibes.mp3"],
          ["Nature", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_syqWhZkmI8lj18redM9IyJxmMS3Q/qoXNYI0MAJRZlYwvAUZX0r/public/audio/nature.mp3"],
          ["White", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_syqWhZkmI8lj18redM9IyJxmMS3Q/PSYa0fLpxVIUtLf-Q6T74Z/public/audio/whitenoise.mp3"],
        ].map((sound) => Audio(sound[1], sound[0]))}
      </div>
      {currentSound && isPlaying && (
        <div className="text-xs text-gray-300 text-center animate-pulse">♪ {currentSound}</div>
      )}
    </div>
  )
}