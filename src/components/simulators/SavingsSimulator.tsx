'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimResult {
  totalContributed: number;
  estimatedInterest: number;
  projectedValue: number;
}

export function SavingsSimulator() {
  const [initial, setInitial] = useState(500);
  const [monthly, setMonthly] = useState(100);
  const [term, setTerm] = useState(12);
  const [rate, setRate] = useState(5.5);
  const [result, setResult] = useState<SimResult | null>(null);

  function simulate() {
    const monthlyRate = rate / 100 / 12;
    let projected = initial;

    for (let i = 0; i < term; i++) {
      projected = (projected + monthly) * (1 + monthlyRate);
    }

    const totalContributed = initial + monthly * term;
    const estimatedInterest = projected - totalContributed;

    setResult({
      totalContributed: Math.round(totalContributed * 100) / 100,
      estimatedInterest: Math.round(estimatedInterest * 100) / 100,
      projectedValue: Math.round(projected * 100) / 100,
    });
  }

  const fmt = (n: number) =>
    n.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Simulador de Ahorro</CardTitle>
        <p className="text-sm text-gray-500">Proyecta el crecimiento de tu inversión</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sav-initial">Monto inicial ($)</Label>
            <Input
              id="sav-initial"
              type="number"
              min={0}
              max={1000000}
              value={initial}
              onChange={(e) => setInitial(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sav-monthly">Aporte mensual ($)</Label>
            <Input
              id="sav-monthly"
              type="number"
              min={0}
              max={50000}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sav-term">Plazo (meses)</Label>
            <Input
              id="sav-term"
              type="number"
              min={1}
              max={360}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sav-rate">Tasa anual (%)</Label>
            <Input
              id="sav-rate"
              type="number"
              min={0.1}
              max={20}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
        </div>

        <Button onClick={simulate} className="w-full bg-[#003848] hover:bg-[#002a36]" size="lg">
          Proyectar ahorro
        </Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Capital aportado</p>
              <p className="text-lg font-semibold text-gray-700">{fmt(result.totalContributed)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Interés estimado</p>
              <p className="text-lg font-semibold text-[#003848]">{fmt(result.estimatedInterest)}</p>
            </div>
            <div className="bg-[#003848]/5 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Valor proyectado</p>
              <p className="text-2xl font-bold text-[#003848]">{fmt(result.projectedValue)}</p>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400">
          * Proyección referencial basada en tasa fija estimada. Los rendimientos reales pueden variar.
        </p>
      </CardContent>
    </Card>
  );
}
