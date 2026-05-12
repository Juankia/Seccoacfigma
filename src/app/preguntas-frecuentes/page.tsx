'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { mockFaqs } from '@/lib/cms/mock-content';

export default function FaqsPage() {
  const categories = [...new Set(mockFaqs.map((f) => f.category))];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? mockFaqs.filter((f) => f.category === activeCategory)
    : mockFaqs;

  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Soporte</p>
          <h1 className="text-4xl font-bold">Preguntas Frecuentes</h1>
          <p className="text-white/80 mt-3">Encuentra respuestas a las consultas más comunes.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(null)}
            className={activeCategory === null ? 'bg-[#003848]' : ''}
          >
            Todas
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'bg-[#003848]' : ''}
            >
              {cat}
            </Button>
          ))}
        </div>

        <Accordion className="max-w-3xl">
          {filtered.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left text-gray-900 hover:text-[#003848]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
