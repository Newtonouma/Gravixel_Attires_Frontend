import { create } from 'zustand'

export type FabricId = 'wolle' | 'kaschmir' | 'seide' | 'leinen' | 'tweed' | 'baumwolle'
export type PatternId = 'uni' | 'nadelstreifen' | 'kreidestreifen' | 'fischgrat' | 'hahnentritt' | 'glencheck' | 'fensterkaros' | 'birdseye'
export type LapelType = 'notch' | 'peak' | 'shawl'
export type ButtonCount = 1 | 2 | 3
export type BreastedType = 'single' | 'double'
export type PocketType = 'flap' | 'jetted' | 'patch'
export type VentType = 'center' | 'side' | 'none'
export type TrouserFit = 'slim' | 'regular' | 'wide'

export interface ConfigState {
  // Fabric
  fabric: FabricId
  pattern: PatternId
  color: string

  // Style
  lapel: LapelType
  buttons: ButtonCount
  breasted: BreastedType
  pockets: PocketType
  vents: VentType
  trouserFit: TrouserFit
  trouserPleat: boolean
  trouserCuff: boolean
  showVest: boolean

  // Measurements (cm)
  chest: number
  waist: number
  hip: number
  shoulders: number
  sleeveLength: number
  backLength: number
  trouserLength: number
  inseam: number

  // UI
  activeSection: string
  isMobileDrawerOpen: boolean

  // Actions
  setFabric: (fabric: FabricId) => void
  setPattern: (pattern: PatternId) => void
  setColor: (color: string) => void
  setLapel: (lapel: LapelType) => void
  setButtons: (buttons: ButtonCount) => void
  setBreasted: (breasted: BreastedType) => void
  setPockets: (pockets: PocketType) => void
  setVents: (vents: VentType) => void
  setTrouserFit: (fit: TrouserFit) => void
  setTrouserPleat: (pleat: boolean) => void
  setTrouserCuff: (cuff: boolean) => void
  setShowVest: (show: boolean) => void
  setMeasurement: (key: MeasurementKey, value: number) => void
  setActiveSection: (section: string) => void
  setMobileDrawerOpen: (open: boolean) => void
  applyPresetSize: (size: PresetSize) => void
}

export type MeasurementKey = 'chest' | 'waist' | 'hip' | 'shoulders' | 'sleeveLength' | 'backLength' | 'trouserLength' | 'inseam'

export type PresetSize = 'S' | 'M' | 'L' | 'XL' | 'XXL'

const presetSizes: Record<PresetSize, Record<MeasurementKey, number>> = {
  S:   { chest: 92,  waist: 78,  hip: 94,  shoulders: 43, sleeveLength: 62, backLength: 71, trouserLength: 101, inseam: 78 },
  M:   { chest: 100, waist: 84,  hip: 98,  shoulders: 46, sleeveLength: 64, backLength: 74, trouserLength: 105, inseam: 81 },
  L:   { chest: 108, waist: 92,  hip: 104, shoulders: 48, sleeveLength: 66, backLength: 76, trouserLength: 107, inseam: 82 },
  XL:  { chest: 116, waist: 100, hip: 110, shoulders: 50, sleeveLength: 67, backLength: 78, trouserLength: 109, inseam: 83 },
  XXL: { chest: 124, waist: 108, hip: 118, shoulders: 52, sleeveLength: 68, backLength: 80, trouserLength: 111, inseam: 84 },
}

export const useConfigStore = create<ConfigState>((set) => ({
  // Fabric defaults
  fabric: 'wolle',
  pattern: 'uni',
  color: '#1B2A4A',

  // Style defaults
  lapel: 'notch',
  buttons: 2,
  breasted: 'single',
  pockets: 'flap',
  vents: 'center',
  trouserFit: 'regular',
  trouserPleat: false,
  trouserCuff: false,
  showVest: false,

  // Measurement defaults (M)
  chest: 100,
  waist: 84,
  hip: 98,
  shoulders: 46,
  sleeveLength: 64,
  backLength: 74,
  trouserLength: 105,
  inseam: 81,

  // UI
  activeSection: 'fabric',
  isMobileDrawerOpen: false,

  // Actions
  setFabric: (fabric) => set({ fabric }),
  setPattern: (pattern) => set({ pattern }),
  setColor: (color) => set({ color }),
  setLapel: (lapel) => set({ lapel }),
  setButtons: (buttons) => set({ buttons }),
  setBreasted: (breasted) => set({ breasted }),
  setPockets: (pockets) => set({ pockets }),
  setVents: (vents) => set({ vents }),
  setTrouserFit: (fit) => set({ trouserFit: fit }),
  setTrouserPleat: (pleat) => set({ trouserPleat: pleat }),
  setTrouserCuff: (cuff) => set({ trouserCuff: cuff }),
  setShowVest: (show) => set({ showVest: show }),
  setMeasurement: (key, value) => set({ [key]: value }),
  setActiveSection: (section) => set((state) => ({
    activeSection: state.activeSection === section ? '' : section,
  })),
  setMobileDrawerOpen: (open) => set({ isMobileDrawerOpen: open }),
  applyPresetSize: (size) => set(presetSizes[size]),
}))
