import Link from 'next/link';
import { getCustomizerSettings } from '@/lib/cms/wordpress-client';
import { DEFAULT_BRANDING } from '@/lib/constants/branding';

export async function Hero() {
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
    <section
      className="relative text-white overflow-hidden"
      style={{
        background: heroImage
          ? `linear-gradient(135deg, ${primaryColor}ee, ${primaryColor}cc), url(${heroImage}) center/cover`
          : `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd, ${primaryColor}bb)`,
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm mb-6" style={{ background: `${primaryColor}88` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            Regulados por la SEPS
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {title}
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={ctaUrl} className="inline-flex items-center justify-center rounded-lg bg-white font-semibold h-11 px-8 text-sm transition-colors hover:bg-gray-100" style={{ color: primaryColor }}>
              {ctaText}
            </Link>
            <Link href="/simuladores" className="inline-flex items-center justify-center rounded-lg border border-white/30 text-white hover:bg-white/10 h-11 px-8 text-sm font-medium transition-colors">
              Simular crédito
            </Link>
          </div>

          {stats.length > 0 && (
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold">{stat.number}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
