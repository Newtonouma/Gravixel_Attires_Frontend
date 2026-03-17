import { LapelType, BreastedType, PocketType, VentType, TrouserFit } from '../store/useConfigStore'

export interface StyleOption<T extends string> {
  id: T
  name: string
  description: string
}

export const lapelOptions: StyleOption<LapelType>[] = [
  { id: 'notch', name: 'Notch Lapel', description: 'Classic and versatile' },
  { id: 'peak', name: 'Peak Lapel', description: 'Formal and distinctive' },
  { id: 'shawl', name: 'Shawl Lapel', description: 'Elegant for evening wear' },
]

export const breastedOptions: StyleOption<BreastedType>[] = [
  { id: 'single', name: 'Single-Breasted', description: 'Modern and streamlined' },
  { id: 'double', name: 'Double-Breasted', description: 'Traditional and bold' },
]

export const pocketOptions: StyleOption<PocketType>[] = [
  { id: 'flap', name: 'Flap Pocket', description: 'Classic welt pocket with flap' },
  { id: 'jetted', name: 'Jetted Pocket', description: 'Clean and formal' },
  { id: 'patch', name: 'Patch Pocket', description: 'Relaxed and sporty' },
]

export const ventOptions: StyleOption<VentType>[] = [
  { id: 'center', name: 'Center Vent', description: 'American style' },
  { id: 'side', name: 'Side Vents', description: 'British style' },
  { id: 'none', name: 'No Vent', description: 'Italian style' },
]

export const trouserFitOptions: StyleOption<TrouserFit>[] = [
  { id: 'slim', name: 'Slim Fit', description: 'Narrow, tapered cut' },
  { id: 'regular', name: 'Regular Fit', description: 'Classic balanced fit' },
  { id: 'wide', name: 'Wide Fit', description: 'Roomier cut' },
]
