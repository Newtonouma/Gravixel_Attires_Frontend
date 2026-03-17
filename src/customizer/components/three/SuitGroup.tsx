import React, { Suspense } from 'react'
import { SuitCharacter } from './SuitCharacter'

/**
 * Top-level group containing the suit character model.
 * Wraps in Suspense so the loader shows while GLB downloads.
 */
export const SuitGroup = React.memo(function SuitGroup() {
  return (
    <group>
      <Suspense fallback={null}>
        <SuitCharacter />
      </Suspense>
    </group>
  )
})
