"use client"

import { useState, useEffect } from "react"
import { Cloud, Sun } from "lucide-react"

export function TemplateWidget() {
  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col justify-center widget-hover">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-accent-white" />
          <span className="text-gray-300 text-sm font-medium">Template</span>
        </div>
        <Sun className="w-5 h-5 text-gray-300" />
      </div>

      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </div>
  )
}
