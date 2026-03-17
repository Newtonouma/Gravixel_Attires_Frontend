import React, { useMemo, useState } from 'react'
import { useConfigStore } from '../../store/useConfigStore'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://gravixel-attires-backend.onrender.com'

export function Header() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const config = useConfigStore((s) => ({
    fabric: s.fabric,
    pattern: s.pattern,
    color: s.color,
    lapel: s.lapel,
    buttons: s.buttons,
    breasted: s.breasted,
    pockets: s.pockets,
    vents: s.vents,
    trouserFit: s.trouserFit,
    trouserPleat: s.trouserPleat,
    trouserCuff: s.trouserCuff,
    showVest: s.showVest,
    chest: s.chest,
    waist: s.waist,
    hip: s.hip,
    shoulders: s.shoulders,
    sleeveLength: s.sleeveLength,
    backLength: s.backLength,
    trouserLength: s.trouserLength,
    inseam: s.inseam,
  }))

  const designName = useMemo(() => {
    return `Suit ${new Date().toLocaleString()}`
  }, [])

  const handleSave = async () => {
    if (isSaving) return
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const response = await fetch(`${BACKEND_URL}/designs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: designName,
          configuration: config,
          source: 'public-customizer',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save design')
      }

      const data = await response.json()
      setSaveMessage(`Saved as design #${data.id}`)
    } catch {
      setSaveMessage('Could not save right now. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="currentColor">
            <path d="M12 2L8 8v14h3v-8h2v8h3V8L12 2zm-1 4l1-1.5L13 6l-1 1.5L11 6z" />
          </svg>
        </div>
        <div>
          <h1 className="font-display text-lg font-semibold tracking-wide text-white">
            SUIT
          </h1>
          <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">
            Configurator
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {saveMessage && <span className="text-xs text-white/70">{saveMessage}</span>}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded border border-accent/50 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Saving...' : 'Save Design'}
        </button>
      </div>
    </header>
  )
}
