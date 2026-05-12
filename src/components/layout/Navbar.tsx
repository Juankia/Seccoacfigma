'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
  const pathname = usePathname();
  const initials = shortName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const navigation = menuItems || defaultNavigation;

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur">
      {/* Top bar */}
      <div className="hidden lg:block text-white text-xs" style={{ background: primaryColor }}>
        <div className="container mx-auto flex justify-between items-center px-4 py-1">
          <div className="flex gap-4">
            <span>{phone}</span>
            <span>{email}</span>
          </div>
          <div className="flex gap-4">
            <Link href="/turnos" className="hover:underline">Turnos en línea</Link>
            <Link href="/preguntas-frecuentes" className="hover:underline">FAQ</Link>
            <span className="opacity-70">{sepsCode}</span>
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            {logo ? (
              <Image src={logo} alt={shortName} width={160} height={40} className="h-10 w-auto" unoptimized />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold text-lg" style={{ background: primaryColor }}>
                {initials}
              </div>
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight" style={{ color: primaryColor }}>
                {shortName}
              </p>
              <p className="text-[10px] text-gray-500 leading-tight">
                Cooperativa de Ahorro y Crédito
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 h-16">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 h-full flex items-center text-sm font-medium transition-colors"
                  style={{
                    color: active ? primaryColor : '#374151',
                  }}
                  onMouseEnter={e => {
                    if (!active) e.currentTarget.style.color = primaryColor;
                  }}
                  onMouseLeave={e => {
                    if (!active) e.currentTarget.style.color = '#374151';
                  }}
                >
                  {item.name}
                  {/* Active underline */}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[3px] rounded-t-full transition-transform duration-200"
                    style={{
                      background: primaryColor,
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/servicios-virtuales"
              className="hidden sm:inline-flex items-center justify-center rounded-full text-white text-sm font-medium h-9 px-5 transition-colors"
              style={{ background: primaryColor }}
            >
              Banca Virtual
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Menú"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-base font-medium rounded-md transition-colors"
                    style={{
                      color: active ? primaryColor : '#374151',
                      backgroundColor: active ? `${primaryColor}10` : 'transparent',
                      borderLeft: active ? `3px solid ${primaryColor}` : '3px solid transparent',
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/servicios-virtuales"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center rounded-full text-white font-medium h-11 transition-colors"
                style={{ background: primaryColor }}
              >
                Banca Virtual
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
