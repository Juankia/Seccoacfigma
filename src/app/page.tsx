import { HeroWrapper } from '@/components/home/HeroWrapper';
import { QuickAccess } from '@/components/home/QuickAccess';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Benefits } from '@/components/home/Benefits';
import { CtaBanner } from '@/components/home/CtaBanner';

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HeroWrapper />
      <QuickAccess />
      <FeaturedProducts />
      <Benefits />
      <CtaBanner />
    </>
  );
}
