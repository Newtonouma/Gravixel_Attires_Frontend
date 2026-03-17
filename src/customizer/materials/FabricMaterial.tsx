import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useConfigStore } from '../store/useConfigStore'
import { fabricMap } from '../data/fabrics'
import { patternMap } from '../data/patterns'

/**
 * Creates a realistic fabric material using Three.js MeshPhysicalMaterial.
 * Uses built-in PBR sheen for cloth rendering (Estevez/Kulla "Charlie" sheen model).
 *
 * Returns a MeshPhysicalMaterial instance that auto-updates from store.
 */
export function useFabricMaterial(): THREE.MeshPhysicalMaterial {
  const fabric = useConfigStore((s) => s.fabric)
  const pattern = useConfigStore((s) => s.pattern)
  const color = useConfigStore((s) => s.color)

  const targetColor = useMemo(() => new THREE.Color(color), [color])
  const currentColor = useRef(new THREE.Color(color))

  const material = useMemo(() => {
    const fab = fabricMap['wolle']
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      roughness: fab.roughness,
      metalness: 0.0,

      // Fabric sheen (key for realistic cloth)
      sheen: fab.sheen > 0.1 ? 1.0 : 0.5,
      sheenRoughness: fab.roughness,
      sheenColor: new THREE.Color(color).multiplyScalar(0.5),

      // No clearcoat for fabric
      clearcoat: 0,

      side: THREE.DoubleSide,
    })
    return mat
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => { material.dispose() }
  }, [material])

  useFrame(() => {
    const fab = fabricMap[fabric]
    const lerp = 0.1

    // Smooth color transition
    currentColor.current.lerp(targetColor, lerp)
    material.color.copy(currentColor.current)

    // Sheen color follows main color
    material.sheenColor!.copy(currentColor.current).multiplyScalar(0.4)

    // Fabric properties
    material.roughness += (fab.roughness - material.roughness) * lerp
    material.sheenRoughness! += (fab.roughness * 0.8 - material.sheenRoughness!) * lerp

    // High-sheen fabrics (silk, cashmere)
    const targetSheen = fab.sheen > 0.1 ? Math.min(fab.sheen * 2, 1.0) : 0.3
    material.sheen! += (targetSheen - material.sheen!) * lerp

    material.needsUpdate = false // Only set true when textures change
  })

  return material
}

/**
 * For pattern visualization, we generate a canvas texture.
 * This creates the procedural pattern as a texture and applies it.
 */
export function usePatternTexture(): THREE.CanvasTexture | null {
  const pattern = useConfigStore((s) => s.pattern)
  const color = useConfigStore((s) => s.color)

  const texture = useMemo(() => {
    if (pattern === 'uni') return null

    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    const pat = patternMap[pattern]
    const baseColor = color
    const patternColor = new THREE.Color(color).multiplyScalar(1.4)
    const patHex = '#' + patternColor.getHexString()

    // Fill base
    ctx.fillStyle = baseColor
    ctx.fillRect(0, 0, size, size)

    ctx.strokeStyle = patHex
    ctx.fillStyle = patHex

    const scale = pat.defaultScale

    switch (pattern) {
      case 'nadelstreifen': {
        ctx.lineWidth = 1
        const spacing = size / scale
        for (let x = 0; x < size; x += spacing) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, size)
          ctx.stroke()
        }
        break
      }
      case 'kreidestreifen': {
        ctx.lineWidth = 3
        ctx.globalAlpha = 0.5
        const spacing = size / (scale * 0.7)
        for (let x = 0; x < size; x += spacing) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, size)
          ctx.stroke()
        }
        ctx.globalAlpha = 1
        break
      }
      case 'fischgrat': {
        const s = size / scale
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 0.4
        for (let y = 0; y < size; y += s * 2) {
          for (let x = 0; x < size; x += s) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + s / 2, y + s)
            ctx.lineTo(x + s, y)
            ctx.stroke()
          }
          for (let x = 0; x < size; x += s) {
            ctx.beginPath()
            ctx.moveTo(x, y + s)
            ctx.lineTo(x + s / 2, y + s * 2)
            ctx.lineTo(x + s, y + s)
            ctx.stroke()
          }
        }
        ctx.globalAlpha = 1
        break
      }
      case 'hahnentritt': {
        const s = size / scale
        ctx.globalAlpha = 0.5
        for (let y = 0; y < size; y += s * 2) {
          for (let x = 0; x < size; x += s * 2) {
            // Houndstooth pattern
            ctx.fillRect(x, y, s, s)
            ctx.beginPath()
            ctx.moveTo(x + s, y)
            ctx.lineTo(x + s * 2, y)
            ctx.lineTo(x + s * 2, y + s)
            ctx.fill()
            ctx.beginPath()
            ctx.moveTo(x, y + s)
            ctx.lineTo(x, y + s * 2)
            ctx.lineTo(x + s, y + s * 2)
            ctx.fill()
          }
        }
        ctx.globalAlpha = 1
        break
      }
      case 'glencheck': {
        const s = size / (scale * 0.8)
        ctx.globalAlpha = 0.25
        // Horizontal lines
        for (let y = 0; y < size; y += s) {
          ctx.fillRect(0, y, size, 1)
        }
        // Vertical lines
        for (let x = 0; x < size; x += s) {
          ctx.fillRect(x, 0, 1, size)
        }
        // Overcheck
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.35
        const over = s * 4
        for (let x = 0; x < size; x += over) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, size)
          ctx.stroke()
        }
        for (let y = 0; y < size; y += over) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(size, y)
          ctx.stroke()
        }
        ctx.globalAlpha = 1
        break
      }
      case 'fensterkaros': {
        const s = size / scale
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.45
        for (let x = 0; x < size; x += s) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, size)
          ctx.stroke()
        }
        for (let y = 0; y < size; y += s) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(size, y)
          ctx.stroke()
        }
        ctx.globalAlpha = 1
        break
      }
      case 'birdseye': {
        const s = size / scale
        ctx.globalAlpha = 0.35
        for (let y = 0; y < size; y += s) {
          const offset = (Math.floor(y / s) % 2) * (s / 2)
          for (let x = 0; x < size; x += s) {
            ctx.beginPath()
            ctx.arc(x + offset + s / 2, y + s / 2, s * 0.2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.globalAlpha = 1
        break
      }
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(3, 3)
    return tex
  }, [pattern, color])

  return texture
}

/**
 * Complete fabric material with pattern texture applied.
 */
export function useFabricMaterialWithPattern(): THREE.MeshPhysicalMaterial {
  const material = useFabricMaterial()
  const texture = usePatternTexture()

  useEffect(() => {
    if (texture) {
      material.map = texture
      material.needsUpdate = true
    } else {
      material.map = null
      material.needsUpdate = true
    }
  }, [texture, material])

  return material
}
