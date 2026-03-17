import React from 'react'
import { useConfigStore, PresetSize, MeasurementKey } from '../../store/useConfigStore'
import { measurements } from '../../data/measurements'
import { Slider } from '../shared/Slider'

const sizes: PresetSize[] = ['S', 'M', 'L', 'XL', 'XXL']

export function MeasurementPanel() {
  const store = useConfigStore()

  return (
    <div className="space-y-4">
      {/* Size presets */}
      <div className="space-y-2">
        <span className="text-xs text-white/50">Standard Size</span>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => store.applyPresetSize(size)}
              className="flex-1 py-1.5 text-xs rounded-md border border-white/10
                text-white/50 hover:border-accent/50 hover:text-accent
                transition-all duration-200"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-white/5" />

      {/* Individual measurements */}
      <div className="space-y-3">
        <span className="text-xs text-white/40">Custom Measurements</span>
        {measurements.map((m) => (
          <Slider
            key={m.key}
            label={m.name}
            value={store[m.key]}
            min={m.min}
            max={m.max}
            step={m.step}
            unit={m.unit}
            onChange={(v) => store.setMeasurement(m.key, v)}
          />
        ))}
      </div>

      {/* Body silhouette hint */}
      <div className="flex justify-center pt-2 opacity-30">
        <svg viewBox="0 0 60 120" className="w-16 h-32" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Simplified body outline */}
          <ellipse cx="30" cy="10" rx="8" ry="9" /> {/* Head */}
          <line x1="30" y1="19" x2="30" y2="25" /> {/* Neck */}
          <path d="M18 30 Q30 28 42 30 L44 55 Q30 60 16 55 Z" /> {/* Torso */}
          <line x1="18" y1="32" x2="6" y2="58" /> {/* Left arm */}
          <line x1="42" y1="32" x2="54" y2="58" /> {/* Right arm */}
          <path d="M20 55 L18 95 L22 95 L28 70 L32 70 L38 95 L42 95 L40 55" /> {/* Legs */}
        </svg>
      </div>
    </div>
  )
}
