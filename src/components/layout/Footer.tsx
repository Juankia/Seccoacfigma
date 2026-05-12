import Link from 'next/link';

interface FooterProps {
  shortName?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  footerText?: string;
  socialLinks?: Record<string, string>;
  primaryColor?: string;
}

export function Footer({
  shortName = 'Raíces del Austro',
  phone = '(07) 283-4567',
  email = 'info@raicesdelaustro.fin.ec',
  whatsapp = '+593 99 888 7766',
  address = 'Bolívar 7-89 y Borrero, Centro Histórico, Cuenca',
  footerText = 'Regulada por la SEPS',
  socialLinks = {},
  primaryColor = '#166534',
}: FooterProps) {
  const initials = shortName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold" style={{ background: primaryColor }}>
                {initials}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{shortName}</p>
                <p className="text-[10px] text-gray-400">Cooperativa de Ahorro y Crédito</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{address}</p>
            <p className="text-sm text-gray-400 mt-1">{phone}</p>
            <p className="text-sm text-gray-400">{email}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ahorros" className="hover:text-green-400 transition-colors">Ahorros</Link></li>
              <li><Link href="/creditos" className="hover:text-green-400 transition-colors">Créditos</Link></li>
              <li><Link href="/simuladores" className="hover:text-green-400 transition-colors">Simuladores</Link></li>
              <li><Link href="/servicios" className="hover:text-green-400 transition-colors">Servicios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Institución</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/nosotros" className="hover:text-green-400 transition-colors">Nosotros</Link></li>
              <li><Link href="/encuentranos" className="hover:text-green-400 transition-colors">Agencias</Link></li>
              <li><Link href="/preguntas-frecuentes" className="hover:text-green-400 transition-colors">Preguntas frecuentes</Link></li>
              <li><Link href="/contacto" className="hover:text-green-400 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Canales Digitales</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/servicios-virtuales" className="hover:text-green-400 transition-colors">Banca Virtual</Link></li>
              <li><Link href="/turnos" className="hover:text-green-400 transition-colors">Turnos en Línea</Link></li>
              {whatsapp && (
                <li>
                  <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} className="hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </li>
              )}
            </ul>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex gap-3 mt-4">
                {Object.entries(socialLinks).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                    <span className="capitalize text-xs">{key}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">{footerText}</p>
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
