import { getCustomizerSettings } from '@/lib/cms/wordpress-client';
import { DEFAULT_BRANDING } from '@/lib/constants/branding';

export const revalidate = 60;

export default async function NosotrosPage() {
  const cms = await getCustomizerSettings();
  const primary = cms?.primaryColor || DEFAULT_BRANDING.primaryColor;
  const accent = cms?.accentColor || DEFAULT_BRANDING.accentColor;
  const name = cms?.institutionName || DEFAULT_BRANDING.institutionName;
  const mission = cms?.mission || DEFAULT_BRANDING.mission;
  const vision = cms?.vision || DEFAULT_BRANDING.vision;
  const history = cms?.history || DEFAULT_BRANDING.history;
  const values = (cms?.values?.length ? cms.values : DEFAULT_BRANDING.values).filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="text-white py-20" style={{ background: `linear-gradient(135deg, ${primary}, ${primary}cc)` }}>
        <div className="container mx-auto px-4">
          <p className="text-sm mb-2 opacity-70">Conócenos</p>
          <h1 className="text-4xl md:text-5xl font-bold">{name}</h1>
          <div className="w-16 h-1 mt-4 rounded-full" style={{ background: accent }} />
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Quiénes Somos */}
        <section className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full" style={{ background: accent }} />
            <h2 className="text-2xl font-bold text-gray-900">Quiénes Somos</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">{history}</p>
          <p className="text-gray-600 leading-relaxed mt-4">
            La Cooperativa Solidaridad, Emprendimiento y Cooperación es una Institución que cuenta con
            infraestructura propia y rentable. La búsqueda de servicios colaterales que puedan beneficiar
            a sus socios y socias al mismo tiempo promuevan rentabilidad a la cooperativa.
          </p>
        </section>

        {/* Misión & Visión */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-8 border-l-4" style={{ borderColor: primary, background: `${primary}08` }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎯</span>
              <h3 className="text-xl font-bold" style={{ color: primary }}>Misión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{mission}</p>
          </div>
          <div className="rounded-2xl p-8 border-l-4" style={{ borderColor: accent, background: `${accent}08` }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔭</span>
              <h3 className="text-xl font-bold" style={{ color: primary }}>Visión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{vision}</p>
          </div>
        </section>

        {/* Valores */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full" style={{ background: accent }} />
            <h2 className="text-2xl font-bold text-gray-900">Nuestros Valores</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((value) => (
              <div key={value} className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gobierno Cooperativo */}
        <section className="rounded-2xl p-8" style={{ background: `${primary}06` }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full" style={{ background: accent }} />
            <h2 className="text-2xl font-bold text-gray-900">Gobierno Cooperativo</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Nuestra cooperativa opera con un Consejo de Administración, un Consejo de Vigilancia,
            Comité Electoral y un Comité de Crédito. Los representantes de los Consejos son elegidos
            en Asamblea General Ordinaria de representantes, a excepción del Comité de Crédito que
            es elegido por el Consejo de Administración como órgano de apoyo en la Gestión de Crédito.
          </p>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Fundación</p>
              <p className="text-2xl font-bold" style={{ color: primary }}>1991</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Regulador</p>
              <p className="text-lg font-bold" style={{ color: primary }}>SEPS</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Seguro</p>
              <p className="text-lg font-bold" style={{ color: primary }}>COSEDE</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Ciudad</p>
              <p className="text-lg font-bold" style={{ color: primary }}>Cuenca</p>
            </div>
          </div>
        </section>

        {/* COSEDE Banner */}
        <section className="rounded-2xl p-8 text-white text-center" style={{ background: `linear-gradient(135deg, ${primary}, #466ca5)` }}>
          <h3 className="text-xl font-bold mb-3">Tus depósitos están protegidos</h3>
          <p className="opacity-80 mb-4">
            Estamos regulados por la SEPS y tus depósitos están protegidos por el Seguro de
            Depósitos de la COSEDE.
          </p>
          <a
            href="https://www.cosede.gob.ec/CONOCE-TU-MONTO-DE-COBERTURA/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sm transition-colors"
            style={{ background: accent, color: primary }}
          >
            Conoce tu monto de cobertura →
          </a>
        </section>

        {/* SEPS */}
        <section className="text-center py-4">
          <p className="text-sm text-gray-500">
            Entidad controlada por la Superintendencia de Economía Popular y Solidaria (SEPS)
          </p>
        </section>
      </div>
    </div>
  );
}
