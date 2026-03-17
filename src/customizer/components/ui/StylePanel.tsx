import React from 'react'
import { useConfigStore, LapelType, ButtonCount, BreastedType, PocketType, VentType, TrouserFit } from '../../store/useConfigStore'
import { lapelOptions, breastedOptions, pocketOptions, ventOptions, trouserFitOptions } from '../../data/styles'

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { id: T; name: string; description: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="space-y-2">
      <span className="text-xs text-white/50">{label}</span>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            title={opt.description}
            className={`
              px-3 py-1.5 text-xs rounded-md border transition-all duration-200
              ${value === opt.id
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/70'
              }
            `}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  )
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
        {label}
      </span>
      <button
        onClick={() => onChange(!value)}
        className={`
          relative w-10 h-5 rounded-full transition-all duration-300
          ${value ? 'bg-accent' : 'bg-white/10'}
        `}
      >
        <div
          className={`
            absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300
            ${value ? 'left-5' : 'left-0.5'}
          `}
        />
      </button>
    </label>
  )
}

export function StylePanel() {
  const lapel = useConfigStore((s) => s.lapel)
  const buttons = useConfigStore((s) => s.buttons)
  const breasted = useConfigStore((s) => s.breasted)
  const pockets = useConfigStore((s) => s.pockets)
  const vents = useConfigStore((s) => s.vents)
  const trouserFit = useConfigStore((s) => s.trouserFit)
  const trouserPleat = useConfigStore((s) => s.trouserPleat)
  const trouserCuff = useConfigStore((s) => s.trouserCuff)
  const showVest = useConfigStore((s) => s.showVest)

  const setLapel = useConfigStore((s) => s.setLapel)
  const setButtons = useConfigStore((s) => s.setButtons)
  const setBreasted = useConfigStore((s) => s.setBreasted)
  const setPockets = useConfigStore((s) => s.setPockets)
  const setVents = useConfigStore((s) => s.setVents)
  const setTrouserFit = useConfigStore((s) => s.setTrouserFit)
  const setTrouserPleat = useConfigStore((s) => s.setTrouserPleat)
  const setTrouserCuff = useConfigStore((s) => s.setTrouserCuff)
  const setShowVest = useConfigStore((s) => s.setShowVest)

  return (
    <div className="space-y-4">
      {/* Jacket */}
      <div className="space-y-3">
        <h4 className="text-xs text-accent/80 font-medium tracking-wider uppercase">Jacket</h4>

        <OptionGroup<LapelType>
          label="Lapel"
          options={lapelOptions}
          value={lapel}
          onChange={setLapel}
        />

        <OptionGroup<BreastedType>
          label="Front"
          options={breastedOptions}
          value={breasted}
          onChange={setBreasted}
        />

        <div className="space-y-2">
          <span className="text-xs text-white/50">Buttons</span>
          <div className="flex gap-2">
            {([1, 2, 3] as ButtonCount[]).map((n) => (
              <button
                key={n}
                onClick={() => setButtons(n)}
                className={`
                  w-10 h-8 text-xs rounded-md border transition-all duration-200
                  ${buttons === n
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-white/10 text-white/50 hover:border-white/30'
                  }
                `}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <OptionGroup<PocketType>
          label="Pockets"
          options={pocketOptions}
          value={pockets}
          onChange={setPockets}
        />

        <OptionGroup<VentType>
          label="Vents"
          options={ventOptions}
          value={vents}
          onChange={setVents}
        />
      </div>

      <hr className="border-white/5" />

      {/* Trousers */}
      <div className="space-y-3">
        <h4 className="text-xs text-accent/80 font-medium tracking-wider uppercase">Trousers</h4>

        <OptionGroup<TrouserFit>
          label="Fit"
          options={trouserFitOptions}
          value={trouserFit}
          onChange={setTrouserFit}
        />

        <Toggle label="Pleats" value={trouserPleat} onChange={setTrouserPleat} />
        <Toggle label="Cuffs" value={trouserCuff} onChange={setTrouserCuff} />
      </div>

      <hr className="border-white/5" />

      {/* Vest */}
      <div className="space-y-3">
        <h4 className="text-xs text-accent/80 font-medium tracking-wider uppercase">Vest</h4>
        <Toggle label="Add Vest" value={showVest} onChange={setShowVest} />
      </div>
    </div>
  )
}
