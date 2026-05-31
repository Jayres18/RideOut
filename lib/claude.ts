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
  const userPrompt = `Suggest 3 motorcycle ride destinations for a rider starting from ${startLocation}.
Ride type preference: ${rideType}
Ride duration: ${duration}

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

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  const parsed: ClaudeResponseShape = JSON.parse(text)

  if (!Array.isArray(parsed.destinations) || parsed.destinations.length !== 3) {
    throw new Error('Claude returned unexpected shape')
  }

  return parsed.destinations
}
