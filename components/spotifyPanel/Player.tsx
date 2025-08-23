"use client"

import { useState, useEffect } from "react"

interface PlayerProps {
  uris: string[]
}

export function Player({ uris }: PlayerProps) {
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access_token")
      setToken(accessToken || "")
    }
  }, [])

  if (!token) return null

  // For now, just show a simple player placeholder since react-spotify-web-playback
  // might not work in this environment
  return (
    <div className="bg-gray-800 rounded-lg p-3 text-center">
      <div className="text-xs text-gray-300 mb-2">
        {uris.length > 0 ? `${uris.length} tracks selected` : "No tracks selected"}
      </div>
      <div className="text-xs text-gray-400">Spotify Web Player would appear here</div>
    </div>
  )
}
