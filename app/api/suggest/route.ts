import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateRideSuggestions } from '@/lib/claude'
import type { DestinationSuggestion } from '@/types/suggest'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { startLocation, rideType, duration } = body as {
      startLocation: string
      rideType: string
      duration: string
    }

    if (!startLocation?.trim() || !rideType?.trim() || !duration?.trim()) {
      return Response.json({ error: 'startLocation, rideType, and duration are required' }, { status: 400 })
    }

    // Check cache: same params within last 24 hours
    const cached = await prisma.aiSuggestion.findFirst({
      where: {
        startLocation: startLocation.trim(),
        rideType: rideType.trim(),
        durationPreference: duration.trim(),
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (cached) {
      return Response.json({ id: cached.id, suggestions: cached.suggestionsJson })
    }

    // Cache miss: call Claude
    const suggestions: DestinationSuggestion[] = await generateRideSuggestions(
      startLocation.trim(),
      rideType.trim(),
      duration.trim()
    )

    // Persist to ai_suggestions (best-effort — still return on failure)
    let savedId: string | null = null
    try {
      const saved = await prisma.aiSuggestion.create({
        data: {
          startLocation: startLocation.trim(),
          rideType: rideType.trim(),
          durationPreference: duration.trim(),
          suggestionsJson: suggestions as object[],
        },
      })
      savedId = saved.id
    } catch (dbErr) {
      console.error('Failed to cache AI suggestion:', dbErr)
    }

    return Response.json({ id: savedId, suggestions })
  } catch (err) {
    console.error('/api/suggest POST error:', err)
    return Response.json({ error: 'Failed to generate suggestions' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return Response.json({ error: 'id is required' }, { status: 400 })
  }

  try {
    const row = await prisma.aiSuggestion.findUnique({ where: { id } })
    if (!row) {
      return Response.json({ error: 'Not found' }, { status: 404 })
    }
    return Response.json({ id: row.id, suggestions: row.suggestionsJson })
  } catch (err) {
    console.error('/api/suggest GET error:', err)
    return Response.json({ error: 'Failed to fetch suggestions' }, { status: 500 })
  }
}
