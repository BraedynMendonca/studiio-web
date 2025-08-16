import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const zip = searchParams.get("zip") || "10002"
    const countryCode = searchParams.get("country") || "us"

    const API_KEY = process.env.WEATHER_API_KEY

    if (!API_KEY) {
      return NextResponse.json({ error: "Weather API key not configured" }, { status: 500 })
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch weather data for zip ${zip}` }, { status: response.status })
    }

    const data = await response.json()

    const weatherData = {
      temp: `${((data.main.temp - 273.15) * 1.8 + 32).toFixed(1)} °F`,
      condition: data.weather[0].description.replace(/\b\w/g, (c: string) => c.toUpperCase()),
      city: data.name,
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
