import React from 'react'

interface SwatchProps {
  color?: string
  label: string
  active: boolean
  onClick: () => void
  className?: string
  children?: React.ReactNode
}

export function Swatch({ color, label, active, onClick, className = '', children }: SwatchProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center gap-1.5 transition-all duration-200
        ${className}
      `}
      title={label}
    >
      <div
        className={`
          w-12 h-12 rounded-lg border-2 transition-all duration-200 overflow-hidden
          flex items-center justify-center
          ${active
            ? 'border-accent shadow-lg shadow-accent/20 scale-110'
            : 'border-white/10 hover:border-white/30 hover:scale-105'
          }
        `}
        style={color ? { backgroundColor: color } : undefined}
      >
        {children}
      </div>
      <span className={`text-[10px] transition-colors ${active ? 'text-accent' : 'text-white/50 group-hover:text-white/70'}`}>
        {label}
      </span>
    </button>
  )
}
