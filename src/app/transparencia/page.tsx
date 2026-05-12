import type { Metadata } from 'next';
import { getTransparencyDocs } from '@/lib/cms/wordpress-client';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Transparencia | COAC SEC',
  description:
    'Documentos de transparencia financiera y rendición de cuentas de la Cooperativa de Ahorro y Crédito SEC.',
};

interface TransparencyDoc {
  id: string;
  icon: string;
  title: string;
  year: number;
  period: string;
  pdfUrl: string;
  downloadable: boolean;
}

const MOCK_DOCS: TransparencyDoc[] = [
  {
    id: 'balance-social-2024',
    icon: '📊',
    title: 'Balance Social Cooperativo',
    year: 2024,
    period: 'Enero - Diciembre 2024',
    pdfUrl: '/docs/balance-social-2024.pdf',
    downloadable: true,
  },
  {
    id: 'balance-general-2024',
    icon: '📈',
    title: 'Balance General y Resultados',
    year: 2024,
    period: 'Enero - Diciembre 2024',
    pdfUrl: '/docs/balance-general-2024.pdf',
    downloadable: true,
  },
  {
    id: 'auditoria-externa-2024',
    icon: '🔍',
    title: 'Informe de Auditoría Externa',
    year: 2024,
    period: 'Enero - Diciembre 2024',
    pdfUrl: '/docs/auditoria-externa-2024.pdf',
    downloadable: false,
  },
  {
    id: 'distribucion-excedentes-2024',
    icon: '💰',
    title: 'Distribución de Excedentes',
    year: 2024,
    period: 'Enero - Diciembre 2024',
    pdfUrl: '/docs/distribucion-excedentes-2024.pdf',
    downloadable: false,
  },
  {
    id: 'indicadores-financieros-2024',
    icon: '📋',
    title: 'Indicadores Financieros',
    year: 2024,
    period: 'Enero - Diciembre 2024',
    pdfUrl: '/docs/indicadores-financieros-2024.pdf',
    downloadable: true,
  },
];

export default async function TransparenciaPage() {
  let docs: TransparencyDoc[] = MOCK_DOCS;

  try {
    const cmsDocs = await getTransparencyDocs();
    if (cmsDocs && Array.isArray(cmsDocs) && cmsDocs.length > 0) {
      docs = cmsDocs.map((d) => ({
        id: d.id,
        icon: d.icon || '📄',
        title: d.title,
        year: Number(d.year) || 2024,
        period: d.period || 'Enero - Diciembre 2024',
        pdfUrl: d.pdfUrl || '#',
        downloadable: d.allowDownload,
      }));
    }
  } catch {
    // CMS unavailable — use mock data
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #003848 0%, #004d61 100%)',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-teal-200 mb-3">
            Rendición de cuentas
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transparencia
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-teal-100 leading-relaxed">
            Cumplimos con nuestro compromiso de informar a nuestros socios y a la
            comunidad sobre la gestión financiera y social de la cooperativa.
          </p>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="block w-full"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 60L1440 60L1440 0C1200 50 960 30 720 40C480 50 240 20 0 40L0 60Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Documents grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Documentos públicos
          </h2>
          <p className="text-gray-500 mb-10">
            Consulte los informes financieros, balances y reportes de auditoría
            correspondientes al ejercicio fiscal vigente.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <article
                key={doc.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Card header */}
                <div
                  className="px-6 pt-6 pb-4 flex items-start gap-4"
                >
                  <span
                    className="flex-shrink-0 text-3xl w-12 h-12 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: '#003848', color: '#fff', fontSize: '1.5rem' }}
                    aria-hidden="true"
                  >
                    {doc.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                      {doc.title}
                    </h3>
                    <span
                      className="inline-block mt-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: '#ca9f4320', color: '#8b6914' }}
                    >
                      {doc.year}
                    </span>
                  </div>
                </div>

                {/* Period */}
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-400">{doc.period}</p>
                </div>

                {/* Divider */}
                <div className="mt-auto border-t border-gray-100" />

                {/* Actions */}
                <div className="px-6 py-4 flex items-center gap-3">
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
                    style={{
                      backgroundColor: '#003848',
                      color: '#ffffff',
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Ver documento
                  </a>

                  {doc.downloadable && (
                    <a
                      href={doc.pdfUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium rounded-lg px-4 py-2.5 border transition-colors"
                      style={{
                        borderColor: '#ca9f43',
                        color: '#8b6914',
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                        />
                      </svg>
                      Descargar
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory footer */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-2xl px-8 py-6 text-center"
            style={{ backgroundColor: '#00384810' }}
          >
            <p className="text-sm text-gray-500">
              La información publicada cumple con las disposiciones de la
              Superintendencia de Economía Popular y Solidaria (SEPS) y la Junta
              de Política y Regulación Financiera.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
