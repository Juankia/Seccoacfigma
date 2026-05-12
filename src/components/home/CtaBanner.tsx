'use client';

import { motion } from 'motion/react';
import { MessageCircle, MapPin, ArrowRight } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="relative py-20 lg:py-28 text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #003848 0%, #004d61 50%, #466ca5 100%)' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)
          `,
        }} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm mb-6 backdrop-blur-sm border border-white/20 bg-white/10">
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">Estamos aquí para ayudarte</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            ¿Necesitas asesoría personalizada?
          </h2>
          <p className="text-lg lg:text-xl mb-10 max-w-2xl mx-auto font-light" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Nuestro equipo de asesores está listo para ayudarte a elegir el producto
            financiero que mejor se adapte a tus necesidades.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <a
                href="/contacto"
                className="group inline-flex items-center justify-center rounded-xl font-bold h-14 px-8 text-base transition-all shadow-xl hover:shadow-2xl gap-2"
                style={{ background: '#ca9f43', color: '#003848' }}
              >
                <MessageCircle className="w-5 h-5" />
                Contáctanos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <a
                href="/encuentranos"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm h-14 px-8 text-base font-semibold transition-all gap-2"
              >
                <MapPin className="w-5 h-5" />
                Encuéntranos
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
