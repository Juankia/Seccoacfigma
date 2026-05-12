import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const services = [
  { icon: '💸', title: 'Pagos y Transferencias', desc: 'Realiza pagos de servicios básicos, transferencias interbancarias y envíos de dinero desde cualquier canal.', href: '/servicios-virtuales' },
  { icon: '📱', title: 'Banca Virtual', desc: 'Consulta saldos, movimientos, realiza transferencias y pagos desde la comodidad de tu hogar o dispositivo móvil.', href: '/servicios-virtuales' },
  { icon: '🏧', title: 'Tarjeta de Débito', desc: 'Accede a tu dinero en cajeros automáticos y realiza compras en establecimientos a nivel nacional.', href: '/contacto' },
  { icon: '📋', title: 'Recaudaciones', desc: 'Servicio de recaudación para empresas, instituciones educativas y entidades públicas.', href: '/contacto' },
  { icon: '🤝', title: 'Atención al Socio', desc: 'Equipo de asesores dedicados en todas nuestras agencias. Atención personalizada para cada necesidad.', href: '/encuentranos' },
  { icon: '📧', title: 'Certificados', desc: 'Solicita certificados de cuenta, referencia bancaria y otros documentos en línea o en agencia.', href: '/contacto' },
];

export default function ServiciosPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Para nuestros socios</p>
          <h1 className="text-4xl font-bold">Servicios</h1>
          <p className="text-white/80 mt-3 max-w-2xl">
            Todo lo que necesitas para gestionar tus finanzas de forma fácil y segura.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader>
                <span className="text-3xl mb-2">{service.icon}</span>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
                <Button asChild variant="outline" size="sm">
                  <Link href={service.href}>Más información</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
