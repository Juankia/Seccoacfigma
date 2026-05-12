import { Branding } from '@/types';

export const DEFAULT_BRANDING: Branding = {
  logoUrl: '/images/logo-sec.svg',
  primaryColor: '#003848',
  secondaryColor: '#f0f7fa',
  accentColor: '#ca9f43',
  fontFamily: 'Inter',
  welcomeMessage:
    '¡Bienvenido/a a COAC SEC! Soy tu asistente virtual. ¿En qué puedo ayudarte?',
  botTone: 'formal-friendly',
  disclaimer:
    'Este chatbot proporciona información general. Para operaciones financieras, acércate a nuestras agencias.',
  whatsapp: '+593 99 051 6482',
  phone: '(07) 284-4185',
  email: 'info@coacsec.fin.ec',
  address: 'Presidente Córdova 9-06 y Benigno Malo, Edif. San Agustín, Ofc. 3-14, Cuenca, Ecuador',
  socialLinks: {
    facebook: 'https://www.facebook.com/profile.php?id=100086475041952',
    instagram: 'https://instagram.com/cooperativasec',
    twitter: 'https://twitter.com/CooperativaSec',
    linkedin: 'https://www.linkedin.com/company/cooperativasec',
  },
  heroTitle: 'Solidaridad, Emprendimiento y Cooperación',
  heroSubtitle:
    'Más de 33 años impulsando el desarrollo económico de nuestros socios. Ahorro seguro, crédito oportuno y servicio cercano. ¡Crecemos junto a ti!',
  heroCtaText: 'Banca Virtual',
  heroCtaUrl: 'https://virtual.coacsec.fin.ec/',
  heroImageUrl: '/images/hero-cuenca.jpg',
  institutionName: 'Cooperativa de Ahorro y Crédito Solidaridad, Emprendimiento y Cooperación',
  mission:
    'Impulsar el desarrollo económico de nuestros socios y clientes a través de productos y servicios financieros de calidad para satisfacer sus necesidades.',
  vision:
    'Ser una entidad financiera con procesos eficientes y productos innovadores, con atención personalizada a socios y clientes promoviendo el desarrollo económico solidario.',
  values: [
    'Solidaridad',
    'Emprendimiento',
    'Cooperación',
    'Transparencia',
    'Responsabilidad',
    'Compromiso',
  ],
  history:
    'Somos una cooperativa sin fines de lucro, de capital variable e ilimitado número de socios, constituida en la ciudad de Cuenca el 18 de Diciembre de 1991 con estricta sujeción de la Ley, controlada por la Superintendencia de Economía Popular y Solidaria (SEPS). La Cooperativa opera con un Consejo de Administración, un Consejo de Vigilancia, Comité Electoral y un Comité de Crédito.',
  footerText:
    'Cooperativa de Ahorro y Crédito Solidaridad, Emprendimiento y Cooperación — Regulada por la SEPS',
  sepsCode: 'SEPS-ROEPS-2023-SEC',
};

export const TENANT_ID = 'coop-demo';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cmswebdemo.skillsoft.ec/api/v1';
