'use client';

import dynamic from 'next/dynamic';

const CustomizerApp = dynamic(() => import('./App'), {
  ssr: false,
  loading: () => (
    <div className="customizer-root flex h-screen items-center justify-center bg-surface text-white/60">
      Loading suit customizer...
    </div>
  ),
});

export default function CustomizerClient() {
  return (
    <div className="customizer-root h-screen w-full overflow-hidden">
      <CustomizerApp />
    </div>
  );
}