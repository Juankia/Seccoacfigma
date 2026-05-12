import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSavingsProducts } from '@/lib/cms/mock-content';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AhorroDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = mockSavingsProducts.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/ahorros" className="text-sm text-white/70 hover:underline mb-2 inline-block">
            ← Todos los ahorros
          </Link>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.referenceRate > 0 && (
            <Badge className="mt-3 bg-[#003848] text-white text-lg px-3 py-1">
              {product.referenceRate}% anual
            </Badge>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Beneficios</h2>
              <ul className="space-y-2">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#003848] mt-0.5">✓</span>
                    <span className="text-gray-600">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#003848]/5 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Requisitos</h3>
              <ul className="space-y-2">
                {product.requirements.map((r, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-[#003848]">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="w-full bg-[#003848] hover:bg-[#002a36]" size="lg">
              <Link href="/contacto">{product.ctaLabel}</Link>
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/simuladores">Simular ahorro</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
