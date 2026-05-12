import { Hero } from '../components/home/Hero';
import { QuickAccess } from '../components/home/QuickAccess';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { Benefits } from '../components/home/Benefits';
import { CtaBanner } from '../components/home/CtaBanner';
import { Navbar } from '../components/layout/Navbar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        shortName="SEC COAC"
        phone="(07) 283-4567"
        email="info@seccoac.fin.ec"
        sepsCode="SEPS-ROEPS-2023-0001234"
        primaryColor="#166534"
      />
      <main className="flex-1">
        <Hero
          title="Tu cooperativa, tu confianza"
          subtitle="Más de 25 años construyendo sueños con nuestra comunidad. Ahorro seguro, crédito oportuno y servicio cercano."
          ctaText="Hazte socio"
          ctaUrl="/nosotros"
          primaryColor="#166534"
        />
        <QuickAccess />
        <FeaturedProducts />
        <Benefits />
        <CtaBanner />
      </main>
    </div>
  );
}
