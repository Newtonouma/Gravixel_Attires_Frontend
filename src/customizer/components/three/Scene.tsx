import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useProgress, Html } from '@react-three/drei'
import * as THREE from 'three'
import { SuitGroup } from './SuitGroup'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-white/40 text-xs tracking-wide">
          Modelle werden geladen... {Math.round(progress)}%
        </span>
      </div>
    </Html>
  )
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0.75, 2.8], fov: 35 }}
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ background: 'linear-gradient(180deg, #16131d 0%, #0d0b12 100%)' }}
    >
      {/* 3-point studio lighting */}
      <spotLight
        position={[3, 4, 3]}
        angle={0.4}
        penumbra={0.9}
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        color="#fff5e6"
      />
      <spotLight position={[-3, 2, 2]} angle={0.5} penumbra={1} intensity={1.0} color="#c8d8f0" />
      <spotLight position={[0.5, 3, -3]} angle={0.6} penumbra={0.8} intensity={1.5} color="#e0d8f0" />
      <pointLight position={[0, 0.5, 2]} intensity={0.15} color="#c8a96e" />
      <ambientLight intensity={0.25} color="#9090b0" />

      <Environment preset="studio" />

      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI * 0.05}
        maxPolarAngle={Math.PI * 0.85}
        minDistance={1.5}
        maxDistance={6}
        target={[0, 0.75, 0]}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />

      <Suspense fallback={<Loader />}>
        <SuitGroup />
      </Suspense>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0a0810" roughness={0.3} metalness={0.6} envMapIntensity={0.15} />
      </mesh>

      <ContactShadows
        position={[0, 0.005, 0]}
        opacity={0.5}
        scale={5}
        blur={3}
        far={3}
        resolution={512}
      />
    </Canvas>
  )
}
