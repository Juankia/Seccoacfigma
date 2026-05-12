import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockBranches } from '@/lib/cms/mock-content';

export default function EncuentranosPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#003848] to-[#004d61] text-white py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm text-white/70 mb-2">Nuestras Agencias</p>
          <h1 className="text-4xl font-bold">Encuéntranos</h1>
          <p className="text-white/80 mt-3">5 agencias en Cuenca para atenderte.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBranches.map((branch) => (
            <Card key={branch.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{branch.name}</CardTitle>
                  {branch.isMain && (
                    <Badge className="bg-green-100 text-[#003848]">Principal</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Dirección</p>
                  <p className="text-sm text-gray-600">{branch.address}</p>
                  <p className="text-sm text-gray-500">{branch.city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Teléfono</p>
                  <p className="text-sm text-gray-600">{branch.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Horario</p>
                  {branch.schedule.map((s, i) => (
                    <p key={i} className="text-sm text-gray-600">
                      {s.day}: {s.hours}
                    </p>
                  ))}
                </div>
                {/* Map placeholder */}
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-400 text-sm">
                  Mapa: {branch.lat.toFixed(4)}, {branch.lng.toFixed(4)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
