import * as THREE from 'three'

/**
 * Live mesh deformation based on body measurements.
 *
 * Uses Gaussian-weighted radial scaling at different body heights.
 * Each measurement (chest, waist, hip, shoulders) controls how wide
 * the suit is at a specific height. Changes blend smoothly between regions.
 *
 * Trouser/back length changes stretch the lower/upper body vertically.
 * Sleeve length scales arm vertices outward/inward from the shoulder.
 */

// Default M-size measurements (reference for scale = 1.0)
const DEFAULTS = {
  chest: 100,
  waist: 84,
  hip: 98,
  shoulders: 46,
  trouserLength: 105,
  backLength: 74,
  sleeveLength: 64,
  inseam: 81,
}

/**
 * Body region heights in the model's LOCAL coordinate system.
 * These assume Z-up with values in mm (Style3D model convention).
 * For Y-up models, the system auto-detects and adapts.
 */
export interface ModelProfile {
  heightAxis: 'y' | 'z'    // Which local axis is "up"
  minHeight: number         // Bottom of model in local coords
  maxHeight: number         // Top of model in local coords
  halfWidth: number         // Half of model's X width (for arm detection)
  // Normalized region positions (0 = bottom, 1 = top of model)
  hipNorm: number
  waistNorm: number
  chestNorm: number
  shoulderNorm: number
  kneeNorm: number
  inseamNorm: number
}

// Default profile tuned for Style3D suit model (~1517mm tall, Z-up)
// Normalized positions based on adult male anatomy relative to model height
const DEFAULT_PROFILE: ModelProfile = {
  heightAxis: 'z',
  minHeight: 100,
  maxHeight: 1620,
  halfWidth: 273,
  hipNorm: 0.48,
  waistNorm: 0.59,
  chestNorm: 0.73,
  shoulderNorm: 0.87,
  kneeNorm: 0.25,
  inseamNorm: 0.47,
}

