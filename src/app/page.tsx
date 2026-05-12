import { Hero } from '@/components/home/Hero';
import { QuickAccess } from '@/components/home/QuickAccess';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Benefits } from '@/components/home/Benefits';
import { CtaBanner } from '@/components/home/CtaBanner';

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <FeaturedProducts />
      <Benefits />
      <CtaBanner />
    </>
  );
}
