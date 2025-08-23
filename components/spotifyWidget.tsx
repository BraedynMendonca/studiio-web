"use client"

import { useState, useEffect } from "react"
import { Music } from "lucide-react"
import {
  redirectToSpotifyAuth,
  getSpotifyToken,
  logout,
  getUserPlaylists,
  getPlaylistTracks,
  isSpotifyConfigured,
} from "@/components/spotifyPanel/utils"
import { Player } from "@/components/spotifyPanel/Player"

export function SpotifyWidget() {
  const [spotifyToken, setSpotifyToken] = useState<any>(null)
  const [playlists, setPlaylists] = useState<any[]>([])
  const [trackUris, setTrackUris] = useState<any[]>([])

  useEffect(() => {
    const fetchSpotifyToken = async () => {
      try {
        const token = await getSpotifyToken()
        setSpotifyToken(token)
      } catch (error) {
        // Token fetch failed - this is fine for initial load
      }
    }

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get("code")

      if (code) {
        fetchSpotifyToken()
      }
    }
  }, [])

  // Fetch playlists when token is available
  useEffect(() => {
    const fetchPlaylists = async () => {
      if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
        try {
          const userPlaylists = await getUserPlaylists()
          console.log("items:", userPlaylists)
          setPlaylists(userPlaylists)
        } catch (error) {
          setPlaylists([])
        }
      }
    }

    fetchPlaylists()
  }, [spotifyToken])

  if (!isSpotifyConfigured()) {
    return null
  }

  return (
    <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col shadow-lg widget-hover">
      <div className="flex items-center gap-2 mb-2">
        <Music className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Spotify</span>
      </div>

      {typeof window !== "undefined" && localStorage.getItem("access_token") ? (
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <div className="text-xs text-gray-300 mb-2">Connected to Spotify</div>
            <div className="flex flex-col gap-2">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={async () => {
                    const tracks = await getPlaylistTracks(playlist.id)
                    setTrackUris(tracks)
                  }}
                  className="bg-gray-600 hover:bg-button-hover-bg text-white px-3 py-1.5 rounded-xl text-xs transition-all duration-200 shadow-md"
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <Player uris={trackUris} />
          </div>
          <button
            onClick={logout}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-1.5 rounded-xl text-xs transition-all duration-200 shadow-md mt-2"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-400">
            Connect your Spotify account to control playback (Requires Premium)
          </div>
          <button
            onClick={() => redirectToSpotifyAuth()}
            className="bg-[#1DB954]/20 hover:bg-[#1DB954]/30 text-[#1DB954] px-3 py-1.5 rounded-xl text-xs transition-all duration-200 shadow-md flex items-center justify-center gap-2"
          >
            <Music className="w-3 h-3" />
            Connect Spotify
          </button>
        </div>
      )}
    </div>
  )
}
