import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Collections from '@/components/Collections';
import SmartTailoring from '@/components/SmartTailoring';
import OutfitInspiration from '../components/OutfitInspiration/OutfitInspiration';
import Reviews from '@/components/Reviews';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Collections />
      <SmartTailoring />
      <OutfitInspiration />
      <Reviews />
    </main>
  );
}
