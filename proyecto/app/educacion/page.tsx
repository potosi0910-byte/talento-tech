'use client';

import { Card } from '@/components/ui/card';

const educationContent = [
  {
    title: 'Teflón / PTFE',
    emoji: '🍳',
    risks: [
      'Partículas de PTFE si está rayado',
      'Gases tóxicos si se calienta demasiado',
      'PFOA y PFAS potenciales en productos antiguos',
    ],
    safeUse: [
      'Mantén siempre a temperaturas moderadas',
      'Evita rayar la superficie anti-adherente',
      'Reemplaza si la capa se daña',
      'Usa con mano suave, sin objetos metálicos',
    ],
    recommendation: 'Evalúa regularmente, reemplaza si presenta rayaduras',
  },
  {
    title: 'Aluminio',
    emoji: '⚙️',
    risks: [
      'Lixiviación de aluminio especialmente con alimentos ácidos',
      'Mayor corrosión con alimentos salados',
      'Óxido si no se mantiene correctamente',
    ],
    safeUse: [
      'Evita alimentos muy ácidos o salados',
      'Usa en temperaturas moderadas',
      'Mantén limpio y seco para evitar oxidación',
      'Considera anarizado para mayor protección',
    ],
    recommendation: 'Adecuado para uso general, cuidado con ácidos',
  },
  {
    title: 'Plástico',
    emoji: '🥤',
    risks: [
      'BPA y ftalatos liberados especialmente con calor',
      'Degradación acelerada a temperaturas altas',
      'Grietas y astillas pueden contaminar alimentos',
    ],
    safeUse: [
      'Evita el microondas con plásticos regulares',
      'Usa solo plástico apto para temperaturas altas',
      'Reemplaza si muestra grietas o rayones',
      'No dejes alimentos grasosos prolongadamente',
    ],
    recommendation: 'Cuidado con el calor, reemplaza al mostrar daño',
  },
  {
    title: 'Acero Inoxidable',
    emoji: '✨',
    risks: ['Mínimos - uno de los materiales más seguros', 'Posible lixiviación de níquel en casos raros'],
    safeUse: [
      'Apto para prácticamente todos los usos',
      'Compatible con todos los tipos de alimentos',
      'Resiste bien altas temperaturas',
      'Fácil de limpiar y mantener',
    ],
    recommendation: 'Excelente opción segura',
  },
  {
    title: 'Cerámica',
    emoji: '🍲',
    risks: [
      'Potencial plomo en coberturas antiguas',
      'Potencial cadmio en decoraciones',
      'Microfracturas pueden liberar contaminantes',
    ],
    safeUse: [
      'Compra de fuentes confiables',
      'Evita cerámica muy antigua o de procedencia desconocida',
      'Reemplaza si hay grietas o desportilladuras',
      'Prefiere cerámica certificada como segura',
    ],
    recommendation: 'Moderna certificada es segura, antigua requiere cuidado',
  },
  {
    title: 'Silicona',
    emoji: '🧤',
    risks: ['Muy segura en general', 'Posible lixiviación mínima a temperaturas muy altas'],
    safeUse: [
      'Apta para horno y microondas',
      'Compatible con temperaturas altas',
      'Fácil de limpiar',
      'Dura muchos años',
    ],
    recommendation: 'Material seguro y versátil',
  },
  {
    title: 'Hierro Fundido',
    emoji: '🍖',
    risks: [
      'Oxidación sin mantenimiento adecuado',
      'Lixiviación de hierro (generalmente beneficiosa)',
      'Requiere curación regular',
    ],
    safeUse: [
      'Seca completamente después de lavar',
      'Sella regularmente con aceite',
      'Evita detergentes fuertes',
      'La lixiviación de hierro es generalmente segura',
    ],
    recommendation: 'Seguro si se mantiene correctamente',
  },
];

export default function EducacionPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Educación en Seguridad de Utensilios</h1>
      <p className="text-gray-600 mb-12">
        Conoce más sobre los materiales comunes en la cocina y cómo usarlos de forma segura.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {educationContent.map((material, idx) => (
          <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">{material.emoji}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{material.title}</h2>
              </div>
            </div>

            {/* Risks */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-red-500">⚠️</span> Riesgos Potenciales
              </h3>
              <ul className="space-y-2">
                {material.risks.map((risk, i) => (
                  <li key={i} className="text-gray-700 flex gap-3">
                    <span className="text-red-400 font-bold mt-0.5">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safe Use */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-green-500">✅</span> Uso Seguro
              </h3>
              <ul className="space-y-2">
                {material.safeUse.map((tip, i) => (
                  <li key={i} className="text-gray-700 flex gap-3">
                    <span className="text-green-400 font-bold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900">
                📌 Recomendación: {material.recommendation}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* General Tips */}
      <Card className="mt-12 p-6 bg-green-50 border-green-200">
        <h2 className="text-2xl font-bold text-green-900 mb-4">💡 Consejos Generales</h2>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-green-900">
              Reemplaza utensilios regularmente, especialmente si muestran signos de deterioro
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-green-900">
              Evita usar utensilios que estén rayados, quemados u oxidados
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-green-900">
              Usa cada utensilio según su rango de temperatura recomendado
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-green-900">
              Mantén tus utensilios limpios y secos para prolongar su vida útil
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-green-900">
              Compra utensilios certificados y de marcas confiables
            </span>
          </li>
        </ul>
      </Card>

      {/* Disclaimer */}
      <Card className="mt-8 p-6 bg-yellow-50 border-yellow-200">
        <p className="text-sm text-yellow-900">
          <span className="font-semibold">Descargo de Responsabilidad:</span> Esta información es educativa. Para evaluaciones profesionales o análisis específicos de materiales, consulta expertos certificados en seguridad alimentaria.
        </p>
      </Card>
    </div>
  );
}
