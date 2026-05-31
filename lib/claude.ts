import Anthropic from '@anthropic-ai/sdk'
import type { ClaudeResponseShape, DestinationSuggestion } from '@/types/suggest'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are RideOut, an expert motorcycle ride planner for the Philippines.
You have deep knowledge of Philippine roads, scenic routes, riding culture,
and rider-friendly stops. You suggest safe, enjoyable, and exciting ride
destinations tailored to the rider's preferences.

Always respond in valid JSON only. No markdown, no explanation outside JSON.`

export async function generateRideSuggestions(
  startLocation: string,
  rideType: string,
  duration: string
): Promise<DestinationSuggestion[]> {
  const userPrompt = `Suggest 3 motorcycle ride destinations for a rider starting from "${startLocation}".
Ride type preference: "${rideType}"
Ride duration: "${duration}"

For each destination, return:
{
  "destinations": [
    {
      "name": "",
      "province": "",
      "region": "",
      "description": "",
      "why_great_for_riders": "",
      "estimated_distance_km": 0,
      "estimated_duration_hours": 0,
      "difficulty": "easy | moderate | challenging",
      "road_type": "",
      "best_time_to_ride": "",
      "latitude": 0.0,
      "longitude": 0.0,
      "checkpoints": [
        {
          "name": "",
          "type": "fuel | food | scenic | rest | attraction",
          "description": "",
          "order_index": 1,
          "latitude": 0.0,
          "longitude": 0.0
        }
      ]
    }
  ]
}`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  // Guard: verify content[0] exists and is text type
  if (!message.content[0] || message.content[0].type !== 'text') {
    throw new Error('Claude response missing text content')
  }

  const text = message.content[0].text

  // Try-catch for JSON parse with diagnostic logging
  let parsed: ClaudeResponseShape
  try {
    parsed = JSON.parse(text)
  } catch (error) {
    const truncated = text.substring(0, 200)
    console.error('JSON parse failed. Raw response:', truncated)
    throw new Error(`Failed to parse Claude response as JSON: ${error instanceof Error ? error.message : String(error)}`)
  }

  // Validate shape and structure
  if (!Array.isArray(parsed.destinations) || parsed.destinations.length !== 3) {
    console.error('Invalid destinations shape. Raw response:', text.substring(0, 200))
    throw new Error('Claude returned unexpected shape: expected array of 3 destinations')
  }

  // Validate each destination has required fields
  for (let i = 0; i < parsed.destinations.length; i++) {
    const dest = parsed.destinations[i]
    if (typeof dest.name !== 'string' || !dest.name.trim()) {
      console.error('Invalid destination name at index', i)
      throw new Error(`Destination ${i} missing or invalid name (must be non-empty string)`)
    }
    if (typeof dest.latitude !== 'number' || typeof dest.longitude !== 'number') {
      console.error('Invalid coordinates at destination index', i)
      throw new Error(`Destination ${i} missing or invalid latitude/longitude (must be numbers)`)
    }
  }

  return parsed.destinations
}
