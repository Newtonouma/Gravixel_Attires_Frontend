import React, { useRef, useState, useCallback } from 'react'
import { useConfigStore } from '../../store/useConfigStore'
import { FabricSelector } from './FabricSelector'
import { ColorPicker } from './ColorPicker'
import { PatternSelector } from './PatternSelector'
import { StylePanel } from './StylePanel'
import { MeasurementPanel } from './MeasurementPanel'

const tabs = [
  { id: 'fabric', label: 'Fabric' },
  { id: 'color', label: 'Color' },
  { id: 'pattern', label: 'Pattern' },
  { id: 'style', label: 'Style' },
  { id: 'measurements', label: 'Measurements' },
]

export function MobileDrawer() {
  const isOpen = useConfigStore((s) => s.isMobileDrawerOpen)
  const setOpen = useConfigStore((s) => s.setMobileDrawerOpen)
  const [activeTab, setActiveTab] = useState('fabric')
  const [drawerHeight, setDrawerHeight] = useState(50) // percent of viewport
  const dragRef = useRef<{ startY: number; startHeight: number } | null>(null)

  const handleDragStart = useCallback((clientY: number) => {
    dragRef.current = { startY: clientY, startHeight: drawerHeight }
  }, [drawerHeight])

  const handleDragMove = useCallback((clientY: number) => {
    if (!dragRef.current) return
    const deltaY = dragRef.current.startY - clientY
    const deltaPct = (deltaY / window.innerHeight) * 100
    const newHeight = Math.max(15, Math.min(85, dragRef.current.startHeight + deltaPct))
    setDrawerHeight(newHeight)
  }, [])

  const handleDragEnd = useCallback(() => {
    if (!dragRef.current) return
    // Snap to positions
    if (drawerHeight < 25) {
      setOpen(false)
      setDrawerHeight(50)
    } else if (drawerHeight < 40) {
      setDrawerHeight(35)
    } else {
      setDrawerHeight(Math.min(drawerHeight, 75))
    }
    dragRef.current = null
  }, [drawerHeight, setOpen])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'fabric': return <FabricSelector />
      case 'color': return <ColorPicker />
      case 'pattern': return <PatternSelector />
      case 'style': return <StylePanel />
      case 'measurements': return <MeasurementPanel />
      default: return null
    }
  }

  return (
    <>
      {/* Toggle button when closed */}
      {!isOpen && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-0 left-0 right-0 bg-surface-light border-t border-white/10
            py-3 text-center text-sm text-accent font-medium z-50
            flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          Customize
        </button>
      )}

      {/* Drawer */}
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-surface-light rounded-t-2xl z-50
            border-t border-white/10 flex flex-col shadow-2xl"
          style={{ height: `${drawerHeight}vh` }}
        >
          {/* Drag handle */}
          <div
            className="flex justify-center py-2.5 cursor-grab active:cursor-grabbing touch-none"
            onMouseDown={(e) => handleDragStart(e.clientY)}
            onMouseMove={(e) => e.buttons && handleDragMove(e.clientY)}
            onMouseUp={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
            onTouchEnd={handleDragEnd}
          >
            <div className="drawer-handle" />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5 px-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 py-2 text-xs font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-white/40'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {renderTabContent()}
          </div>
        </div>
      )}
    </>
  )
}
