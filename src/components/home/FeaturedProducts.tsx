'use client';

import { ProductCard } from '../products/ProductCard';

// Mock data para productos destacados (usado como fallback)
const defaultSavingsProducts = [
  {
    id: '1',
    name: 'Ahorro Programado',
    slug: 'ahorro-programado',
    shortDescription: 'Alcanza tus metas con un plan de ahorro personalizado. Tasas preferenciales y flexibilidad de plazos.',
    iconName: 'PiggyBank',
    referenceRate: 5.5,
    isFeatured: true,
    ctaLabel: 'Ver detalles'
  },
  {
    id: '2',
    name: 'Inversión a Plazo',
    slug: 'inversion-plazo',
    shortDescription: 'Haz crecer tu dinero con tasas competitivas. Seguridad garantizada y rendimientos atractivos.',
    iconName: 'TrendingUp',
    referenceRate: 7.2,
    isFeatured: true,
    ctaLabel: 'Ver detalles'
  },
  {
    id: '3',
    name: 'Ahorro Infantil',
    slug: 'ahorro-infantil',
    shortDescription: 'Construye el futuro de tus hijos desde hoy. Sin costos de mantenimiento y beneficios exclusivos.',
    iconName: 'Baby',
    referenceRate: 4.5,
    isFeatured: true,
    ctaLabel: 'Ver detalles'
  },
];

const defaultCreditProducts = [
  {
    id: '4',
    name: 'Crédito de Consumo',
    slug: 'credito-consumo',
    shortDescription: 'Para lo que necesites. Aprobación rápida, tasas preferenciales y plazos flexibles hasta 5 años.',
    iconName: 'CreditCard',
    referenceRate: 15.5,
    isFeatured: true,
    ctaLabel: 'Ver detalles'
  },
  {
    id: '5',
    name: 'Crédito Hipotecario',
    slug: 'credito-hipotecario',
    shortDescription: 'Tu casa propia está más cerca. Financiamiento hasta el 80% del valor, plazos hasta 20 años.',
    iconName: 'Home',
    referenceRate: 10.2,
    isFeatured: true,
    ctaLabel: 'Ver detalles'
  },
  {
    id: '6',
    name: 'Microcrédito',
    slug: 'microcredito',
    shortDescription: 'Impulsa tu negocio. Montos accesibles, trámites ágiles y acompañamiento personalizado.',
    iconName: 'Store',
    referenceRate: 18.0,
    isFeatured: true,
    ctaLabel: 'Ver detalles'
  },
];

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  iconName: string;
  referenceRate: number;
  isFeatured: boolean;
  ctaLabel: string;
}

interface FeaturedProductsProps {
  savingsProducts?: Product[];
  creditProducts?: Product[];
  savingsTitle?: string;
  savingsSubtitle?: string;
  savingsDescription?: string;
  creditsTitle?: string;
  creditsSubtitle?: string;
  creditsDescription?: string;
}

export function FeaturedProducts({
  savingsProducts = defaultSavingsProducts,
  creditProducts = defaultCreditProducts,
  savingsTitle = 'Productos de Ahorro',
  savingsSubtitle = 'Haz crecer tu dinero',
  savingsDescription = 'Opciones seguras y rentables para cada etapa de tu vida.',
  creditsTitle = 'Líneas de Crédito',
  creditsSubtitle = 'Impulsa tus proyectos',
  creditsDescription = 'Financiamiento oportuno con tasas competitivas y plazos flexibles.',
}: FeaturedProductsProps) {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[#003848] mb-1">{savingsTitle}</p>
              <h2 className="text-3xl font-bold text-gray-900">{savingsSubtitle}</h2>
              <p className="text-gray-500 mt-2">{savingsDescription}</p>
            </div>
            <a href="/ahorros" className="hidden sm:inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-accent h-9 px-4 text-sm font-medium">Ver todos</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savingsProducts.map((product) => (
              <ProductCard key={product.id} product={product} basePath="/ahorros" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[#003848] mb-1">{creditsTitle}</p>
              <h2 className="text-3xl font-bold text-gray-900">{creditsSubtitle}</h2>
              <p className="text-gray-500 mt-2">{creditsDescription}</p>
            </div>
            <a href="/creditos" className="hidden sm:inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-accent h-9 px-4 text-sm font-medium">Ver todos</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creditProducts.map((product) => (
              <ProductCard key={product.id} product={product} basePath="/creditos" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}