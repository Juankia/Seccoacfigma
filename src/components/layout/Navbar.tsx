'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const defaultNavigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Ahorros', href: '/ahorros' },
  { name: 'Créditos', href: '/creditos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Simuladores', href: '/simuladores' },
  { name: 'Encuéntranos', href: '/encuentranos' },
  { name: 'Contacto', href: '/contacto' },
];

interface NavbarProps {
  logo?: string;
  shortName?: string;
  phone?: string;
  email?: string;
  sepsCode?: string;
  primaryColor?: string;
  menuItems?: { name: string; href: string }[];
}

export function Navbar({
  logo = '',
  shortName = 'Raíces del Austro',
  phone = '(07) 283-4567',
  email = 'info@raicesdelaustro.fin.ec',
  sepsCode = 'SEPS-ROEPS-2023-0001234',
  primaryColor = '#166534',
  menuItems,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState('/');
  const initials = shortName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const navigation = menuItems || defaultNavigation;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/98 shadow-lg backdrop-blur-xl' : 'bg-white/95 backdrop-blur-sm'}`}>
      {/* Top bar */}
      <motion.div
        initial={{ height: 'auto' }}
        animate={{ height: scrolled ? 0 : 'auto' }}
        className="hidden lg:block text-white text-xs overflow-hidden"
        style={{ background: primaryColor }}
      >
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5">
              <span className="opacity-70">📞</span> {phone}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="opacity-70">✉️</span> {email}
            </span>
          </div>
          <div className="flex gap-6">
            <a href="/turnos" className="hover:underline transition-all hover:opacity-80">
              Turnos en línea
            </a>
            <a href="/preguntas-frecuentes" className="hover:underline transition-all hover:opacity-80">
              FAQ
            </a>
            <span className="opacity-70">{sepsCode}</span>
          </div>
        </div>
      </motion.div>

      <div className={`border-b transition-all ${scrolled ? 'border-gray-200' : 'border-gray-100'}`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-3 group">
            {logo ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <img src={logo} alt={shortName} className="h-10 w-auto" />
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white font-bold text-lg shadow-lg"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
              >
                {initials}
              </motion.div>
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight transition-colors group-hover:opacity-80" style={{ color: primaryColor }}>
                {shortName}
              </p>
              <p className="text-[10px] text-gray-500 leading-tight">
                Cooperativa de Ahorro y Crédito
              </p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-2 h-16">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 h-full flex items-center text-sm font-semibold transition-all group"
                  style={{
                    color: active ? primaryColor : '#374151',
                  }}
                >
                  <span className="relative z-10 group-hover:scale-105 transition-transform">
                    {item.name}
                  </span>

                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-x-2 inset-y-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `${primaryColor}08` }}
                  />

                  {/* Active underline */}
                  <motion.span
                    className="absolute bottom-0 left-3 right-3 h-1 rounded-t-full"
                    style={{ background: primaryColor }}
                    initial={false}
                    animate={{
                      scaleX: active ? 1 : 0,
                      opacity: active ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <a
                href="/servicios-virtuales"
                className="hidden sm:inline-flex items-center justify-center rounded-xl text-white text-sm font-bold h-10 px-6 transition-all shadow-lg hover:shadow-xl"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
              >
                Banca Virtual
              </a>
            </motion.div>

            <motion.button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
              aria-label="Menú"
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-6 w-6 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t bg-white overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
                {navigation.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="px-4 py-3.5 text-base font-semibold rounded-xl transition-all block"
                        style={{
                          color: active ? primaryColor : '#374151',
                          backgroundColor: active ? `${primaryColor}10` : 'transparent',
                          borderLeft: active ? `4px solid ${primaryColor}` : '4px solid transparent',
                        }}
                      >
                        {item.name}
                      </a>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navigation.length * 0.05 }}
                >
                  <a
                    href="/servicios-virtuales"
                    onClick={() => setOpen(false)}
                    className="mt-3 flex items-center justify-center rounded-xl text-white font-bold h-12 transition-all shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
                  >
                    Banca Virtual
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}