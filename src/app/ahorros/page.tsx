import { ProductCard } from '@/components/products/ProductCard';
import { mockSavingsProducts } from '@/lib/cms/mock-content';
import { getSavingsProducts } from '@/lib/cms/wordpress-client';

export const revalidate = 60;

export default async function AhorrosPage() {
  const wpProducts = await getSavingsProducts();
  const products = wpProducts || mockSavingsProducts;

  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Productos de Ahorro</p>
          <h1 className="text-4xl font-bold">Haz crecer tu dinero con seguridad</h1>
          <p className="text-white/80 mt-3 max-w-2xl">
            Opciones de ahorro seguras, rentables y respaldadas por COSEDE. Elige la que mejor se adapte a tus metas.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} basePath="/ahorros" />
          ))}
        </div>
      </div>
    </div>
  );
}
