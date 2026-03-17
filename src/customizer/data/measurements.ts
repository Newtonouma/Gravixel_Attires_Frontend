import { MeasurementKey } from '../store/useConfigStore'

export interface MeasurementDef {
  key: MeasurementKey
  name: string
  unit: string
  min: number
  max: number
  step: number
  defaultValue: number
}

export const measurements: MeasurementDef[] = [
  { key: 'chest', name: 'Chest', unit: 'cm', min: 88, max: 130, step: 1, defaultValue: 100 },
  { key: 'waist', name: 'Waist', unit: 'cm', min: 72, max: 120, step: 1, defaultValue: 84 },
  { key: 'hip', name: 'Hip', unit: 'cm', min: 88, max: 130, step: 1, defaultValue: 98 },
  { key: 'shoulders', name: 'Shoulder Width', unit: 'cm', min: 40, max: 56, step: 0.5, defaultValue: 46 },
  { key: 'sleeveLength', name: 'Sleeve Length', unit: 'cm', min: 58, max: 72, step: 0.5, defaultValue: 64 },
  { key: 'backLength', name: 'Back Length', unit: 'cm', min: 68, max: 82, step: 0.5, defaultValue: 74 },
  { key: 'trouserLength', name: 'Trouser Length', unit: 'cm', min: 95, max: 115, step: 0.5, defaultValue: 105 },
  { key: 'inseam', name: 'Inseam', unit: 'cm', min: 72, max: 90, step: 0.5, defaultValue: 81 },
]
