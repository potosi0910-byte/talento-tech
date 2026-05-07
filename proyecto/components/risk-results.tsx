'use client';

import { Card } from '@/components/ui/card';
import { RiskAssessment, RiskLevel } from '@/lib/types';
import { AlertCircle, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface RiskResultsProps {
  assessment: RiskAssessment;
}

export function RiskResults({ assessment }: RiskResultsProps) {
  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case 'Bajo':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'Medio':
        return <AlertCircle className="h-16 w-16 text-yellow-500" />;
      case 'Alto':
        return <AlertTriangle className="h-16 w-16 text-orange-500" />;
      case 'Crítico':
        return <XCircle className="h-16 w-16 text-red-500" />;
    }
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'Bajo':
        return 'bg-green-100 text-green-900 border-green-300';
      case 'Medio':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300';
      case 'Alto':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Crítico':
        return 'bg-red-100 text-red-900 border-red-300';
    }
  };

  const getRecommendationColor = (rec: string) => {
    if (rec === 'conservar') return 'bg-green-50 border-green-200 text-green-900';
    if (rec === 'usar con precaución') return 'bg-yellow-50 border-yellow-200 text-yellow-900';
    if (rec === 'reemplazar pronto') return 'bg-orange-50 border-orange-200 text-orange-900';
    return 'bg-red-50 border-red-200 text-red-900';
  };

  const getRecommendationLabel = (rec: string) => {
    switch (rec) {
      case 'conservar':
        return '✅ Conservar';
      case 'usar con precaución':
        return '⚠️ Usar con Precaución';
      case 'reemplazar pronto':
        return '🔄 Reemplazar Pronto';
      case 'retirar de uso':
        return '🛑 Retirar de Uso';
      default:
        return rec;
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Risk Score */}
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Puntuación de Riesgo</h2>

        <div className="mb-8 flex justify-center">
          {getRiskIcon(assessment.level)}
        </div>

        <div className="text-6xl font-bold mb-4">
          <span className="text-gray-900">{assessment.score}</span>
          <span className="text-2xl text-gray-500">/100</span>
        </div>

        <div className={`inline-block px-6 py-3 rounded-full border-2 font-bold text-lg ${getRiskColor(assessment.level)}`}>
          Riesgo {assessment.level}
        </div>

        {/* Visual Semaphore */}
        <div className="mt-8 flex justify-center gap-3">
          <div className={`w-6 h-6 rounded-full ${assessment.level === 'Bajo' ? 'bg-green-500' : 'bg-gray-300'}`} />
          <div className={`w-6 h-6 rounded-full ${assessment.level === 'Medio' ? 'bg-yellow-500' : 'bg-gray-300'}`} />
          <div className={`w-6 h-6 rounded-full ${assessment.level === 'Alto' ? 'bg-orange-500' : 'bg-gray-300'}`} />
          <div className={`w-6 h-6 rounded-full ${assessment.level === 'Crítico' ? 'bg-red-500' : 'bg-gray-300'}`} />
        </div>
      </Card>

      {/* Explanation */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">Explicación</h3>
        <p className="text-gray-700">{assessment.explanation}</p>
      </Card>

      {/* Substances */}
      {assessment.substances.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Sustancias Potenciales Identificadas</h3>
          <div className="flex flex-wrap gap-2">
            {assessment.substances.map((substance, idx) => (
              <div
                key={idx}
                className="bg-orange-100 text-orange-900 px-3 py-1 rounded-full text-sm font-medium border border-orange-300"
              >
                ⚠️ {substance}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendation */}
      <Card className={`p-8 border-2 text-center ${getRecommendationColor(assessment.recommendation)}`}>
        <h3 className="text-lg font-bold mb-2">Recomendación</h3>
        <p className="text-2xl font-bold">
          {getRecommendationLabel(assessment.recommendation)}
        </p>

        {assessment.recommendation === 'conservar' && (
          <p className="mt-4 text-sm opacity-90">
            El utensilio se encuentra en condiciones seguras de uso. Continúa con tu rutina habitual.
          </p>
        )}
        {assessment.recommendation === 'usar con precaución' && (
          <p className="mt-4 text-sm opacity-90">
            El utensilio puede usarse, pero toma precauciones especiales. Evita alimentos ácidos, grasosos o temperaturas muy altas.
          </p>
        )}
        {assessment.recommendation === 'reemplazar pronto' && (
          <p className="mt-4 text-sm opacity-90">
            Se recomienda reemplazar este utensilio en los próximos meses para garantizar la salud de tu familia.
          </p>
        )}
        {assessment.recommendation === 'retirar de uso' && (
          <p className="mt-4 text-sm opacity-90">
            Se recomienda retirar este utensilio inmediatamente del uso. Presenta alto riesgo potencial.
          </p>
        )}
      </Card>

      {/* General Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">Nota:</span> Esta evaluación es educativa y no reemplaza análisis de laboratorio profesional. Consulta a expertos en seguridad alimentaria para evaluaciones definitivas.
        </p>
      </div>
    </div>
  );
}