function gaussian(x: number, mean: number, sigma: number): number {
  const d = (x - mean) / sigma
  return Math.exp(-0.5 * d * d)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export interface MeasurementValues {
  chest: number
  waist: number
  hip: number
  shoulders: number
  trouserLength: number
  backLength: number
  sleeveLength: number
  inseam: number
}

/**
 * Detect the model's vertical axis, height range, and width from geometries.
 */
export function detectModelProfile(geometries: THREE.BufferGeometry[]): ModelProfile {
  let minX = Infinity, maxX = -Infinity
  let minY = Infinity, maxY = -Infinity
  let minZ = Infinity, maxZ = -Infinity

  for (const geo of geometries) {
    geo.computeBoundingBox()
    if (!geo.boundingBox) continue
    minX = Math.min(minX, geo.boundingBox.min.x)
    maxX = Math.max(maxX, geo.boundingBox.max.x)
    minY = Math.min(minY, geo.boundingBox.min.y)
    maxY = Math.max(maxY, geo.boundingBox.max.y)
    minZ = Math.min(minZ, geo.boundingBox.min.z)
    maxZ = Math.max(maxZ, geo.boundingBox.max.z)
  }

  const rangeY = maxY - minY
  const rangeZ = maxZ - minZ

  // The axis with the largest range is likely the vertical axis
  const heightAxis = rangeZ > rangeY ? 'z' : 'y'
  const minH = heightAxis === 'z' ? minZ : minY
  const maxH = heightAxis === 'z' ? maxZ : maxY
  const halfWidth = Math.max(Math.abs(minX), Math.abs(maxX))

  return {
    ...DEFAULT_PROFILE,
    heightAxis,
    minHeight: minH,
    maxHeight: maxH,
    halfWidth,
  }
}

/**
 * Deform a geometry's vertices based on body measurements.
 * Call this whenever measurements change.
 *
 * @param geometry - The mesh geometry to deform
 * @param original - Original (undeformed) position data
 * @param measurements - Current measurement values from the store
 * @param profile - Model height profile
 */
export function deformGeometry(
  geometry: THREE.BufferGeometry,
  original: Float32Array,
  measurements: MeasurementValues,
  profile: ModelProfile,
): void {
  const pos = geometry.attributes.position
  const arr = pos.array as Float32Array
  const count = pos.count

  const heightRange = profile.maxHeight - profile.minHeight

  // Pre-compute scale ratios
  const chestRatio = measurements.chest / DEFAULTS.chest
  const waistRatio = measurements.waist / DEFAULTS.waist
  const hipRatio = measurements.hip / DEFAULTS.hip
  const shoulderRatio = measurements.shoulders / DEFAULTS.shoulders
  const trouserRatio = measurements.trouserLength / DEFAULTS.trouserLength
  const backRatio = measurements.backLength / DEFAULTS.backLength
  const sleeveRatio = measurements.sleeveLength / DEFAULTS.sleeveLength

  // Gaussian sigma in normalized height space (controls blend width)
  const sigma = 0.12

  const hIdx = profile.heightAxis === 'z' ? 2 : 1
  const radialIdx1 = 0 // X is always radial
  const radialIdx2 = profile.heightAxis === 'z' ? 1 : 2 // The other horizontal axis

  // Arm detection threshold: vertices beyond 60% of halfWidth are sleeves
  const armThreshold = profile.halfWidth * 0.6
  const shoulderH = profile.minHeight + profile.shoulderNorm * heightRange

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const ox = original[i3 + radialIdx1]
    const oy = original[i3 + radialIdx2]
    const oh = original[i3 + hIdx]

    // Normalized height (0 = bottom, 1 = top)
    const norm = (oh - profile.minHeight) / heightRange

    // ---- Radial scaling (circumference measurements) ----
    const hipW = gaussian(norm, profile.hipNorm, sigma)
    const waistW = gaussian(norm, profile.waistNorm, sigma)
    const chestW = gaussian(norm, profile.chestNorm, sigma)

    // Add 1.0 weight as fallback so scale defaults to 1.0 at extremes
    const eps = 0.001
    const totalW = hipW + waistW + chestW + eps
    const radialScale =
      (hipW * hipRatio + waistW * waistRatio + chestW * chestRatio + eps * 1.0) / totalW

    // Blend toward 1.0 at extremes (ankles, collar) so they don't distort
    const extremeFade = Math.min(
      norm < 0.10 ? norm / 0.10 : 1.0, // fade near bottom (ankles)
      norm > 0.93 ? (1.0 - norm) / 0.07 : 1.0, // fade near top (collar)
    )
    const finalRadial = lerp(1.0, radialScale, extremeFade)

    // ---- Shoulder width (X-only scaling at shoulder height) ----
    const shoulderW = gaussian(norm, profile.shoulderNorm, 0.08)
    const shoulderScale = lerp(1.0, shoulderRatio, shoulderW)

    // ---- Vertical scaling (length measurements) ----
    let heightScale = 1.0
    if (norm < profile.waistNorm) {
      // Below waist → trouser length affects this region
      heightScale = lerp(1.0, trouserRatio, extremeFade)
    } else {
      // Above waist → back length affects this region
      const aboveWaistFade = (norm - profile.waistNorm) / (1.0 - profile.waistNorm)
      heightScale = lerp(1.0, backRatio, aboveWaistFade * 0.5)
    }

    // Apply base deformations
    let finalX = ox * finalRadial * shoulderScale
    const finalDepth = oy * finalRadial
    const centerH = profile.minHeight + heightRange * 0.5
    const finalHeight = centerH + (oh - centerH) * heightScale

    // ---- Sleeve length (scale arm extension from shoulder) ----
    if (Math.abs(ox) > armThreshold) {
      const armExtent = Math.abs(ox) - armThreshold
      const sign = ox > 0 ? 1 : -1

      // Weight by proximity to shoulder height (arms are near shoulder level)
      const verticalFade = gaussian(oh, shoulderH, heightRange * 0.15)

      // Scale the arm extension beyond the shoulder
      const sleeveScale = lerp(1.0, sleeveRatio, verticalFade)
      finalX = sign * (armThreshold * finalRadial * shoulderScale + armExtent * finalRadial * sleeveScale)
    }

    arr[i3 + radialIdx1] = finalX
    arr[i3 + radialIdx2] = finalDepth
    arr[i3 + hIdx] = finalHeight
  }

  pos.needsUpdate = true
  geometry.computeVertexNormals()
  geometry.computeBoundingBox()
  geometry.computeBoundingSphere()
}
