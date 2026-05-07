'use client';

import { useCallback, useEffect, useState } from 'react';
import { EvaluationData, HistoryRecord, DashboardStats, RiskLevel } from './types';

const STORAGE_KEY = 'cocina-segura-history';
const MAX_HISTORY = 50;

export function useHistory() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save evaluation and return the new record
  const saveEvaluation = useCallback(
    (record: HistoryRecord) => {
      const updated = [record, ...history].slice(0, MAX_HISTORY);
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return record;
    },
    [history]
  );

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    history,
    isLoaded,
    saveEvaluation,
    clearHistory,
  };
}

/**
 * Calculate dashboard statistics from history
 */
export function calculateDashboardStats(history: HistoryRecord[]): DashboardStats {
  if (history.length === 0) {
    return {
      totalEvaluated: 0,
      highRiskCount: 0,
      replaceRecommendedCount: 0,
      mostFrequentMaterial: 'N/A',
      safePercentage: 0,
    };
  }

  const highRiskCount = history.filter(
    (r) => r.assessment.level === 'Alto' || r.assessment.level === 'Crítico'
  ).length;

  const replaceRecommendedCount = history.filter(
    (r) => r.assessment.recommendation === 'reemplazar pronto' || r.assessment.recommendation === 'retirar de uso'
  ).length;

  // Calculate most frequent material
  const materialCounts: Record<string, number> = {};
  history.forEach((r) => {
    const material = r.evaluation.material;
    materialCounts[material] = (materialCounts[material] || 0) + 1;
  });

  const mostFrequentMaterial =
    Object.entries(materialCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Calculate safe percentage
  const safeCount = history.filter((r) => r.assessment.level === 'Bajo').length;
  const safePercentage = Math.round((safeCount / history.length) * 100);

  return {
    totalEvaluated: history.length,
    highRiskCount,
    replaceRecommendedCount,
    mostFrequentMaterial,
    safePercentage,
  };
}

/**
 * Get color for risk level
 */
export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'Bajo':
      return '#10b981'; // Green
    case 'Medio':
      return '#fbbf24'; // Yellow
    case 'Alto':
      return '#f97316'; // Orange
    case 'Crítico':
      return '#ef4444'; // Red
    default:
      return '#6b7280'; // Gray
  }
}

export function getRiskColorClass(level: RiskLevel): string {
  switch (level) {
    case 'Bajo':
      return 'bg-green-500 text-white';
    case 'Medio':
      return 'bg-yellow-500 text-black';
    case 'Alto':
      return 'bg-orange-500 text-white';
    case 'Crítico':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
