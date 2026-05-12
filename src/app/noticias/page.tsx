import type { Metadata } from 'next';
import { getNoticias } from '@/lib/cms/wordpress-client';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Noticias | COAC SEC',
  description:
    'Noticias, comunicados y novedades de la Cooperativa de Ahorro y Crédito SEC.',
};

interface Noticia {
  id: string;
  title: string;
  slug: string;
  date: string;
  dateLabel: string;
  summary: string;
  featuredImage: string;
}

const MOCK_NOTICIAS: Noticia[] = [
  {
    id: '1',
    title: 'Oferta Laboral - Administrador de Riesgos',
    slug: 'oferta-laboral-administrador-riesgos',
    date: '2024-10-15',
    dateLabel: 'Oct 2024',
    summary:
      'Buscamos profesional con título en carreras financieras, experiencia en gestión de riesgos y conocimiento del sistema financiero popular y solidario.',
    featuredImage: '',
  },
  {
    id: '2',
    title: 'Cronograma del Proceso Electoral 2022',
    slug: 'cronograma-proceso-electoral-2022',
    date: '2022-07-20',
    dateLabel: 'Jul 2022',
    summary:
      'Informamos a todos nuestros socios el cronograma oficial del proceso electoral para la renovación de los consejos de administración y vigilancia.',
    featuredImage: '',
  },
  {
    id: '3',
    title: 'Convocatoria a Elecciones 2022',
    slug: 'convocatoria-elecciones-2022',
    date: '2022-07-10',
    dateLabel: 'Jul 2022',
    summary:
      'Se convoca a todos los socios de la cooperativa al proceso de elecciones para la conformación de los nuevos consejos directivos.',
    featuredImage: '',
  },
  {
    id: '4',
    title: 'Se aproxima navidad',
    slug: 'se-aproxima-navidad',
    date: '2021-12-15',
    dateLabel: 'Dic 2021',
    summary:
      'La cooperativa les desea felices fiestas y les recuerda los horarios especiales de atención durante la temporada navideña.',
    featuredImage: '',
  },
  {
    id: '5',
    title: 'Comunicado Importante',
    slug: 'comunicado-importante',
    date: '2021-03-10',
    dateLabel: 'Mar 2021',
    summary:
      'La Cooperativa informa sobre las transferencias interbancarias y los nuevos canales digitales disponibles para nuestros socios.',
    featuredImage: '',
  },
];

function formatDate(dateStr: string): string {
  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ];
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default async function NoticiasPage() {
  let noticias: Noticia[] = MOCK_NOTICIAS;

  try {
    const cmsNoticias = await getNoticias();
    if (cmsNoticias && Array.isArray(cmsNoticias) && cmsNoticias.length > 0) {
      noticias = cmsNoticias.map((n) => ({
        id: n.id,
        title: n.title,
        slug: n.slug,
        date: n.date,
        dateLabel: formatDate(n.date),
        summary: n.summary || n.excerpt || '',
        featuredImage: n.featuredImage || '',
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
            Mantente informado
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Noticias</h1>
          <p className="max-w-2xl mx-auto text-lg text-teal-100 leading-relaxed">
            Comunicados, novedades y toda la información relevante de nuestra
            cooperativa para nuestros socios y la comunidad.
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

      {/* News grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Últimas publicaciones
          </h2>
          <p className="text-gray-500 mb-10">
            Entérate de los comunicados, convocatorias y novedades más recientes.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {noticias.map((noticia) => (
              <a
                key={noticia.id}
                href="#"
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Card body */}
                <div className="px-6 pt-6 pb-5 flex flex-col flex-1">
                  {/* Date badge */}
                  <span
                    className="inline-flex items-center self-start text-xs font-semibold px-3 py-1 rounded-full mb-4"
                    style={{ backgroundColor: '#ca9f4320', color: '#8b6914' }}
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {noticia.dateLabel}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-lg font-semibold leading-snug mb-3 line-clamp-2 group-hover:underline"
                    style={{ color: '#003848' }}
                  >
                    {noticia.title}
                  </h3>

                  {/* Summary */}
                  {noticia.summary && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {noticia.summary}
                    </p>
                  )}

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Read more */}
                  <span
                    className="inline-flex items-center text-sm font-medium mt-2 group-hover:gap-2 transition-all duration-200"
                    style={{ color: '#ca9f43' }}
                  >
                    Leer más
                    <svg
                      className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="h-1 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: '#ca9f43' }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
