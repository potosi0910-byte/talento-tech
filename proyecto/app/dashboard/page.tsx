import { HealthDashboard } from '@/components/health-dashboard';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard de Salud</h1>
      <p className="text-gray-600 mb-12">
        Estadísticas de tus evaluaciones de utensilios de cocina
      </p>

      <HealthDashboard />

      {/* Tips Section */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex gap-4">
            <div className="text-3xl">✅</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Mantén tus Utensilios Seguros</h3>
              <p className="text-sm text-gray-700">
                Revisa regularmente el estado de tus utensilios y reemplaza los que muestren signos de deterioro.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="flex gap-4">
            <div className="text-3xl">⚠️</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Cuidado con Deterioros</h3>
              <p className="text-sm text-gray-700">
                Los utensilios rayados, oxidados o con signos de desgaste pueden liberar sustancias tóxicas.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
