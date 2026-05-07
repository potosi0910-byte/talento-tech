export type UtensilType = 'sartén' | 'olla' | 'cuchara' | 'espátula' | 'tabla' | 'recipiente plástico' | 'molde' | 'cuchillo' | 'otro';

export type MaterialType = 'teflón/PTFE' | 'aluminio' | 'acero inoxidable' | 'hierro fundido' | 'cerámica' | 'silicona' | 'plástico' | 'madera' | 'cobre' | 'vidrio' | 'otro';

export type ConditionType = 'nuevo' | 'buen estado' | 'rayado' | 'quemado' | 'deformado' | 'oxidado' | 'desprendimiento' | 'olor extraño';

export type AgeType = '<6 meses' | '6m-1año' | '1-3 años' | '>3 años';

export type TemperatureType = 'baja' | 'media' | 'alta' | 'llama directa' | 'horno' | 'microondas';

export type FoodType = 'ácido' | 'graso' | 'salado' | 'seco' | 'líquido';

export type FrequencyType = 'diaria' | 'semanal' | 'ocasional';

export type RiskLevel = 'Bajo' | 'Medio' | 'Alto' | 'Crítico';

export interface PhotoAnalysis {
  detected: string[];
  hasProblems: boolean;
}

export interface EvaluationData {
  id: string;
  timestamp: number;
  utensilType: UtensilType;
  material: MaterialType;
  condition: ConditionType;
  age: AgeType;
  temperature: TemperatureType;
  foodType: FoodType;
  frequency: FrequencyType;
  photoUrl?: string;
  photoAnalysis?: PhotoAnalysis;
}

export interface RiskAssessment {
  score: number; // 0-100
  level: RiskLevel;
  substances: string[];
  recommendation: 'conservar' | 'usar con precaución' | 'reemplazar pronto' | 'retirar de uso';
  explanation: string;
}

export interface HistoryRecord {
  evaluation: EvaluationData;
  assessment: RiskAssessment;
}

export interface DashboardStats {
  totalEvaluated: number;
  highRiskCount: number;
  replaceRecommendedCount: number;
  mostFrequentMaterial: string;
  safePercentage: number;
}
