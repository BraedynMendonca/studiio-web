import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await fetch("https://ai.hackclub.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        max_tokens: 60, // Set to ~60 tokens for 1-4 sentences
        system: "You are Socrates, a helpful and concise AI assistant. Keep your responses to 1-4 sentences.", // Added system prompt for conciseness
        reasoning_effort: "none", // Explicitly disable reasoning output
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error from AI API" }))
      console.error("Error from Hack Club AI:", response.status, errorData)
      return NextResponse.json(
        { error: `Failed to fetch from AI API: ${response.status} - ${errorData.message || "Unknown error"}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
