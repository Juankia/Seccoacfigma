'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockBranches } from '@/lib/cms/mock-content';

const serviceTypes = [
  'Apertura de cuenta',
  'Solicitud de crédito',
  'Consulta general',
  'Actualización de datos',
  'Certificados',
  'Inversiones',
  'Reclamo',
  'Otros',
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30',
];

export default function TurnosPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [code, setCode] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const randomCode = Math.random().toString(36).slice(2, 10).toUpperCase();
    setCode(randomCode);
    setConfirmed(true);
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Agenda tu visita</p>
          <h1 className="text-4xl font-bold">Turnos en Línea</h1>
          <p className="text-white/80 mt-3 max-w-2xl">
            Reserva tu turno y evita esperas innecesarias. Te atenderemos en el horario seleccionado.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>{confirmed ? 'Turno Confirmado' : 'Reservar Turno'}</CardTitle>
          </CardHeader>
          <CardContent>
            {confirmed ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✅
                </div>
                <h3 className="text-xl font-bold text-gray-900">¡Tu turno ha sido reservado!</h3>
                <div className="bg-[#003848]/5 rounded-xl p-6 inline-block">
                  <p className="text-sm text-gray-500">Código de confirmación</p>
                  <p className="text-3xl font-mono font-bold text-[#003848] mt-1">{code}</p>
                </div>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Presenta este código en la agencia. Recibirás una confirmación por correo electrónico.
                </p>
                <Button onClick={() => setConfirmed(false)} variant="outline">
                  Agendar otro turno
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="turn-name">Nombre completo</Label>
                    <Input id="turn-name" required placeholder="María Elena Cárdenas" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="turn-cedula">Cédula</Label>
                    <Input id="turn-cedula" required placeholder="0102345678" pattern="\d{10}" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="turn-email">Correo electrónico</Label>
                    <Input id="turn-email" type="email" required placeholder="maria@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="turn-phone">Teléfono</Label>
                    <Input id="turn-phone" placeholder="099 123 4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Agencia</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una agencia" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBranches.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Trámite</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el trámite" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="turn-date">Fecha</Label>
                    <Input id="turn-date" type="date" required min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label>Horario</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona hora" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#003848] hover:bg-[#002a36]" size="lg">
                  Confirmar turno
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
