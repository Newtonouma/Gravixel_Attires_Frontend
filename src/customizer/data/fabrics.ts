import { FabricId } from '../store/useConfigStore'

export interface FabricDef {
  id: FabricId
  name: string
  description: string
  roughness: number
  sheen: number
  normalStrength: number
}

export const fabrics: FabricDef[] = [
  {
    id: 'wolle',
    name: 'Wool',
    description: 'Classic worsted wool, wearable year-round',
    roughness: 0.8,
    sheen: 0.1,
    normalStrength: 0.3,
  },
  {
    id: 'kaschmir',
    name: 'Cashmere',
    description: 'Soft and luxurious with a subtle sheen',
    roughness: 0.7,
    sheen: 0.2,
    normalStrength: 0.2,
  },
  {
    id: 'seide',
    name: 'Silk',
    description: 'Elegant shine, ideal for evening occasions',
    roughness: 0.3,
    sheen: 0.8,
    normalStrength: 0.1,
  },
  {
    id: 'leinen',
    name: 'Linen',
    description: 'Natural texture, perfect for summer',
    roughness: 0.9,
    sheen: 0.05,
    normalStrength: 0.5,
  },
  {
    id: 'tweed',
    name: 'Tweed',
    description: 'Durable British cloth with character',
    roughness: 0.95,
    sheen: 0.0,
    normalStrength: 0.7,
  },
  {
    id: 'baumwolle',
    name: 'Cotton',
    description: 'Casual and easy-care, versatile for many uses',
    roughness: 0.85,
    sheen: 0.05,
    normalStrength: 0.35,
  },
]

export const fabricMap = Object.fromEntries(fabrics.map((f) => [f.id, f])) as Record<FabricId, FabricDef>
