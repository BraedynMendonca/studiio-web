"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2, MessageSquare } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function SocratesChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Greetings, I am Socrates. How may I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (input.trim() === "") return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Fetch from your own API route instead of directly from Hack Club AI
      const response = await fetch("/api/chat-socrates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage], // Send full conversation history
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error! status: ${response.status}, message: ${errorData.error || "Unknown error"}`)
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])
    } catch (error) {
      console.error("Error fetching from Socrates API:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "My apologies, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-2xl p-4 shadow-lg widget-hover overflow-hidden">
      {" "}
      {/* Added overflow-hidden */}
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Socrates AI</span>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 mb-3 text-xs custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user" ? "bg-blue-600/20 text-blue-200" : "bg-gray-700/50 text-gray-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-2">
            <span className="inline-block p-2 rounded-lg bg-gray-700/50 text-gray-200">
              <Loader2 className="w-4 h-4 animate-spin inline-block mr-1" /> Thinking...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask Socrates anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-input-bg border border-input-border rounded-xl px-3 py-2 text-white text-xs placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-white"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="bg-button-bg hover:bg-button-hover-bg text-button-text px-3 py-2 rounded-xl text-xs transition-all duration-200 shadow-md"
          disabled={isLoading}
        >
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
