import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import { mockSavingsProducts, mockCreditProducts } from '@/lib/cms/mock-content';
import { getSavingsProducts, getCreditProducts } from '@/lib/cms/wordpress-client';

export async function FeaturedProducts() {
  const wpSavings = await getSavingsProducts();
  const wpCredits = await getCreditProducts();

  const savings = wpSavings || mockSavingsProducts;
  const credits = wpCredits || mockCreditProducts;

  const featuredSavings = savings.filter((p) => p.isFeatured);
  const featuredCredits = credits.filter((p) => p.isFeatured);

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[#003848] mb-1">Productos de Ahorro</p>
              <h2 className="text-3xl font-bold text-gray-900">Haz crecer tu dinero</h2>
              <p className="text-gray-500 mt-2">Opciones seguras y rentables para cada etapa de tu vida.</p>
            </div>
            <Link href="/ahorros" className="hidden sm:inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-accent h-9 px-4 text-sm font-medium">Ver todos</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSavings.map((product) => (
              <ProductCard key={product.id} product={product} basePath="/ahorros" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[#003848] mb-1">Líneas de Crédito</p>
              <h2 className="text-3xl font-bold text-gray-900">Impulsa tus proyectos</h2>
              <p className="text-gray-500 mt-2">Financiamiento oportuno con tasas competitivas y plazos flexibles.</p>
            </div>
            <Link href="/creditos" className="hidden sm:inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-accent h-9 px-4 text-sm font-medium">Ver todos</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCredits.map((product) => (
              <ProductCard key={product.id} product={product} basePath="/creditos" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
