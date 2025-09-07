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
        model: "llama-4-maverick",
        messages: [
          {
            role: "system",
            content:
              "Answer the students questions thoughfully and with depth. Do not reveal your internal reasoning or thinking process. Use examples and analogies to explain complex ideas. Encourage critical thinking and curiosity.Keep answers to a maximum of 3 sentences",
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
