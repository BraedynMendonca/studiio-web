"use client"

import { useState, useRef } from "react"

export function Audio(src: string, name: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div key={name}>
      <audio ref={audioRef} loop>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={togglePlay}
        className={`p-2 rounded-xl text-xs transition-all duration-200 shadow-md w-full ${
          isPlaying
            ? "bg-white/20 text-white border border-white/30 shadow-white/10"
            : "bg-button-bg text-gray-300 hover:bg-button-hover-bg border border-border"
        }`}
      >
        {name}
      </button>
    </div>
  )
}
