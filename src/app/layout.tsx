import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavbarWrapper } from '@/components/layout/NavbarWrapper';
import { FooterWrapper } from '@/components/layout/FooterWrapper';
import { VoiceAssistant } from '@/components/accessibility/VoiceAssistant';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Raíces del Austro | Cooperativa de Ahorro y Crédito',
  description:
    'Cooperativa de Ahorro y Crédito Raíces del Austro — Ahorro seguro, crédito oportuno y servicio cercano en Cuenca, Ecuador.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <NavbarWrapper />
        <main id="main" className="flex-1">{children}</main>
        <FooterWrapper />
        <VoiceAssistant />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var s = document.createElement('script');
                s.src = '${process.env.NEXT_PUBLIC_WIDGET_URL || 'https://cmswebdemo.skillsoft.ec/widget.js'}';
                s.async = true;
                s.onload = function() {
                  if (window.CoopBot) {
                    window.CoopBot.init({
                      tenantId: '${process.env.NEXT_PUBLIC_TENANT_ID || 'coop-demo'}',
                      apiUrl: '${process.env.NEXT_PUBLIC_API_URL || 'https://cmswebdemo.skillsoft.ec/api/v1'}',
                      primaryColor: '#166534',
                      secondaryColor: '#f0fdf4',
                      welcomeMessage: 'Hola, soy tu asistente virtual. ¿En qué puedo ayudarte?',
                      position: 'bottom-right'
                    });
                  }
                };
                document.body.appendChild(s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
