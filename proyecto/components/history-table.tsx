'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHistory, getRiskColorClass, formatTimestamp } from '@/lib/storage';
import { HistoryRecord } from '@/lib/types';
import { Trash2, Eye } from 'lucide-react';

export function HistoryTable() {
  const { history, clearHistory, isLoaded } = useHistory();

  if (!isLoaded) {
    return <div className="text-center py-8 text-gray-600">Cargando historial...</div>;
  }

  if (history.length === 0) {
    return (
      <Card className="p-8 text-center bg-gray-50">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin Evaluaciones</h3>
        <p className="text-gray-600 mb-6">No hay evaluaciones en tu historial aún.</p>
        <Link href="/evaluacion">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Realizar Primera Evaluación
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fecha</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Utensilio</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Material</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Puntaje</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Riesgo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Recomendación</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Acción</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record: HistoryRecord, idx: number) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-sm text-gray-900">
                  {formatTimestamp(record.evaluation.timestamp)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                  {record.evaluation.utensilType}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {record.evaluation.material}
                </td>
                <td className="px-4 py-4 text-sm font-bold text-gray-900">
                  {record.assessment.score}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColorClass(record.assessment.level)}`}>
                    {record.assessment.level}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {record.assessment.recommendation === 'conservar' && '✅ Conservar'}
                  {record.assessment.recommendation === 'usar con precaución' && '⚠️ Precaución'}
                  {record.assessment.recommendation === 'reemplazar pronto' && '🔄 Reemplazar'}
                  {record.assessment.recommendation === 'retirar de uso' && '🛑 Retirar'}
                </td>
                <td className="px-4 py-4 text-sm">
                  <Link href={`/resultados?id=${record.evaluation.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <Eye size={16} />
                      Ver
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        onClick={clearHistory}
        variant="destructive"
        className="w-full"
      >
        <Trash2 size={18} />
        Limpiar Historial
      </Button>
    </div>
  );
}
