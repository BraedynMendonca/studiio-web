"use client"

import { useState, useEffect, useRef } from "react"

export function Audio(path: string, name: string) {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const handleAudioPlay = (e: any) => {
            if (e.detail !== audioRef.current) {
                setIsPlaying(false)
            }
        }
        window.addEventListener('audio-play', handleAudioPlay)
        return () => {
            window.removeEventListener('audio-play', handleAudioPlay)
        }
    }, [])
    const audioRef = useRef<any>(null)
    if (!audioRef.current) {
        audioRef.current = typeof window !== "undefined" ? new window.Audio(path) : null
    }

    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.loop = true
        return () => {
            audioRef.current?.pause()
        }
    }, [path])

    const togglePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            // Pause all other audio elements on the page
            document.querySelectorAll('audio').forEach((el) => {
                if (el !== audioRef.current) {
                    (el as HTMLAudioElement).pause()
                }
            })
            audioRef.current.play()
            setIsPlaying(true)
            // Notify other Audio components to toggle off
            window.dispatchEvent(new CustomEvent('audio-play', { detail: audioRef.current }))
        }
    }

    return (
        <div className="flex flex-col justify-center items-center text-center w-full h-full px-2">
            <audio ref={audioRef} src={path} className="w-full" />
            <button
                onClick={togglePlay}
                className={`w-full h-full p-2 rounded-xl text-xs transition-all duration-200 shadow-md ${isPlaying
                    ? "bg-white/20 text-white border border-white/30 shadow-white/10"
                    : "bg-button-bg text-gray-300 hover:bg-button-hover-bg border border-border"
                    }`}
            >
                {isPlaying ? "Pause" : name}
            </button>
        </div>
    )
}