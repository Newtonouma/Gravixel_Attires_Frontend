import React from 'react'
import { useConfigStore, FabricId } from '../../store/useConfigStore'
import { fabrics } from '../../data/fabrics'
import { Swatch } from '../shared/Swatch'

// Visual indicators for different fabric types
const fabricTextures: Record<FabricId, string> = {
  wolle: '░░░░',
  kaschmir: '····',
  seide: '▓▓▓▓',
  leinen: '╫╫╫╫',
  tweed: '▒▒▒▒',
  baumwolle: '∷∷∷∷',
}

export function FabricSelector() {
  const current = useConfigStore((s) => s.fabric)
  const setFabric = useConfigStore((s) => s.setFabric)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {fabrics.map((f) => (
          <Swatch
            key={f.id}
            label={f.name}
            active={current === f.id}
            onClick={() => setFabric(f.id)}
          >
            <span className="text-[8px] text-white/40 font-mono leading-none">
              {fabricTextures[f.id]}
            </span>
          </Swatch>
        ))}
      </div>
      <p className="text-xs text-white/40 italic">
        {fabrics.find((f) => f.id === current)?.description}
      </p>
    </div>
  )
}
