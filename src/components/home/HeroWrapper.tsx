import { getCustomizerSettings } from '@/lib/cms/wordpress-client';
import { DEFAULT_BRANDING } from '@/lib/constants/branding';
import { Hero } from './Hero';

export async function HeroWrapper() {
  const cms = await getCustomizerSettings();

  const title = cms?.heroTitle || DEFAULT_BRANDING.heroTitle;
  const subtitle = cms?.heroSubtitle || DEFAULT_BRANDING.heroSubtitle;
  const ctaText = cms?.heroCtaText || DEFAULT_BRANDING.heroCtaText;
  const ctaUrl = cms?.heroCtaUrl || DEFAULT_BRANDING.heroCtaUrl;
  const primaryColor = cms?.primaryColor || '#166534';
  const heroImage = cms?.heroImage || '';
  const stats = cms?.stats?.length
    ? cms.stats
    : [
        { number: '45,000+', label: 'Socios activos' },
        { number: '25+', label: 'Años de servicio' },
        { number: '5', label: 'Agencias en Cuenca' },
        { number: 'A+', label: 'Calificación de riesgo' },
      ];

  return (
    <Hero
      title={title}
      subtitle={subtitle}
      ctaText={ctaText}
      ctaUrl={ctaUrl}
      primaryColor={primaryColor}
      heroImage={heroImage}
      stats={stats}
    />
  );
}
