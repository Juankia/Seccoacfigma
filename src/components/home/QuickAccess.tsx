import Link from 'next/link';

const quickLinks = [
  { name: 'Créditos', href: '/creditos', icon: '💳', desc: 'Líneas de financiamiento' },
  { name: 'Banca Virtual', href: 'https://virtual.coacsec.fin.ec/', icon: '🏦', desc: 'Accede a tu cuenta', external: true },
  { name: 'Calculadora', href: '/simuladores', icon: '📊', desc: 'Simula tu crédito' },
  { name: 'Inversiones', href: '/ahorros', icon: '📈', desc: 'Haz crecer tu dinero' },
  { name: 'Transparencia', href: '/transparencia', icon: '🔍', desc: 'Informes y balances' },
  { name: 'Encuéntranos', href: '/encuentranos', icon: '📍', desc: 'Ubicación y contacto' },
];

export function QuickAccess() {
  return (
    <section className="relative -mt-8 z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => {
            const Component = link.external ? 'a' : Link;
            const extraProps = link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Component
                key={link.name}
                href={link.href}
                {...extraProps}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl p-4 flex flex-col items-center text-center gap-2 transition-all hover:-translate-y-0.5 border border-gray-100"
              >
                <span className="text-2xl">{link.icon}</span>
                <p className="font-semibold text-gray-900 text-sm">{link.name}</p>
                <p className="text-[11px] text-gray-500">{link.desc}</p>
              </Component>
            );
          })}
        </div>
      </div>
    </section>
  );
}
