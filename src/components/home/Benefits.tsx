const benefits = [
  { icon: '🛡️', title: 'Seguridad garantizada', desc: 'Regulados por la SEPS. Tus depósitos protegidos por COSEDE.' },
  { icon: '📱', title: 'Banca Virtual 24/7', desc: 'Accede a tus cuentas, realiza transferencias y pagos desde cualquier lugar.' },
  { icon: '🤝', title: 'Atención personalizada', desc: 'Asesores dedicados a tu bienestar financiero en nuestra oficina de Cuenca.' },
  { icon: '📊', title: 'Tasas competitivas', desc: 'Las mejores tasas del mercado tanto para ahorro como para crédito.' },
  { icon: '⚡', title: 'Créditos ágiles', desc: 'Aprobación rápida. Requisitos claros y procesos simplificados.' },
  { icon: '🌱', title: 'Impacto social', desc: 'Tu ahorro impulsa el desarrollo solidario de la comunidad.' },
];

export function Benefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold mb-1" style={{ color: '#ca9f43' }}>¿Por qué elegirnos?</p>
          <h2 className="text-3xl font-bold text-gray-900">Tu confianza, nuestra prioridad</h2>
          <div className="w-12 h-1 mx-auto mt-3 rounded-full" style={{ background: '#ca9f43' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-3xl flex-shrink-0">{b.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
