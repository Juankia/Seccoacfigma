const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || 'https://cmswebdemo.skillsoft.ec/cms/wp-json';

async function wpFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_API}${endpoint}`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  acf?: Record<string, unknown>;
}

function textToArray(text: unknown): string[] {
  if (!text || typeof text !== 'string') return [];
  return text.split('\n').map(s => s.trim()).filter(Boolean);
}

export async function getHeroSettings() {
  // Get from WP options via custom endpoint
  const settings = await wpFetch<Record<string, string>>('/coopdigital/v1/site-settings');
  if (settings && settings.hero_title) return settings;

  // Fallback: try wp options directly
  const opts = await wpFetch<Record<string, string>>('/coopdigital/v1/site-settings');
  return opts;
}

export async function getSavingsProducts() {
  const posts = await wpFetch<WPPost[]>('/wp/v2/savings_product?per_page=20&orderby=date&order=asc');
  if (!posts || posts.length === 0) return null;

  return posts.map(p => ({
    id: String(p.id),
    type: 'savings' as const,
    name: p.title.rendered,
    slug: p.slug,
    shortDescription: (p.acf?.short_description as string) || '',
    longDescription: p.content.rendered.replace(/<[^>]*>/g, ''),
    benefits: textToArray(p.acf?.benefits),
    requirements: textToArray(p.acf?.requirements),
    referenceRate: Number(p.acf?.reference_rate) || 0,
    minAmount: Number(p.acf?.min_amount) || 0,
    ctaLabel: (p.acf?.cta_label as string) || 'Ver detalles',
    iconName: (p.acf?.icon as string) || '📋',
    isFeatured: Boolean(p.acf?.is_featured),
    sortOrder: Number(p.acf?.sort_order) || 0,
  }));
}

export async function getCreditProducts() {
  const posts = await wpFetch<WPPost[]>('/wp/v2/credit_product?per_page=20&orderby=date&order=asc');
  if (!posts || posts.length === 0) return null;

  return posts.map(p => ({
    id: String(p.id),
    type: 'credit' as const,
    name: p.title.rendered,
    slug: p.slug,
    shortDescription: (p.acf?.short_description as string) || '',
    longDescription: p.content.rendered.replace(/<[^>]*>/g, ''),
    benefits: textToArray(p.acf?.benefits),
    requirements: textToArray(p.acf?.requirements),
    referenceRate: Number(p.acf?.reference_rate) || 0,
    minAmount: Number(p.acf?.min_amount) || 0,
    maxAmount: Number(p.acf?.max_amount) || 0,
    minTerm: Number(p.acf?.min_term) || 0,
    maxTerm: Number(p.acf?.max_term) || 0,
    ctaLabel: (p.acf?.cta_label as string) || 'Ver detalles',
    iconName: (p.acf?.icon as string) || '📋',
    isFeatured: Boolean(p.acf?.is_featured),
    sortOrder: Number(p.acf?.sort_order) || 0,
  }));
}

export async function getBranches() {
  const posts = await wpFetch<WPPost[]>('/wp/v2/branch?per_page=20');
  if (!posts || posts.length === 0) return null;

  return posts.map(p => ({
    id: String(p.id),
    name: p.title.rendered,
    city: (p.acf?.city as string) || '',
    address: (p.acf?.address as string) || '',
    phone: (p.acf?.phone as string) || '',
    schedule: textToArray(p.acf?.schedule).map(s => {
      const parts = s.split(':');
      return { day: parts[0]?.trim() || s, hours: parts.slice(1).join(':').trim() || '' };
    }),
    lat: Number(p.acf?.lat) || 0,
    lng: Number(p.acf?.lng) || 0,
    isMain: Boolean(p.acf?.is_main),
  }));
}

export async function getFaqs() {
  const posts = await wpFetch<(WPPost & { faq_category?: number[] })[]>('/wp/v2/faq?per_page=50');
  if (!posts || posts.length === 0) return null;

  // Get categories
  const cats = await wpFetch<{ id: number; name: string }[]>('/wp/v2/faq_category?per_page=50');
  const catMap = new Map((cats || []).map(c => [c.id, c.name]));

  return posts.map(p => ({
    id: String(p.id),
    category: catMap.get(p.faq_category?.[0] || 0) || 'General',
    question: p.title.rendered,
    answer: (p.acf?.answer as string) || '',
    sortOrder: Number(p.acf?.sort_order) || 0,
  }));
}

export interface SiteCustomization {
  logo: string;
  favicon: string;
  institutionName: string;
  shortName: string;
  sepsCode: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkColor: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaUrl: string;
  heroImage: string;
  stats: { number: string; label: string }[];
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socialLinks: Record<string, string>;
  mission: string;
  vision: string;
  history: string;
  values: string[];
  footerText: string;
}

export async function getCustomizerSettings(): Promise<SiteCustomization | null> {
  return wpFetch<SiteCustomization>('/coopdigital/v1/customizer');
}

export interface MenuItem {
  ID: number;
  title: string;
  url: string;
  slug: string;
  children?: MenuItem[];
}

// ====== DOCUMENT CPTs ======
export interface DocItem {
  id: string;
  title: string;
  content: string;
  pdfUrl: string;
  year: string;
  period: string;
  allowDownload: boolean;
  icon: string;
  sortOrder: number;
}

async function getDocuments(postType: string): Promise<DocItem[] | null> {
  const posts = await wpFetch<WPPost[]>(`/wp/v2/${postType}?per_page=50&orderby=date&order=desc`);
  if (!posts || posts.length === 0) return null;

  return posts.map(p => ({
    id: String(p.id),
    title: p.title.rendered,
    content: p.content.rendered,
    pdfUrl: (p.acf?.pdf_file as string) || '',
    year: (p.acf?.year as string) || '',
    period: (p.acf?.period as string) || '',
    allowDownload: Boolean(p.acf?.allow_download),
    icon: (p.acf?.icon as string) || '📄',
    sortOrder: Number(p.acf?.sort_order) || 0,
  }));
}

export const getTransparencyDocs = () => getDocuments('transparency_doc');
export const getNormativaDocs = () => getDocuments('normativa_doc');
export const getSecInformaDocs = () => getDocuments('sec_informa');

export interface NoticiaItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  summary: string;
  featuredImage: string;
}

export async function getNoticias(): Promise<NoticiaItem[] | null> {
  const posts = await wpFetch<(WPPost & { excerpt?: { rendered: string }; date: string; _embedded?: { 'wp:featuredmedia'?: [{ source_url: string }] } })[]>(
    '/wp/v2/noticia?per_page=20&_embed'
  );
  if (!posts || posts.length === 0) return null;

  return posts.map(p => ({
    id: String(p.id),
    title: p.title.rendered,
    slug: p.slug,
    content: p.content.rendered,
    excerpt: p.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
    date: p.date,
    summary: (p.acf?.summary as string) || '',
    featuredImage: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
  }));
}

export async function getMainMenu(): Promise<MenuItem[] | null> {
  const data = await wpFetch<{ items: MenuItem[] }>('/menus/v1/menus/main-menu');
  if (!data?.items) return null;

  return data.items.map(item => ({
    ID: item.ID,
    title: item.title,
    url: item.url,
    slug: item.slug,
    children: item.children?.map(child => ({
      ID: child.ID,
      title: child.title,
      url: child.url,
      slug: child.slug,
    })),
  }));
}
