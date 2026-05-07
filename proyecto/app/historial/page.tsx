import { HistoryTable } from '@/components/history-table';

export default function HistorialPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Historial de Evaluaciones</h1>
      <p className="text-gray-600 mb-12">
        Revisa todas tus evaluaciones anteriores
      </p>

      <HistoryTable />
    </div>
  );
}
