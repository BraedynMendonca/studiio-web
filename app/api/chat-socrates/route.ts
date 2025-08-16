import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const response = await fetch("https://ai.hackclub.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer hackclub",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Socrates, the ancient Greek philosopher. Respond as Socrates would, using the Socratic method of questioning to help students think deeply about their studies and life. Keep responses to 5 sentences or less. Be wise, thoughtful, and encouraging.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const reply =
      data.choices[0]?.message?.content || "I apologize, but I cannot respond at this moment. Please try again."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to get response from Socrates" }, { status: 500 })
  }
}
