import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const virtualServices = [
  { icon: '🏦', title: 'Banca Virtual Web', desc: 'Accede a tus cuentas, consulta saldos, realiza transferencias y pagos desde cualquier navegador.', cta: 'Ingresar', note: 'Requiere registro previo en agencia' },
  { icon: '📱', title: 'App Móvil', desc: 'Descarga nuestra aplicación para iOS y Android. Lleva tu cooperativa en el bolsillo.', cta: 'Descargar', note: 'Disponible en App Store y Google Play' },
  { icon: '🔐', title: 'Recuperación de Acceso', desc: 'Si olvidaste tu contraseña o tu usuario está bloqueado, solicita la recuperación aquí.', cta: 'Recuperar acceso', note: 'Necesitarás tu cédula y correo registrado' },
  { icon: '💳', title: 'Pagos en Línea', desc: 'Paga servicios básicos, recargas, pensiones y más desde la banca virtual o la app.', cta: 'Pagar ahora', note: 'Agua, luz, teléfono, internet y más' },
  { icon: '🛡️', title: 'Seguridad Digital', desc: 'Protege tu cuenta con autenticación de doble factor, alertas por correo y notificaciones push.', cta: 'Configurar seguridad', note: 'Recomendamos activar todas las protecciones' },
];

export default function ServiciosVirtualesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Canales Digitales</p>
          <h1 className="text-4xl font-bold">Servicios Virtuales</h1>
          <p className="text-white/80 mt-3 max-w-2xl">
            Gestiona tus finanzas sin salir de casa. Disponibles las 24 horas, los 7 días de la semana.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {virtualServices.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-3xl mb-2">{service.icon}</span>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">{service.desc}</p>
                <p className="text-xs text-gray-400">{service.note}</p>
                <Button className="w-full bg-[#003848] hover:bg-[#002a36]">
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
