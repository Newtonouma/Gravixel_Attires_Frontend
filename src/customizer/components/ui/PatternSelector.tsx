import React from 'react'
import { useConfigStore } from '../../store/useConfigStore'
import { patterns } from '../../data/patterns'
import { Swatch } from '../shared/Swatch'

// Simple visual pattern representations
const patternIcons: Record<string, string> = {
  uni: '█',
  nadelstreifen: '║║',
  kreidestreifen: '┃ ┃',
  fischgrat: '⋘⋙',
  hahnentritt: '▞▚',
  glencheck: '╬╬',
  fensterkaros: '╋╋',
  birdseye: '⠿⠿',
}

export function PatternSelector() {
  const current = useConfigStore((s) => s.pattern)
  const setPattern = useConfigStore((s) => s.setPattern)
  const color = useConfigStore((s) => s.color)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-3">
        {patterns.map((p) => (
          <Swatch
            key={p.id}
            label={p.name}
            active={current === p.id}
            onClick={() => setPattern(p.id)}
          >
            <span
              className="text-sm font-mono opacity-70"
              style={{ color: current === p.id ? '#fff' : color }}
            >
              {patternIcons[p.id]}
            </span>
          </Swatch>
        ))}
      </div>
      <p className="text-xs text-white/40 italic">
        {patterns.find((p) => p.id === current)?.description}
      </p>
    </div>
  )
}
