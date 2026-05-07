'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RiskResults } from '@/components/risk-results';
import { useHistory } from '@/lib/storage';
import { HistoryRecord } from '@/lib/types';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function ResultadosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { history } = useHistory();
  const [record, setRecord] = useState<HistoryRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && history.length > 0) {
      const found = history.find((r) => r.evaluation.id === id);
      if (found) {
        setRecord(found);
      }
    }
    setIsLoading(false);
  }, [searchParams, history]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <p className="text-gray-600">Cargando resultados...</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Evaluación no encontrada</h2>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar la evaluación solicitada. Por favor, realiza una nueva evaluación.
          </p>
          <Link href="/evaluacion">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Nueva Evaluación
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const { evaluation, assessment } = record;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/evaluacion" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
          <ArrowLeft size={20} />
          <span>Nueva Evaluación</span>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900">Resultados de la Evaluación</h1>
      </div>

      {/* Utensil Info */}
      <Card className="mb-8 p-6 bg-gray-50 border-gray-200">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-gray-600 font-medium">Tipo de Utensilio</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {evaluation.utensilType.charAt(0).toUpperCase() + evaluation.utensilType.slice(1)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Material</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {evaluation.material.charAt(0).toUpperCase() + evaluation.material.slice(1)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Condición</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {evaluation.condition.charAt(0).toUpperCase() + evaluation.condition.slice(1)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Antigüedad</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{evaluation.age}</p>
          </div>
        </div>
      </Card>

      {/* Photo Preview (if available) */}
      {evaluation.photoUrl && (
        <Card className="mb-8 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Foto Cargada</h2>
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            {/* Using standard img tag instead of Image for blob URLs */}
            <img
              src={evaluation.photoUrl}
              alt="Utensilio"
              className="w-full h-full object-cover"
            />
          </div>
          {evaluation.photoAnalysis?.detected && evaluation.photoAnalysis.detected.length > 0 && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="font-medium text-orange-900 mb-2">Deterioros Detectados:</p>
              <div className="flex flex-wrap gap-2">
                {evaluation.photoAnalysis.detected.map((det, idx) => (
                  <span
                    key={idx}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {det}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Risk Assessment Results */}
      <div className="mb-8">
        <RiskResults assessment={assessment} />
      </div>

      {/* Action Buttons */}
      <div className="grid gap-3 md:grid-cols-2">
        <Link href="/evaluacion" className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            Evaluar Otro Utensilio
          </Button>
        </Link>
        <Link href="/dashboard" className="w-full">
          <Button
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-50"
          >
            Ver Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
