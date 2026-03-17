import React from 'react'

interface SectionToggleProps {
  title: string
  sectionId: string
  activeSection: string
  onToggle: (id: string) => void
  children: React.ReactNode
}

export function SectionToggle({ title, sectionId, activeSection, onToggle, children }: SectionToggleProps) {
  const isOpen = activeSection === sectionId

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => onToggle(sectionId)}
        className="w-full flex items-center justify-between py-3.5 px-1 text-left
          hover:text-accent transition-colors duration-200"
      >
        <span className="text-sm font-semibold tracking-wider uppercase">
          {title}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 section-enter">
          {children}
        </div>
      )}
    </div>
  )
}
