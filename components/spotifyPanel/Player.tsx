"use client"

import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

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

  return (
    <SpotifyPlayer
      token={token}
      uris={uris}
      play={uris.length > 0}
      styles={{
        activeColor: "#fff",
        bgColor: "#333",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
      }}
    />
  )
}
