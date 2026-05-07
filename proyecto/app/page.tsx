import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Cocina Segura IA
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Evalúa la seguridad de tus utensilios de cocina y protege la salud de tu familia
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/evaluacion">
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Iniciar Evaluación
                </Button>
              </Link>

              <Link href="/educacion">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                >
                  Aprender Más
                </Button>
              </Link>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Análisis Rápido</p>
                  <p className="text-sm text-gray-600">Obtén resultados inmediatos sobre el estado de tus utensilios</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-1 h-5 w-5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Detecta Riesgos</p>
                  <p className="text-sm text-gray-600">Identifica potenciales sustancias tóxicas liberadas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="mt-1 h-5 w-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Recomendaciones Personalizadas</p>
                  <p className="text-sm text-gray-600">Recibe guía específica según el utensilio y material</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex items-center justify-center">
            <Card className="w-full p-8 bg-white border-green-200">
              <div className="space-y-6">
                <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🥘</div>
                    <p className="text-gray-700 font-medium">Útensil en Evaluación</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-yellow-50 p-4 text-center">
                    <p className="text-2xl mb-2">📊</p>
                    <p className="text-xs font-medium text-gray-600">Análisis Detallado</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4 text-center">
                    <p className="text-2xl mb-2">📸</p>
                    <p className="text-xs font-medium text-gray-600">Foto Upload</p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-4 text-center">
                    <p className="text-2xl mb-2">⚠️</p>
                    <p className="text-xs font-medium text-gray-600">Riesgo Detectado</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <p className="text-2xl mb-2">✅</p>
                    <p className="text-xs font-medium text-gray-600">Recomendación</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Cómo Funciona
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-6">
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Proporciona Información</h3>
            <p className="text-gray-600">
              Cuéntanos sobre tu utensilio: tipo, material, estado y cómo lo usas
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sube una Foto (Opcional)</h3>
            <p className="text-gray-600">
              Captura una imagen para análisis visual detallado de deterioros
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Recibe Resultado</h3>
            <p className="text-gray-600">
              Obtén puntuación de riesgo y recomendaciones sobre uso o reemplazo
            </p>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Nota Importante:</span> Esta herramienta es educativa y no reemplaza análisis de laboratorio ni certificaciones sanitarias. Para evaluaciones profesionales, consulta a expertos en seguridad alimentaria.
          </p>
        </div>
      </div>
    </div>
  );
}
