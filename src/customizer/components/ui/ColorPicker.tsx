import React from 'react'
import { useConfigStore } from '../../store/useConfigStore'
import { colorPresets } from '../../data/colors'

export function ColorPicker() {
  const current = useConfigStore((s) => s.color)
  const setColor = useConfigStore((s) => s.setColor)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-3">
        {colorPresets.map((c) => (
          <button
            key={c.hex}
            onClick={() => setColor(c.hex)}
            className={`
              group flex flex-col items-center gap-1.5
            `}
            title={c.name}
          >
            <div
              className={`
                w-10 h-10 rounded-full border-2 transition-all duration-200
                ${current === c.hex
                  ? 'swatch-ring scale-110'
                  : 'border-white/10 hover:border-white/30 hover:scale-105'
                }
              `}
              style={{ backgroundColor: c.hex }}
            />
            <span className={`text-[10px] ${current === c.hex ? 'text-accent' : 'text-white/40'}`}>
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* Custom color input */}
      <div className="flex items-center gap-2 pt-1">
        <label className="text-xs text-white/40">Custom color:</label>
        <input
          type="color"
          value={current}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent"
        />
        <span className="text-xs text-white/50 font-mono">{current}</span>
      </div>
    </div>
  )
}
