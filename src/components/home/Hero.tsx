'use client';

import { motion } from 'motion/react';
import { ArrowRight, Shield, TrendingUp } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  primaryColor?: string;
  heroImage?: string;
  stats?: Array<{ number: string; label: string }>;
}

export function Hero({
  title = 'Tu cooperativa, tu confianza',
  subtitle = 'Más de 25 años construyendo sueños con nuestra comunidad. Ahorro seguro, crédito oportuno y servicio cercano.',
  ctaText = 'Hazte socio',
  ctaUrl = '/nosotros',
  primaryColor = '#166534',
  heroImage = '',
  stats = [
    { number: '45,000+', label: 'Socios activos' },
    { number: '25+', label: 'Años de servicio' },
    { number: '5', label: 'Agencias en Cuenca' },
    { number: 'A+', label: 'Calificación de riesgo' },
  ],
}: HeroProps) {
  return (
    <section
      className="relative text-white overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center"
      style={{
        background: heroImage
          ? `linear-gradient(135deg, ${primaryColor}f5, ${primaryColor}e0), url(${heroImage}) center/cover`
          : `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}f0 50%, ${primaryColor}e5 100%)`,
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 30%)
          `,
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <motion.div
          className="max-w-4xl"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm mb-8 backdrop-blur-sm border border-white/20"
            style={{ background: `${primaryColor}40` }}
          >
            <Shield className="w-4 h-4 text-green-300" />
            <span className="font-medium">Regulados por la SEPS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 max-w-3xl font-light"
            style={{ color: 'rgba(255,255,255,0.92)' }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href={ctaUrl}
              className="group inline-flex items-center justify-center rounded-xl bg-white font-semibold h-14 px-8 text-base transition-all hover:scale-105 hover:shadow-2xl active:scale-100 gap-2"
              style={{ color: primaryColor }}
            >
              {ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/simuladores"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm h-14 px-8 text-base font-semibold transition-all hover:border-white/60 gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Simular crédito
            </a>
          </motion.div>

          {stats.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-8 border-t border-white/25"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="group"
                >
                  <p className="text-3xl lg:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform">{stat.number}</p>
                  <p className="text-sm lg:text-base font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
