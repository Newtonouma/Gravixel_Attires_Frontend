import { PatternId } from '../store/useConfigStore'

export interface PatternDef {
  id: PatternId
  name: string
  description: string
  shaderIndex: number
  defaultScale: number
}

export const patterns: PatternDef[] = [
  { id: 'uni', name: 'Solid', description: 'Single-color, classically elegant', shaderIndex: 0, defaultScale: 1.0 },
  { id: 'nadelstreifen', name: 'Pinstripe', description: 'Fine vertical stripes', shaderIndex: 1, defaultScale: 30.0 },
  { id: 'kreidestreifen', name: 'Chalk Stripe', description: 'Broader, softer stripes', shaderIndex: 2, defaultScale: 20.0 },
  { id: 'fischgrat', name: 'Herringbone', description: 'V-shaped zigzag pattern', shaderIndex: 3, defaultScale: 40.0 },
  { id: 'hahnentritt', name: 'Houndstooth', description: 'Classic broken-check pattern', shaderIndex: 4, defaultScale: 25.0 },
  { id: 'glencheck', name: 'Glen Check', description: 'Elegant check pattern', shaderIndex: 5, defaultScale: 15.0 },
  { id: 'fensterkaros', name: 'Windowpane', description: 'Wide grid pattern', shaderIndex: 6, defaultScale: 10.0 },
  { id: 'birdseye', name: "Bird's Eye", description: 'Fine dotted pattern', shaderIndex: 7, defaultScale: 35.0 },
]

export const patternMap = Object.fromEntries(patterns.map((p) => [p.id, p])) as Record<PatternId, PatternDef>
