import { getNormativaDocs, type DocItem } from '@/lib/cms/wordpress-client';

export const revalidate = 60;

const MOCK_NORMATIVA: DocItem[] = [
  {
    id: '1',
    title: 'Estatuto',
    content:
      'En Asamblea General de fecha 15 de diciembre de 2021, aprobó su estatuto social, el cual fue aprobado por la Superintendencia de Economía Popular y Solidaria mediante Resolución No. SEPS-IGT-IGJ-IFMR-DNLQSF-2022-0001.',
    pdfUrl: '/docs/estatuto.pdf',
    year: '2021',
    period: '',
    allowDownload: true,
    icon: '\uD83D\uDCDC',
    sortOrder: 1,
  },
  {
    id: '2',
    title: 'Reglamento Interno',
    content:
      'Las reformas al Reglamento Interno de la Cooperativa fueron analizadas y aprobadas por el Consejo de Administración, estableciendo las normas que regulan el funcionamiento interno de la institución.',
    pdfUrl: '/docs/reglamento-interno.pdf',
    year: '2022',
    period: '',
    allowDownload: true,
    icon: '\uD83D\uDCD1',
    sortOrder: 2,
  },
  {
    id: '3',
    title: 'Código de Ética',
    content:
      'Fomentar una cultura corporativa que oriente y dirija permanentemente el actuar de los directivos, administradores y colaboradores de la Cooperativa hacia la excelencia, transparencia y responsabilidad social.',
    pdfUrl: '/docs/codigo-etica.pdf',
    year: '2023',
    period: '',
    allowDownload: true,
    icon: '\u2696\uFE0F',
    sortOrder: 3,
  },
  {
    id: '4',
    title: 'Buen Gobierno',
    content:
      'El buen gobierno corporativo es esencial para el correcto funcionamiento de la Cooperativa, garantizando la transparencia, equidad y rendición de cuentas ante los socios y organismos de control.',
    pdfUrl: '/docs/buen-gobierno.pdf',
    year: '2023',
    period: '',
    allowDownload: true,
    icon: '\uD83C\uDFDB\uFE0F',
    sortOrder: 4,
  },
  {
    id: '5',
    title: 'Manual de Balance Social',
    content:
      'Este manual tiene alcance sobre los grupos de interés de la Cooperativa, permitiendo medir y evaluar el impacto social, económico y ambiental de la gestión institucional.',
    pdfUrl: '/docs/balance-social.pdf',
    year: '2024',
    period: '',
    allowDownload: true,
    icon: '\uD83D\uDCCA',
    sortOrder: 5,
  },
];

export default async function NormativaPage() {
  let docs: DocItem[] = MOCK_NORMATIVA;

  try {
    const cmsDocs = await getNormativaDocs();
    if (cmsDocs && cmsDocs.length > 0) {
      docs = cmsDocs.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  } catch {
    // CMS unavailable — use mock data
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #003848 0%, #004d61 100%)',
        }}
      >
        <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-5" />
        <div className="container relative mx-auto px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ca9f43]">
            Marco Regulatorio
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Normativa</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Conoce el marco normativo y regulatorio que rige el funcionamiento de
            nuestra cooperativa, garantizando transparencia y seguridad para
            nuestros socios.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sidebar - category list */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Documentos
              </p>
              {docs.map((doc) => (
                <a
                  key={doc.id}
                  href={`#doc-${doc.id}`}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[#003848]/5 hover:text-[#003848]"
                >
                  <span className="text-lg">{doc.icon}</span>
                  {doc.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content - document cards */}
          <div className="space-y-6">
            {docs.map((doc) => (
              <article
                key={doc.id}
                id={`doc-${doc.id}`}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#003848]/5 text-3xl">
                    {doc.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#003848]">
                      {doc.title}
                    </h2>
                    {doc.year && (
                      <span className="mt-1 inline-block rounded-full bg-[#ca9f43]/10 px-3 py-0.5 text-xs font-semibold text-[#ca9f43]">
                        {doc.year}
                      </span>
                    )}
                    <p className="mt-3 leading-relaxed text-gray-600">
                      {doc.content.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="shrink-0 sm:self-center">
                    <a
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#003848] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#004d61]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                      </svg>
                      Ver documento
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="border-t border-gray-100 bg-gray-50 py-10 text-center">
        <p className="text-sm text-gray-500">
          Entidad regulada por la Superintendencia de Economía Popular y
          Solidaria (SEPS). Todos los documentos normativos se encuentran
          actualizados conforme a la legislación vigente.
        </p>
      </section>
    </div>
  );
}
