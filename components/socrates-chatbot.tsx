"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, MessageCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import katex from "katex"

interface Message {
  id: string
  content: string
  sender: "user" | "socrates"
  timestamp: Date
}

export function SocratesChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Greetings, young scholar! I am Socrates. What questions about your studies or life would you like to explore together?",
      sender: "socrates",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const renderMessageContent = (content: string) => {
    // Split content by LaTeX patterns
    const parts = content.split(/(\$\$[^$]+\$\$)/g)

    return parts.map((part, index) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        // This is a LaTeX expression
        const latex = part.slice(2, -2) // Remove $$ from both ends
        try {
          const html = katex.renderToString(latex, {
            displayMode: true,
            throwOnError: false,
          })
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="block my-2" />
        } catch (error) {
          // If LaTeX rendering fails, show the original text
          return <span key={index}>{part}</span>
        }
      } else {
        // Regular text
        return <span key={index}>{part}</span>
      }
    })
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat-socrates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input.trim() }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const socratesMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        sender: "socrates",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, socratesMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        sender: "socrates",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col justify-center shadow-lg widget-hover flex-1" style={{ height:'100%', justifyContent:'flex-start' }}>
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Socrates AI</span>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 mb-3 pr-2">
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-2 rounded-lg text-xs ${
                  message.sender === "user" ? "bg-white/20 text-white" : "bg-gray-700/50 text-gray-200"
                }`}
              >
                <div className="whitespace-pre-wrap">{renderMessageContent(message.content)}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700/50 text-gray-200 p-2 rounded-lg text-xs flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                Socrates is thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Socrates anything..."
          className="flex-1 bg-input-bg border border-input-border rounded-xl px-3 py-2 text-white text-xs placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-accent-white min-h-[32px] max-h-[80px]"
          disabled={isLoading}
        />
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className="bg-button-bg hover:bg-button-hover-bg disabled:bg-gray-800 text-white disabled:text-gray-500 px-3 py-2 rounded-xl text-xs transition-all duration-200 shadow-md"
        >
          <Send className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
