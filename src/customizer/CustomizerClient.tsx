'use client';

import dynamic from 'next/dynamic';

const CustomizerApp = dynamic(() => import('./App'), {
  ssr: false,
  loading: () => (
    <div className="customizer-root flex h-[calc(100vh-140px)] items-center justify-center bg-surface text-white/60">
      Loading suit customizer...
    </div>
  ),
});

export default function CustomizerClient() {
  return (
    <div className="customizer-root h-[calc(100vh-140px)] w-full overflow-hidden">
      <CustomizerApp />
    </div>
  );
}