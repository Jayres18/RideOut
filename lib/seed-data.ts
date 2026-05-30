export type SeedDestination = {
  id: string
  name: string
  province: string
  region: string
  type: 'mountain' | 'coastal' | 'province' | 'city' | 'highway'
  difficulty: 'easy' | 'moderate' | 'challenging'
  estimatedDistanceKm: number
  estimatedDurationHours: number
  roadType: string
  bestTimeToVisit: string
  isFeatured: boolean
  latitude: number
  longitude: number
}

export const SEED_DESTINATIONS: SeedDestination[] = [
  {
    id: 'seed-1',
    name: 'Batad Rice Terraces',
    province: 'Ifugao',
    region: 'Cordillera',
    type: 'mountain',
    difficulty: 'challenging',
    estimatedDistanceKm: 348,
    estimatedDurationHours: 8,
    roadType: 'Mix of highway and mountain road',
    bestTimeToVisit: 'November to May (dry season)',
    isFeatured: true,
    latitude: 16.914,
    longitude: 121.109,
  },
  {
    id: 'seed-2',
    name: 'Pagudpud Beach',
    province: 'Ilocos Norte',
    region: 'Ilocos Region',
    type: 'coastal',
    difficulty: 'moderate',
    estimatedDistanceKm: 492,
    estimatedDurationHours: 9,
    roadType: 'Mostly national highway with coastal stretch',
    bestTimeToVisit: 'April to June',
    isFeatured: true,
    latitude: 18.535,
    longitude: 120.788,
  },
  {
    id: 'seed-3',
    name: 'Taal Volcano View',
    province: 'Batangas',
    region: 'Calabarzon',
    type: 'mountain',
    difficulty: 'easy',
    estimatedDistanceKm: 87,
    estimatedDurationHours: 3,
    roadType: 'Highway with smooth ascent to Tagaytay ridge',
    bestTimeToVisit: 'December to February (cool months)',
    isFeatured: true,
    latitude: 14.002,
    longitude: 120.993,
  },
  {
    id: 'seed-4',
    name: 'Sagada Hanging Coffins',
    province: 'Mountain Province',
    region: 'Cordillera',
    type: 'mountain',
    difficulty: 'challenging',
    estimatedDistanceKm: 421,
    estimatedDurationHours: 9,
    roadType: 'Winding mountain roads, some unpaved sections',
    bestTimeToVisit: 'March to May',
    isFeatured: false,
    latitude: 17.085,
    longitude: 120.901,
  },
  {
    id: 'seed-5',
    name: 'Laiya Beach',
    province: 'Batangas',
    region: 'Calabarzon',
    type: 'coastal',
    difficulty: 'easy',
    estimatedDistanceKm: 136,
    estimatedDurationHours: 3.5,
    roadType: 'Smooth national highway, flat coastal road',
    bestTimeToVisit: 'March to June',
    isFeatured: false,
    latitude: 13.661,
    longitude: 121.408,
  },
  {
    id: 'seed-6',
    name: 'Banaue Viewpoint',
    province: 'Ifugao',
    region: 'Cordillera',
    type: 'mountain',
    difficulty: 'moderate',
    estimatedDistanceKm: 336,
    estimatedDurationHours: 7,
    roadType: 'National highway transitioning to mountain roads',
    bestTimeToVisit: 'November to April',
    isFeatured: false,
    latitude: 16.919,
    longitude: 121.059,
  },
]

export const FEATURED = SEED_DESTINATIONS.filter((d) => d.isFeatured)
export const POPULAR = SEED_DESTINATIONS.filter((d) => !d.isFeatured)
