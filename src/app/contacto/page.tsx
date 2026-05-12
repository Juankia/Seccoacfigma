'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_BRANDING } from '@/lib/constants/branding';

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Comunícate con nosotros</p>
          <h1 className="text-4xl font-bold">Contacto</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <p className="text-2xl mb-2">✅</p>
                    <h3 className="text-lg font-bold text-gray-900">Mensaje enviado</h3>
                    <p className="text-gray-500 mt-2">
                      Gracias por contactarnos. Un asesor se comunicará contigo pronto.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" required placeholder="Juan Pérez" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" required placeholder="juan@email.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" placeholder="099 123 4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Asunto</Label>
                        <Input id="subject" placeholder="Consulta sobre créditos" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea id="message" rows={5} required placeholder="Escribe tu consulta..." />
                    </div>
                    <Button type="submit" className="w-full bg-[#003848] hover:bg-[#002a36]" size="lg">
                      Enviar mensaje
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="font-semibold text-gray-900">Dirección</p>
                  <p className="text-sm text-gray-600">{DEFAULT_BRANDING.address}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Teléfono</p>
                  <p className="text-sm text-gray-600">{DEFAULT_BRANDING.phone}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-600">{DEFAULT_BRANDING.whatsapp}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Correo</p>
                  <p className="text-sm text-gray-600">{DEFAULT_BRANDING.email}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#003848]/5 border-green-100">
              <CardContent className="pt-6">
                <p className="font-semibold text-[#003848]">Horario de atención</p>
                <p className="text-sm text-gray-600 mt-1">Lunes a Viernes: 8:30 - 17:00</p>
                <p className="text-sm text-gray-600">Sábados: 9:00 - 13:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
