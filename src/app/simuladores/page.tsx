import { CreditSimulator } from '@/components/simulators/CreditSimulator';
import { SavingsSimulator } from '@/components/simulators/SavingsSimulator';

export default function SimuladoresPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Herramientas Financieras</p>
          <h1 className="text-4xl font-bold">Simuladores</h1>
          <p className="text-white/80 mt-3 max-w-2xl">
            Planifica tu crédito o proyecta tu ahorro con nuestras calculadoras financieras.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-8">
        <CreditSimulator />
        <SavingsSimulator />
      </div>
    </div>
  );
}
