export type CheckpointSuggestion = {
  name: string
  type: 'fuel' | 'food' | 'scenic' | 'rest' | 'attraction'
  description: string
  order_index: number
  latitude: number
  longitude: number
}

export type DestinationSuggestion = {
  name: string
  province: string
  region: string
  description: string
  why_great_for_riders: string
  estimated_distance_km: number
  estimated_duration_hours: number
  difficulty: 'easy' | 'moderate' | 'challenging'
  road_type: string
  best_time_to_ride: string
  latitude: number
  longitude: number
  checkpoints: CheckpointSuggestion[]
}

export type ClaudeResponseShape = {
  destinations: DestinationSuggestion[]
}

export type SuggestFormState = {
  step: 1 | 2 | 3
  startLocation: string
  rideType: string
  duration: string
  loading: boolean
  error: string | null
}

export type SuggestApiResponse = {
  id: string
  suggestions: DestinationSuggestion[]
}
