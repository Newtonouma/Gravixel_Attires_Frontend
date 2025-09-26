import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import BestsellingProducts from '@/components/BestsellingProducts/BestsellingProducts';
import Collections from '@/components/Collections';
import SmartTailoring from '@/components/SmartTailoring';
import OutfitInspiration from '../components/OutfitInspiration/OutfitInspiration';
import Reviews from '@/components/Reviews';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <BestsellingProducts />
      <Collections />
      <SmartTailoring />
      <OutfitInspiration />
      <Reviews />
    </main>
  );
}
