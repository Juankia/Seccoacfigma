import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockCreditProducts } from '@/lib/cms/mock-content';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CreditoDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = mockCreditProducts.find((p) => p.slug === slug);

  if (!product) return notFound();

  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/creditos" className="text-sm text-white/70 hover:underline mb-2 inline-block">
            ← Todos los créditos
          </Link>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex gap-3 mt-3">
            <Badge className="bg-[#003848] text-white">Desde {product.referenceRate}% anual</Badge>
            {product.maxAmount && (
              <Badge variant="outline" className="text-white/80 border-green-400">
                Hasta ${product.maxAmount.toLocaleString()}
              </Badge>
            )}
          </div>
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

            {product.minTerm && product.maxTerm && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Condiciones</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Monto</p>
                    <p className="font-semibold">${product.minAmount?.toLocaleString()} - ${product.maxAmount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Plazo</p>
                    <p className="font-semibold">{product.minTerm} - {product.maxTerm} meses</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tasa referencial</p>
                    <p className="font-semibold">{product.referenceRate}% anual</p>
                  </div>
                </div>
              </div>
            )}
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
              <Link href="/simuladores">Simular crédito</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
