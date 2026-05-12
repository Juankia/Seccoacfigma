'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, PiggyBank, Baby, TrendingUp, CreditCard, Store, Home, Sprout, Repeat, FileText, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

const iconMap: Record<string, LucideIcon> = {
  Wallet, PiggyBank, Baby, TrendingUp,
  CreditCard, Store, Home, Sprout, Repeat,
};

function getIcon(value: string): LucideIcon {
  if (!value) return FileText;
  return iconMap[value] || FileText;
}

interface ProductCardProps {
  product: Product;
  basePath: string;
}

export function ProductCard({ product, basePath }: ProductCardProps) {
  const Icon = getIcon(product.iconName);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group hover:shadow-2xl transition-all border border-gray-100 h-full flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#003848]/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="pb-4 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003848]/10 to-[#003848]/5 flex items-center justify-center text-[#003848] transition-all group-hover:scale-110 group-hover:rotate-3">
              <Icon className="w-7 h-7" strokeWidth={2.5} />
            </div>
            {product.isFeatured && (
              <Badge className="bg-gradient-to-r from-[#ca9f43] to-[#d4af69] text-white border-0 shadow-lg">
                ⭐ Destacado
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl text-gray-900 group-hover:text-[#003848] transition-colors leading-tight">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 relative">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {product.shortDescription}
          </p>
          {product.referenceRate > 0 && (
            <div className="mt-auto p-4 bg-gradient-to-br from-[#003848]/8 to-[#003848]/5 rounded-xl border border-[#003848]/10">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Tasa referencial
              </p>
              <p className="text-2xl font-bold text-[#003848]">
                {product.referenceRate}%{' '}
                <span className="text-sm font-normal text-gray-500">anual</span>
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="relative">
          <Button
            asChild
            className="w-full bg-[#003848] hover:bg-[#002a36] h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all group/btn"
          >
            <a href={`${basePath}/${product.slug}`} className="gap-2 flex items-center justify-center">
              {product.ctaLabel || 'Ver detalles'}
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
