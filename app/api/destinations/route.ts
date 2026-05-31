import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { DestinationSuggestion } from '@/types/suggest'

export async function POST(request: NextRequest) {
  try {
    const suggestion = (await request.json()) as DestinationSuggestion

    if (!suggestion?.name?.trim() || !suggestion?.province?.trim()) {
      return Response.json({ error: 'name and province are required' }, { status: 400 })
    }

    // Upsert: find existing destination by name + province
    const existing = await prisma.destination.findFirst({
      where: {
        name: suggestion.name.trim(),
        province: suggestion.province.trim(),
      },
    })

    if (existing) {
      return Response.json({ id: existing.id })
    }

    // Create new destination with checkpoints
    const destination = await prisma.destination.create({
      data: {
        name: suggestion.name.trim(),
        province: suggestion.province.trim(),
        region: suggestion.region || '',
        description: suggestion.description || '',
        type: mapRideType(suggestion),
        difficulty: suggestion.difficulty,
        estimatedDistanceKm: Math.round(suggestion.estimated_distance_km),
        estimatedDurationHours: suggestion.estimated_duration_hours,
        roadType: suggestion.road_type || '',
        bestTimeToVisit: suggestion.best_time_to_ride || '',
        latitude: suggestion.latitude,
        longitude: suggestion.longitude,
        isAiGenerated: true,
        checkpoints: {
          create: suggestion.checkpoints.map((cp) => ({
            name: cp.name,
            type: cp.type,
            description: cp.description,
            latitude: cp.latitude,
            longitude: cp.longitude,
            orderIndex: cp.order_index,
          })),
        },
      },
    })

    return Response.json({ id: destination.id })
  } catch (err) {
    console.error('/api/destinations POST error:', err)
    return Response.json({ error: 'Failed to save destination' }, { status: 500 })
  }
}

function mapRideType(
  suggestion: DestinationSuggestion
): 'mountain' | 'coastal' | 'province' | 'city' | 'highway' {
  const name = (suggestion.name + ' ' + suggestion.description).toLowerCase()
  if (name.includes('coast') || name.includes('beach') || name.includes('bay')) return 'coastal'
  if (name.includes('mountain') || name.includes('volcano') || name.includes('peak')) return 'mountain'
  if (name.includes('city') || name.includes('urban')) return 'city'
  if (name.includes('highway') || name.includes('expressway')) return 'highway'
  return 'province'
}
