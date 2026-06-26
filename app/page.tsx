import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HeroSection } from '@/components/home/HeroSection';
import { StorySection } from '@/components/home/StorySection';
import { HomeFeatureSections } from '@/components/home/HomeFeatureSections';
import { HonestSection } from '@/components/home/HonestSection';
import { MakerSection } from '@/components/home/MakerSection';
import { PricingSection } from '@/components/home/PricingSection';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCtaSection } from '@/components/home/FinalCtaSection';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <StorySection />
        <HomeFeatureSections />
        <HonestSection />
        <MakerSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
