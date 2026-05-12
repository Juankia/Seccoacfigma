import { getCustomizerSettings } from '@/lib/cms/wordpress-client';
import { Footer } from './Footer';

export async function FooterWrapper() {
  const cms = await getCustomizerSettings();

  return (
    <Footer
      shortName={cms?.shortName || 'Raíces del Austro'}
      phone={cms?.phone || '(07) 283-4567'}
      email={cms?.email || 'info@raicesdelaustro.fin.ec'}
      whatsapp={cms?.whatsapp || '+593 99 888 7766'}
      address={cms?.address || 'Bolívar 7-89 y Borrero, Centro Histórico, Cuenca'}
      footerText={cms?.footerText || 'Cooperativa de Ahorro y Crédito Raíces del Austro — Regulada por la SEPS'}
      socialLinks={cms?.socialLinks || {}}
      primaryColor={cms?.primaryColor || '#166534'}
    />
  );
}
