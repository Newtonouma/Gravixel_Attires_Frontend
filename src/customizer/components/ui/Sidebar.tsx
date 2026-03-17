import React from 'react'
import { useConfigStore } from '../../store/useConfigStore'
import { SectionToggle } from './SectionToggle'
import { FabricSelector } from './FabricSelector'
import { ColorPicker } from './ColorPicker'
import { PatternSelector } from './PatternSelector'
import { StylePanel } from './StylePanel'
import { MeasurementPanel } from './MeasurementPanel'

export function Sidebar() {
  const activeSection = useConfigStore((s) => s.activeSection)
  const setActiveSection = useConfigStore((s) => s.setActiveSection)

  return (
    <aside className="w-[380px] h-full bg-surface-light border-r border-white/5 flex flex-col shrink-0">
      {/* Sidebar header */}
      <div className="px-5 py-4 border-b border-white/5">
        <h2 className="font-display text-base font-semibold text-white/90">
          Gravixel Attires
        </h2>
        <p className="text-[11px] text-white/30 mt-0.5">
          Build and personalize your suit design
        </p>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-5">
        <SectionToggle
          title="Fabric"
          sectionId="fabric"
          activeSection={activeSection}
          onToggle={setActiveSection}
        >
          <FabricSelector />
        </SectionToggle>

        <SectionToggle
          title="Color"
          sectionId="color"
          activeSection={activeSection}
          onToggle={setActiveSection}
        >
          <ColorPicker />
        </SectionToggle>

        <SectionToggle
          title="Pattern"
          sectionId="pattern"
          activeSection={activeSection}
          onToggle={setActiveSection}
        >
          <PatternSelector />
        </SectionToggle>

        <SectionToggle
          title="Style"
          sectionId="style"
          activeSection={activeSection}
          onToggle={setActiveSection}
        >
          <StylePanel />
        </SectionToggle>

        <SectionToggle
          title="Measurements"
          sectionId="measurements"
          activeSection={activeSection}
          onToggle={setActiveSection}
        >
          <MeasurementPanel />
        </SectionToggle>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20">
          Rotate 360 degrees • Scroll to zoom
        </p>
      </div>
    </aside>
  )
}
