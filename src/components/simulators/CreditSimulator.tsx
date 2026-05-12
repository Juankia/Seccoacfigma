'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

export function CreditSimulator() {
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(15.5);
  const [term, setTerm] = useState(24);
  const [result, setResult] = useState<SimResult | null>(null);

  function simulate() {
    const monthlyRate = rate / 100 / 12;
    let monthlyPayment: number;

    if (monthlyRate === 0) {
      monthlyPayment = amount / term;
    } else {
      monthlyPayment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1);
    }

    const totalAmount = monthlyPayment * term;
    const totalInterest = totalAmount - amount;

    setResult({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    });
  }

  const fmt = (n: number) =>
    n.toLocaleString('es-EC', { style: 'currency', currency: 'USD' });

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Simulador de Crédito</CardTitle>
        <p className="text-sm text-gray-500">Calcula tu cuota mensual estimada</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="credit-amount">Monto ($)</Label>
            <Input
              id="credit-amount"
              type="number"
              min={100}
              max={500000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-green-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credit-rate">Tasa anual (%)</Label>
            <Input
              id="credit-rate"
              type="number"
              min={0.1}
              max={50}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credit-term">Plazo (meses)</Label>
            <Input
              id="credit-term"
              type="number"
              min={1}
              max={360}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
            />
            <input
              type="range"
              min={3}
              max={72}
              step={3}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full accent-green-800"
            />
          </div>
        </div>

        <Button onClick={simulate} className="w-full bg-[#003848] hover:bg-[#002a36]" size="lg">
          Calcular cuota
        </Button>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
            <div className="bg-[#003848]/5 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Cuota mensual</p>
              <p className="text-2xl font-bold text-[#003848]">{fmt(result.monthlyPayment)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Interés total</p>
              <p className="text-lg font-semibold text-gray-700">{fmt(result.totalInterest)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Total a pagar</p>
              <p className="text-lg font-semibold text-gray-700">{fmt(result.totalAmount)}</p>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400">
          * Esta simulación es referencial. Las condiciones finales dependerán del
          análisis crediticio y las políticas vigentes. Tasa sujeta a variación.
        </p>
      </CardContent>
    </Card>
  );
}
