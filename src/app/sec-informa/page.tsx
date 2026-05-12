'use client';

import { useState, useEffect } from 'react';
import { getSecInformaDocs, type DocItem } from '@/lib/cms/wordpress-client';

/* ---------- mock data ---------- */
interface SecDoc {
  id: string;
  title: string;
  category: string;
  period: string;
  year: string;
  pdfUrl: string;
}

const MOCK_DOCS: SecDoc[] = [
  {
    id: '1',
    title: 'Indicadores de Género Enero-Marzo 2025',
    category: 'Indicadores de Género',
    period: 'Enero - Marzo',
    year: '2025',
    pdfUrl: '#',
  },
  {
    id: '2',
    title: 'Indicadores de Género Octubre-Diciembre 2024',
    category: 'Indicadores de Género',
    period: 'Octubre - Diciembre',
    year: '2024',
    pdfUrl: '#',
  },
  {
    id: '3',
    title: 'Informe Auditoría Interna 2024',
    category: 'Auditoría',
    period: 'Anual',
    year: '2024',
    pdfUrl: '#',
  },
  {
    id: '4',
    title: 'Convocatoria Asamblea 2024',
    category: 'Asambleas',
    period: 'Anual',
    year: '2024',
    pdfUrl: '#',
  },
  {
    id: '5',
    title: 'Reglamento de Elecciones 2023',
    category: 'Elecciones',
    period: 'Anual',
    year: '2023',
    pdfUrl: '#',
  },
];

const CATEGORIES = [
  'Indicadores de Género',
  'Auditoría',
  'Asambleas',
  'Elecciones',
];

/* ---------- helpers ---------- */
function mapCmsDocs(docs: DocItem[]): SecDoc[] {
  return docs.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.icon || 'General',
    period: d.period || '',
    year: d.year || '',
    pdfUrl: d.pdfUrl || '#',
  }));
}

/* ---------- component ---------- */
export default function SecInformaPage() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [documents, setDocuments] = useState<SecDoc[]>(MOCK_DOCS);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const cmsDocs = await getSecInformaDocs();
        if (cmsDocs && cmsDocs.length > 0) {
          setDocuments(mapCmsDocs(cmsDocs));
        }
      } catch {
        // CMS unavailable – keep mock data
      }
    }
    fetchDocs();
  }, []);

  const filtered = documents.filter((d) => d.category === activeCategory);

  const derivedCategories =
    documents === MOCK_DOCS
      ? CATEGORIES
      : [...new Set(documents.map((d) => d.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---- Hero ---- */}
      <section
        className="py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #003848 0%, #004d61 100%)',
        }}
      >
        <div className="container mx-auto px-4">
          <p className="text-sm text-teal-200 mb-2">Publicaciones institucionales</p>
          <h1 className="text-4xl font-bold tracking-tight">SEC Informa</h1>
          <p className="mt-3 max-w-xl text-teal-100 leading-relaxed">
            Accede a los informes, indicadores y documentos oficiales de nuestra
            cooperativa, organizados por categoría para tu consulta.
          </p>
        </div>
      </section>

      {/* ---- Main layout ---- */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* -- Sidebar -- */}
          <aside className="w-full lg:w-72 shrink-0">
            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <h2
                className="px-5 py-4 text-sm font-semibold uppercase tracking-wider text-white"
                style={{ backgroundColor: '#003848' }}
              >
                Categorías
              </h2>

              <ul className="divide-y divide-gray-100">
                {derivedCategories.map((cat) => {
                  const isActive = cat === activeCategory;
                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        style={
                          isActive
                            ? { backgroundColor: '#ca9f43' }
                            : undefined
                        }
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              isActive ? 'bg-white' : 'bg-gray-300'
                            }`}
                          />
                          {cat}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* -- Document cards -- */}
          <section className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {activeCategory}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {filtered.length}{' '}
              {filtered.length === 1 ? 'documento' : 'documentos'} disponibles
            </p>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
                No se encontraron documentos en esta categoría.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {filtered.map((doc) => (
                  <article
                    key={doc.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
                  >
                    <div>
                      <span
                        className="inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 text-white"
                        style={{ backgroundColor: '#003848' }}
                      >
                        {doc.period} {doc.year}
                      </span>
                      <h3 className="text-base font-semibold text-gray-900 leading-snug">
                        {doc.title}
                      </h3>
                    </div>

                    <a
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                      style={{ color: '#ca9f43' }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = '#003848')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = '#ca9f43')
                      }
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3"
                        />
                      </svg>
                      Ver documento
                    </a>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
