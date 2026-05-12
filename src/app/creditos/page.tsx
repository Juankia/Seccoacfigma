import { ProductCard } from '@/components/products/ProductCard';
import { mockCreditProducts } from '@/lib/cms/mock-content';
import { getCreditProducts } from '@/lib/cms/wordpress-client';

export const revalidate = 60;

export default async function CreditosPage() {
  const wpProducts = await getCreditProducts();
  const products = wpProducts || mockCreditProducts;

  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Líneas de Crédito</p>
          <h1 className="text-4xl font-bold">Financiamiento para tus proyectos</h1>
          <p className="text-white/80 mt-3 max-w-2xl">
            Tasas competitivas, plazos flexibles y aprobación ágil. Encuentra la línea de crédito ideal para ti.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} basePath="/creditos" />
          ))}
        </div>
      </div>
    </div>
  );
}
