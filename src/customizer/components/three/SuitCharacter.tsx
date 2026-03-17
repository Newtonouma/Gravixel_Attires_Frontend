import React, { useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { useConfigStore } from '../../store/useConfigStore'
import { useFabricMaterialWithPattern } from '../../materials/FabricMaterial'
import {
  detectModelProfile,
  deformGeometry,
  type MeasurementValues,
  type ModelProfile,
} from '../../utils/meshDeform'

// ---- Mesh classification by material/mesh name ----
const BUTTON_KEYWORDS = ['button', 'blinn', 'buckle', 'nknk']
const FABRIC_KEYWORDS = ['uniform', 'fabric', 'cloth', 'suit']
const SHIRT_KEYWORDS = ['shirt', 'hemd']
const SHOE_KEYWORDS = ['shoe', 'feet', 'foot']
const SKIN_KEYWORDS = ['skin', 'head', 'face']

type SuitPart = 'fabric' | 'button' | 'shirt' | 'shoes' | 'skin' | 'unknown'

function classifyMesh(meshName: string, materialName: string): SuitPart {
  const n = meshName.toLowerCase()
  const m = materialName.toLowerCase()
  for (const kw of BUTTON_KEYWORDS) if (m.includes(kw)) return 'button'
  for (const kw of FABRIC_KEYWORDS) if (m.includes(kw)) return 'fabric'
  for (const kw of SHIRT_KEYWORDS) if (m.includes(kw) || n.includes(kw)) return 'shirt'
  for (const kw of SHOE_KEYWORDS) if (m.includes(kw) || n.includes(kw)) return 'shoes'
  for (const kw of SKIN_KEYWORDS) if (m.includes(kw) || n.includes(kw)) return 'skin'
  if (n.includes('body') || n.includes('legs')) return 'fabric'
  if (n.includes('feet')) return 'shoes'
  if (n.includes('head')) return 'skin'
  return 'unknown'
}

export const SuitCharacter = React.memo(function SuitCharacter() {
  const { scene, animations } = useGLTF('/customizer/suit.glb')
  const groupRef = useRef<THREE.Group>(null!)
  const buttons = useConfigStore((s) => s.buttons)
  const breasted = useConfigStore((s) => s.breasted)
  const showVest = useConfigStore((s) => s.showVest)

  const clone = useMemo(() => {
    try { return cloneSkeleton(scene) } catch { return scene.clone(true) }
  }, [scene])

  const { actions } = useAnimations(animations, groupRef)
  const fabricMaterial = useFabricMaterialWithPattern()

  const buttonMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1a1a'), roughness: 0.3, metalness: 0.7,
  }), [])

  const shirtMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#f0ece4'), roughness: 0.6,
    sheen: 0.3, sheenRoughness: 0.5, sheenColor: new THREE.Color('#f0ece4'),
    side: THREE.DoubleSide,
  }), [])

  const skinMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c8956c'), roughness: 0.7,
  }), [])

  const shoeMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#1a1a1a'), roughness: 0.35, clearcoat: 0.3, clearcoatRoughness: 0.3,
  }), [])

  const orderedButtonMeshes = useRef<THREE.Mesh[]>([])

  // Deformation data: stores original positions + profile
  const deformData = useRef<{
    meshes: Array<{ geometry: THREE.BufferGeometry; original: Float32Array }>
    profile: ModelProfile
  } | null>(null)

  // Smooth lerp targets for measurements
  const currentMeasurements = useRef<MeasurementValues>({
    chest: 100, waist: 84, hip: 98, shoulders: 46,
    trouserLength: 105, backLength: 74, sleeveLength: 64, inseam: 81,
  })

  // 1) Auto-scale, position, assign materials, and prepare deformation data
  useEffect(() => {
    // Auto-detect scale
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    let scaleFactor = 1
    if (maxDim > 500) scaleFactor = 0.001
    else if (maxDim > 50) scaleFactor = 0.01
    else if (maxDim > 5) scaleFactor = 0.1

    if (scaleFactor !== 1) {
      clone.scale.multiplyScalar(scaleFactor)
      clone.updateMatrixWorld(true)
    }

    // Center and ground the model
    const scaledBox = new THREE.Box3().setFromObject(clone)
    const scaledCenter = scaledBox.getCenter(new THREE.Vector3())
    clone.position.x -= scaledCenter.x
    clone.position.z -= scaledCenter.z
    clone.position.y -= scaledBox.min.y

    // Collect all meshes and prepare deformation data
    const deformMeshes: Array<{ geometry: THREE.BufferGeometry; original: Float32Array }> = []
    const allGeometries: THREE.BufferGeometry[] = []
    const buttonMeshes: THREE.Mesh[] = []

    clone.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return
      const mesh = child as THREE.Mesh
      const name = mesh.name || mesh.parent?.name || ''
      const matName = (mesh.material as THREE.Material)?.name || ''
      const part = classifyMesh(name, matName)

      // Clone geometry so we can deform independently
      mesh.geometry = mesh.geometry.clone()

      switch (part) {
        case 'fabric': case 'unknown': mesh.material = fabricMaterial; break
        case 'button':
          mesh.material = buttonMaterial
          buttonMeshes.push(mesh)
          break
        case 'shirt': mesh.material = shirtMaterial; break
        case 'shoes': mesh.material = shoeMaterial; break
        case 'skin': mesh.material = skinMaterial; break
      }
      mesh.castShadow = true
      mesh.receiveShadow = true

      // Deform ALL meshes so buttons/details track with the fabric
      const posAttr = mesh.geometry.attributes.position
      const original = new Float32Array(posAttr.array as Float32Array)
      deformMeshes.push({ geometry: mesh.geometry, original })
      allGeometries.push(mesh.geometry)
    })

    // Detect the model's height profile from unscaled geometries
    const profile = detectModelProfile(allGeometries)
    deformData.current = { meshes: deformMeshes, profile }

    const sortedButtons = buttonMeshes
      .map((mesh) => {
        const center = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3())
        return { mesh, center }
      })
      // Highest buttons first, then center-most first to prioritize front placket buttons.
      .sort((a, b) => {
        const yDelta = b.center.y - a.center.y
        if (Math.abs(yDelta) > 0.005) return yDelta
        return Math.abs(a.center.x) - Math.abs(b.center.x)
      })

    orderedButtonMeshes.current = sortedButtons.map(({ mesh }) => mesh)

    console.log('[SuitCharacter] Scale:', scaleFactor,
      'Deformable meshes:', deformMeshes.length,
      'HeightAxis:', profile.heightAxis,
      'Range:', profile.minHeight.toFixed(0), '-', profile.maxHeight.toFixed(0))
  }, [clone, fabricMaterial, buttonMaterial, shirtMaterial, skinMaterial, shoeMaterial])

  useEffect(() => {
    const shirtHex = showVest ? '#2a2a30' : '#f0ece4'
    shirtMaterial.color.set(shirtHex)
    shirtMaterial.sheenColor?.set(shirtHex)
    shirtMaterial.roughness = showVest ? 0.78 : 0.6

    const controlled = orderedButtonMeshes.current
    controlled.forEach((mesh) => {
      mesh.visible = false
    })

    const maxVisible = breasted === 'double' ? buttons * 2 : buttons
    controlled.forEach((mesh, index) => {
      mesh.visible = index < maxVisible
    })
  }, [showVest, breasted, buttons, shirtMaterial])

  // 2) Smooth deformation on every frame
  useFrame(() => {
    if (!deformData.current) return

    const store = useConfigStore.getState()
    const target: MeasurementValues = {
      chest: store.chest,
      waist: store.waist,
      hip: store.hip,
      shoulders: store.shoulders,
      trouserLength: store.trouserLength,
      backLength: store.backLength,
      sleeveLength: store.sleeveLength,
      inseam: store.inseam,
    }

    // Style controls feed additional silhouette offsets so keyed options visibly affect the model.
    if (store.breasted === 'double') {
      target.chest += 8
      target.waist += 4
      target.shoulders += 1.5
    }

    if (store.lapel === 'peak') {
      target.shoulders += 3
      target.chest += 2
    } else if (store.lapel === 'shawl') {
      target.shoulders -= 2
      target.chest -= 1
    }

    if (store.pockets === 'patch') {
      target.hip += 3
      target.waist += 1
    } else if (store.pockets === 'jetted') {
      target.hip -= 2
    }

    if (store.vents === 'none') {
      target.hip -= 2
      target.backLength -= 1
    } else if (store.vents === 'side') {
      target.hip += 2
    }

    if (store.trouserFit === 'slim') {
      target.waist -= 6
      target.hip -= 8
    } else if (store.trouserFit === 'wide') {
      target.waist += 6
      target.hip += 10
    }

    if (store.trouserPleat) {
      target.hip += 4
      target.waist += 1
    }
    if (store.trouserCuff) target.trouserLength -= 2
    if (store.showVest) target.chest += 2

    // Smooth lerp toward target measurements
    const cur = currentMeasurements.current
    const lerpSpeed = 0.12
    let changed = false
    for (const key of Object.keys(target) as (keyof MeasurementValues)[]) {
      const diff = target[key] - cur[key]
      if (Math.abs(diff) > 0.01) {
        cur[key] += diff * lerpSpeed
        changed = true
      }
    }

    if (!changed) return

    // Apply deformation to all fabric meshes
    const { meshes, profile } = deformData.current
    for (const { geometry, original } of meshes) {
      deformGeometry(geometry, original, cur, profile)
    }
  })

  // 3) Play idle animation if available
  useEffect(() => {
    const names = Object.keys(actions)
    if (names.length === 0) return
    const animName =
      names.find((n) => n.toLowerCase().includes('idle_neutral')) ||
      names.find((n) => n.toLowerCase().includes('idle')) ||
      names.find((n) => n.toLowerCase().includes('stand'))
    if (animName && actions[animName]) {
      actions[animName]!.reset().fadeIn(0.5).play()
    }
    return () => {
      if (animName && actions[animName]) actions[animName]!.fadeOut(0.3)
    }
  }, [actions])

  // Cleanup
  useEffect(() => {
    return () => {
      buttonMaterial.dispose()
      shirtMaterial.dispose()
      skinMaterial.dispose()
      shoeMaterial.dispose()
    }
  }, [buttonMaterial, shirtMaterial, skinMaterial, shoeMaterial])

  return <primitive ref={groupRef} object={clone} />
})

useGLTF.preload('/customizer/suit.glb')
