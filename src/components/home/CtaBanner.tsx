import Link from 'next/link';

export function CtaBanner() {
  return (
    <section className="py-16 text-white" style={{ background: 'linear-gradient(135deg, #003848, #466ca5)' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Necesitas asesoría personalizada?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
          Nuestro equipo de asesores está listo para ayudarte a elegir el producto
          financiero que mejor se adapte a tus necesidades.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-full font-semibold h-11 px-8 text-sm transition-colors"
            style={{ background: '#ca9f43', color: '#003848' }}
          >
            Contáctanos
          </Link>
          <Link
            href="/encuentranos"
            className="inline-flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 h-11 px-8 text-sm font-medium transition-colors"
          >
            Encuéntranos
          </Link>
        </div>
      </div>
    </section>
  );
}
