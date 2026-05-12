'use client';

import { motion } from 'motion/react';
import { CreditCard, Laptop, Calculator, TrendingUp, FileText, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Créditos', href: '/creditos', Icon: CreditCard, desc: 'Líneas de financiamiento', color: '#10b981' },
  { name: 'Banca Virtual', href: 'https://virtual.coacsec.fin.ec/', Icon: Laptop, desc: 'Accede a tu cuenta', external: true, color: '#3b82f6' },
  { name: 'Calculadora', href: '/simuladores', Icon: Calculator, desc: 'Simula tu crédito', color: '#8b5cf6' },
  { name: 'Inversiones', href: '/ahorros', Icon: TrendingUp, desc: 'Haz crecer tu dinero', color: '#f59e0b' },
  { name: 'Transparencia', href: '/transparencia', Icon: FileText, desc: 'Informes y balances', color: '#06b6d4' },
  { name: 'Encuéntranos', href: '/encuentranos', Icon: MapPin, desc: 'Ubicación y contacto', color: '#ec4899' },
];

export function QuickAccess() {
  return (
    <section className="relative -mt-16 z-20 mb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.Icon;

            if (link.external) {
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-5 flex flex-col items-center text-center gap-3 transition-all border border-gray-100/50 h-full overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{ background: link.color }}
                    />

                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `${link.color}15`,
                        color: link.color
                      }}
                    >
                      <Icon className="w-7 h-7" strokeWidth={2.5} />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-gray-950 transition-colors">
                        {link.name}
                      </p>
                      <p className="text-[11px] text-gray-500 leading-tight">
                        {link.desc}
                      </p>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ background: link.color }}
                    />
                  </a>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href={link.href}
                  className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-5 flex flex-col items-center text-center gap-3 transition-all border border-gray-100/50 h-full overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                    style={{ background: link.color }}
                  />

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `${link.color}15`,
                      color: link.color
                    }}
                  >
                    <Icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-gray-950 transition-colors">
                      {link.name}
                    </p>
                    <p className="text-[11px] text-gray-500 leading-tight">
                      {link.desc}
                    </p>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: link.color }}
                  />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
