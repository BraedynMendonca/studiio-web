"use client"

import { useState, useRef, useEffect } from "react"

export function Audio(src: string, name: string) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  return (
    <div key={name} className="w-full">
      <audio ref={audioRef} loop>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="space-y-2">
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
        {isPlaying && (
          <div className="px-2 pb-1">
            <div className="flex items-center gap-2">
              <svg
                className="w-3 h-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="15.536 8.464a5 5 0 010 7.072M12 14l2.5 2.5M12 14l-2.5 2.5M12 14v6M19.071 4.929a10 10 0 010 14.142M4.929 4.929a10 10 0 000 14.142"
                />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <svg
                className="w-3 h-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
