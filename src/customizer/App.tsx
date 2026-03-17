import React from 'react'
import { Scene } from './components/three/Scene'
import { Sidebar } from './components/ui/Sidebar'
import { Header } from './components/ui/Header'
import { MobileDrawer } from './components/ui/MobileDrawer'
import { useIsMobile } from './utils/responsive'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex-1 flex items-center justify-center bg-surface text-white/60 p-8">
          <div className="text-center space-y-3">
            <p className="text-lg font-display">3D Error</p>
            <p className="text-sm text-white/40 max-w-md">
              {this.state.error.message}
            </p>
            <button
              onClick={() => this.setState({ error: null })}
              className="px-4 py-2 text-sm border border-accent/50 text-accent rounded hover:bg-accent/10"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const isMobile = useIsMobile()

  return (
    <div className="h-full flex flex-col bg-surface">
      <Header />
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop sidebar */}
        {!isMobile && <Sidebar />}

        {/* 3D Viewport */}
        <div className="flex-1 relative">
          <ErrorBoundary>
            <Scene />
          </ErrorBoundary>

          {/* Viewport hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none
            text-white/20 text-xs flex items-center gap-2">
            <svg className="w-4 h-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Click and drag to rotate
          </div>
        </div>

        {/* Mobile drawer */}
        {isMobile && <MobileDrawer />}
      </div>
    </div>
  )
}
