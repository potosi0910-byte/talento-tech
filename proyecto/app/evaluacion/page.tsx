'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EvaluationForm } from '@/components/evaluation-form';
import { PhotoUpload } from '@/components/photo-upload';
import { Card } from '@/components/ui/card';
import { EvaluationData, PhotoAnalysis } from '@/lib/types';
import { calcularRiesgo } from '@/lib/risk-engine';
import { useHistory } from '@/lib/storage';

export default function EvaluacionPage() {
  const router = useRouter();
  const { saveEvaluation } = useHistory();
  const [evaluationData, setEvaluationData] = useState<Partial<EvaluationData> | null>(null);
  const [photoAnalysis, setPhotoAnalysis] = useState<PhotoAnalysis | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEvaluationSubmit = (data: EvaluationData) => {
    setEvaluationData(data);
  };

  const handlePhotoAnalysis = (analysis: PhotoAnalysis, url: string) => {
    setPhotoAnalysis(analysis);
    setPhotoUrl(url);
  };

  const handlePhotoRemove = () => {
    setPhotoAnalysis(null);
    setPhotoUrl(null);
  };

  const handleContinue = async () => {
    if (!evaluationData) return;

    setIsProcessing(true);

    // Complete the evaluation with photo data if available
    const completeEvaluation: EvaluationData = {
      id: evaluationData.id!,
      timestamp: evaluationData.timestamp!,
      utensilType: evaluationData.utensilType!,
      material: evaluationData.material!,
      condition: evaluationData.condition!,
      age: evaluationData.age!,
      temperature: evaluationData.temperature!,
      foodType: evaluationData.foodType!,
      frequency: evaluationData.frequency!,
      photoUrl: photoUrl || undefined,
      photoAnalysis: photoAnalysis || undefined,
    };

    // Calculate risk
    const assessment = calcularRiesgo(completeEvaluation);

    // Save to history
    const record = {
      evaluation: completeEvaluation,
      assessment,
    };

    saveEvaluation(record);

    // Redirect to results page
    setTimeout(() => {
      router.push(`/resultados?id=${completeEvaluation.id}`);
    }, 500);
  };

  const formFilled = evaluationData !== null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Evaluar Utensilio</h1>
      <p className="text-gray-600 mb-12">
        Proporciona información sobre tu utensilio para evaluar su seguridad
      </p>

      <div className="space-y-8">
        {/* Step 1: Form */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold">
              1
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Información del Utensilio</h2>
            {formFilled && <span className="ml-auto text-green-600 font-medium">✓ Completado</span>}
          </div>
          <EvaluationForm onSubmit={handleEvaluationSubmit} isLoading={false} />
        </div>

        {/* Step 2: Photo Upload (shown after form is filled) */}
        {formFilled && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold">
                2
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Foto (Opcional)</h2>
              {photoUrl && <span className="ml-auto text-green-600 font-medium">✓ Cargada</span>}
            </div>
            <PhotoUpload onPhotoAnalysis={handlePhotoAnalysis} onRemove={handlePhotoRemove} />
          </div>
        )}

        {/* Step 3: Continue Button */}
        {formFilled && (
          <div className="flex gap-3">
            <button
              onClick={handleContinue}
              disabled={isProcessing}
              className="flex-1 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 transition-colors"
            >
              {isProcessing ? 'Procesando...' : 'Ver Resultados'}
            </button>
          </div>
        )}
      </div>

      {/* Info Box */}
      <Card className="mt-12 p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Consejo:</h3>
        <p className="text-gray-700 text-sm">
          Si tienes una foto del utensilio, especialmente si muestra señales de deterioro, sube una imagen. Esto ayudará a obtener una evaluación más precisa del riesgo.
        </p>
      </Card>
    </div>
  );
}
