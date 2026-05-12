import { getCustomizerSettings, getMainMenu } from '@/lib/cms/wordpress-client';
import { Navbar } from './Navbar';

export async function NavbarWrapper() {
  const [cms, menuItems] = await Promise.all([
    getCustomizerSettings(),
    getMainMenu(),
  ]);

  const navigation = menuItems
    ? menuItems.map(item => ({ name: item.title, href: item.url }))
    : undefined;

  return (
    <Navbar
      logo={cms?.logo || ''}
      shortName={cms?.shortName || 'Raíces del Austro'}
      phone={cms?.phone || '(07) 283-4567'}
      email={cms?.email || 'info@raicesdelaustro.fin.ec'}
      sepsCode={cms?.sepsCode || 'SEPS-ROEPS-2023-0001234'}
      primaryColor={cms?.primaryColor || '#166534'}
      menuItems={navigation}
    />
  );
}
