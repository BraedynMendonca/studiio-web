import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const zip = searchParams.get("zip") || "10002"
    const countryCode = searchParams.get("country") || "us"

    // Use the provided API key directly since environment variables aren't available in this environment
    const API_KEY = "c73493c02dae571f5cfa9a6b97fb7e6a"

    // Validate ZIP code format
    if (!/^\d{5}(-\d{4})?$/.test(zip)) {
      return NextResponse.json(
        {
          error: "Please enter a valid 5-digit ZIP code",
        },
        { status: 400 },
      )
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${API_KEY}&units=imperial`

    console.log(`Fetching weather for ZIP: ${zip}`)

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Studiio-Weather-Widget/1.0",
      },
    })

    if (!response.ok) {
      console.error(`OpenWeatherMap API error: ${response.status}`)

      if (response.status === 404) {
        return NextResponse.json(
          {
            error: `ZIP code ${zip} not found. Please check and try again.`,
          },
          { status: 404 },
        )
      }

      if (response.status === 401) {
        return NextResponse.json(
          {
            error: "Weather service authentication failed",
          },
          { status: 500 },
        )
      }

      return NextResponse.json(
        {
          error: `Weather service error (${response.status})`,
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    const weatherData = {
      temp: `${Math.round(data.main.temp)}°F`,
      condition: data.weather[0].description.replace(/\b\w/g, (c: string) => c.toUpperCase()),
      city: data.name,
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json(
      {
        error: "Weather service temporarily unavailable",
      },
      { status: 500 },
    )
  }
}
