'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useHistory } from '@/lib/storage';
import { calculateDashboardStats } from '@/lib/storage';
import { DashboardStats } from '@/lib/types';
import { BarChart3, AlertTriangle, RotateCw, TrendingUp } from 'lucide-react';

export function HealthDashboard() {
  const { history, isLoaded } = useHistory();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const newStats = calculateDashboardStats(history);
      setStats(newStats);
    }
  }, [history, isLoaded]);

  if (!stats) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
  }) => (
    <Card className={`p-6 border-l-4 ${color}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-3xl opacity-20">{Icon}</div>
      </div>
    </Card>
  );

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="📊"
          label="Total Evaluados"
          value={stats.totalEvaluated}
          color="border-blue-500"
        />
        <StatCard
          icon="⚠️"
          label="Riesgo Alto"
          value={stats.highRiskCount}
          color="border-orange-500"
        />
        <StatCard
          icon="🔄"
          label="Reemplazo Recomendado"
          value={stats.replaceRecommendedCount}
          color="border-red-500"
        />
        <StatCard
          icon="✅"
          label="Utensilios Seguros"
          value={`${stats.safePercentage}%`}
          color="border-green-500"
        />
      </div>

      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Más Frecuente</h3>
        <div className="flex items-center gap-4">
          <div className="text-4xl">📦</div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{stats.mostFrequentMaterial}</p>
            <p className="text-sm text-gray-600 mt-1">Material más evaluado en tu historial</p>
          </div>
        </div>
      </Card>

      {stats.totalEvaluated === 0 && (
        <Card className="mt-6 p-8 bg-blue-50 border-blue-200 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Sin Evaluaciones Aún</h3>
          <p className="text-blue-800">
            Realiza tu primera evaluación para ver estadísticas aquí.
          </p>
        </Card>
      )}
    </div>
  );
}
