"use client"

import { useState } from "react"
import { LayoutList, Trash2 } from "lucide-react"

export function LinksWidget() {
  const [linkName, setLinkName] = useState("")
  const [linkURL, setLinkURL] = useState("")
  const [links, setLinks] = useState<{ id: number; name: string; url: string }[]>([])

  const addLink = () => {
    if (!linkName.trim() || !linkURL.trim()) {
      alert("Please enter a value")
      return
    }

    try {
      new URL(linkURL)
    } catch {
      alert("Please enter a valid URL")
      return
    }

    setLinks((prev) => [...prev, { id: Date.now(), name: linkName.trim(), url: linkURL.trim() }])
  }

  const removeLink = (id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id))
  }

  return (
    <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col shadow-lg widget-hover">
      <div className="flex items-center gap-2 mb-2">
        <LayoutList className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Links & Resources</span>
      </div>

      <ul className="flex flex-col gap-2 text-[13px]">
        {links.length === 0 && <li className="text-gray-500 text-xs italic text-center">No links added yet</li>}
        {links.map(({ id, name, url }) => (
          <li
            key={id}
            className="flex items-center border border-gray-600 rounded p-2 hover:border-white transition-colors"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className=" text-white text-sm truncate max-w-[80%] hover:underline text-[12px]"
              title={url}
            >
              {name}
            </a>
            <button
              onClick={() => removeLink(id)}
              className="text-red-500 hover:text-red-350 p-1 rounded ml-auto"
              aria-label={`Remove ${name}`}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-t border-gray-500"></div>
      <div className="mt-2 text-gray-300 text-sm font-medium mb-2 text-center">Create a New Link:</div>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Insert Link Name"
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
          className="border border-gray-600 rounded p-2 hover:border-white transition-colors text-[12px]"
        />
        <input
          type="url"
          placeholder="URL (https://studiio.xyz/)"
          value={linkURL}
          onChange={(e) => setLinkURL(e.target.value)}
          className="bg-card border border-gray-600 rounded p-2 hover:border-white transition-colors text-[12px]"
        />
        <button
          onClick={addLink}
          className="bg-gray-600 hover:bg-button-hover-bg text-white px-3 py-1.5 rounded-xl text-xs transition-all duration-200 shadow-md"
        >
          Add Link
        </button>
      </div>
    </div>
  )
}