import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

const iconMap: Record<string, string> = {
  Wallet: '💰', PiggyBank: '🐷', Baby: '👶', TrendingUp: '📈',
  CreditCard: '💳', Store: '🏪', Home: '🏠', Sprout: '🌱', Repeat: '🔄',
};

function getIcon(value: string): string {
  if (!value) return '📋';
  // If it's already an emoji (not ASCII), return as-is
  if (/\p{Emoji}/u.test(value) && !/^[a-zA-Z]+$/.test(value)) return value;
  // Otherwise map from name
  return iconMap[value] || '📋';
}

interface ProductCardProps {
  product: Product;
  basePath: string;
}

export function ProductCard({ product, basePath }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all hover:-translate-y-0.5 border-gray-100 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#003848]/5 flex items-center justify-center text-[#003848] text-2xl mb-3">
            {getIcon(product.iconName)}
          </div>
          {product.isFeatured && (
            <Badge className="bg-[#ca9f43]/15 text-[#003848] hover:bg-[#ca9f43]/20">
              Destacado
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg text-gray-900">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 leading-relaxed">
          {product.shortDescription}
        </p>
        {product.referenceRate > 0 && (
          <div className="mt-4 p-3 bg-[#003848]/5 rounded-lg">
            <p className="text-xs text-gray-500">Tasa referencial</p>
            <p className="text-xl font-bold text-[#003848]">
              {product.referenceRate}% <span className="text-xs font-normal text-gray-500">anual</span>
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-[#003848] hover:bg-[#002a36]">
          <Link href={`${basePath}/${product.slug}`}>
            {product.ctaLabel || 'Ver detalles'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
