'use client';

import { motion } from 'motion/react';
import { Shield, Smartphone, HeartHandshake, TrendingUp, Zap, Sprout } from 'lucide-react';

const benefits = [
  { Icon: Shield, title: 'Seguridad garantizada', desc: 'Regulados por la SEPS. Tus depósitos protegidos por COSEDE.', color: '#10b981' },
  { Icon: Smartphone, title: 'Banca Virtual 24/7', desc: 'Accede a tus cuentas, realiza transferencias y pagos desde cualquier lugar.', color: '#3b82f6' },
  { Icon: HeartHandshake, title: 'Atención personalizada', desc: 'Asesores dedicados a tu bienestar financiero en nuestra oficina de Cuenca.', color: '#ec4899' },
  { Icon: TrendingUp, title: 'Tasas competitivas', desc: 'Las mejores tasas del mercado tanto para ahorro como para crédito.', color: '#f59e0b' },
  { Icon: Zap, title: 'Créditos ágiles', desc: 'Aprobación rápida. Requisitos claros y procesos simplificados.', color: '#8b5cf6' },
  { Icon: Sprout, title: 'Impacto social', desc: 'Tu ahorro impulsa el desarrollo solidario de la comunidad.', color: '#22c55e' },
];

export function Benefits() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold mb-2 tracking-wide uppercase" style={{ color: '#ca9f43' }}>
            ¿Por qué elegirnos?
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tu confianza, nuestra prioridad
          </h2>
          <div className="w-16 h-1.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #ca9f43, #d4af69)' }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.Icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white p-6 lg:p-8 rounded-2xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: benefit.color }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${benefit.color}15`,
                    color: benefit.color
                  }}
                >
                  <Icon className="w-7 h-7" strokeWidth={2.5} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-950 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: benefit.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
