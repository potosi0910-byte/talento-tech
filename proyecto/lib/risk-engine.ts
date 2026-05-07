import { EvaluationData, RiskAssessment, RiskLevel, PhotoAnalysis } from './types';

/**
 * Main risk calculation engine
 * Calculates risk score (0-100) based on material, condition, temperature, food type, and frequency
 */
export function calcularRiesgo(evaluation: EvaluationData): RiskAssessment {
  let score = 0;
  const substances: Set<string> = new Set();

  // Base score by material type
  const materialScores: Record<string, number> = {
    'teflón/PTFE': 15,
    'aluminio': 12,
    'plástico': 18,
    'cobre': 10,
    'acero inoxidable': 3,
    'hierro fundido': 8,
    'cerámica': 5,
    'madera': 7,
    'silicona': 6,
    'vidrio': 1,
    'otro': 15,
  };

  score += materialScores[evaluation.material] || 15;

  // Condition-based points
  const conditionScores: Record<string, number> = {
    'nuevo': 0,
    'buen estado': 2,
    'rayado': 15,
    'quemado': 20,
    'deformado': 12,
    'oxidado': 25,
    'desprendimiento': 30,
    'olor extraño': 18,
  };

  score += conditionScores[evaluation.condition] || 0;

  // Age deterioration
  const ageMultipliers: Record<string, number> = {
    '<6 meses': 1.0,
    '6m-1año': 1.15,
    '1-3 años': 1.3,
    '>3 años': 1.5,
  };

  score *= ageMultipliers[evaluation.age] || 1.0;

  // Temperature impact
  const tempMultipliers: Record<string, number> = {
    'baja': 0.9,
    'media': 1.0,
    'alta': 1.3,
    'llama directa': 1.5,
    'horno': 1.25,
    'microondas': 1.1,
  };

  score *= tempMultipliers[evaluation.temperature] || 1.0;

  // Material-specific rules for temperature and food combinations
  if (evaluation.material === 'teflón/PTFE') {
    if (evaluation.condition === 'rayado') score += 20;
    if (evaluation.temperature === 'alta' || evaluation.temperature === 'llama directa') score += 15;
    substances.add('PTFE degradado');
    substances.add('PFOA');
    substances.add('PFAS');
  }

  if (evaluation.material === 'plástico') {
    if (evaluation.temperature === 'alta' || evaluation.temperature === 'horno') score += 18;
    if (evaluation.foodType === 'graso') score += 10;
    substances.add('BPA');
    substances.add('ftalatos');
  }

  if (evaluation.material === 'aluminio') {
    if (evaluation.foodType === 'ácido') score += 12;
    if (evaluation.condition === 'oxidado') score += 15;
    substances.add('aluminio');
    substances.add('óxido');
  }

  if (evaluation.material === 'cobre') {
    if (evaluation.foodType === 'ácido') score += 15;
    substances.add('cobre');
    substances.add('verdigris');
  }

  if (evaluation.material === 'cerámica') {
    if (evaluation.condition === 'rayado' || evaluation.condition === 'quemado') {
      score += 12;
      substances.add('plomo potencial');
      substances.add('cadmio potencial');
    }
  }

  // Food type impact
  if (evaluation.foodType === 'ácido') score += 5;
  if (evaluation.foodType === 'graso') score += 3;

  // Frequency impact
  const frequencyMultipliers: Record<string, number> = {
    'ocasional': 0.7,
    'semanal': 1.0,
    'diaria': 1.4,
  };

  score *= frequencyMultipliers[evaluation.frequency] || 1.0;

  // Photo analysis impact
  if (evaluation.photoAnalysis?.detected && evaluation.photoAnalysis.detected.length > 0) {
    score += evaluation.photoAnalysis.detected.length * 5;
  }

  // Cap score at 100
  score = Math.min(100, Math.max(0, score));

  // Determine risk level
  let level: RiskLevel;
  if (score <= 25) level = 'Bajo';
  else if (score <= 50) level = 'Medio';
  else if (score <= 75) level = 'Alto';
  else level = 'Crítico';

  // Add general substances based on score
  if (score > 50) {
    substances.add('metales pesados potenciales');
    substances.add('contaminación microbiológica');
  }

  // Recommendation based on score and level
  let recommendation: 'conservar' | 'usar con precaución' | 'reemplazar pronto' | 'retirar de uso';
  if (score <= 25) recommendation = 'conservar';
  else if (score <= 50) recommendation = 'usar con precaución';
  else if (score <= 75) recommendation = 'reemplazar pronto';
  else recommendation = 'retirar de uso';

  // Generate explanation
  const explanation = generateExplanation(evaluation, level, score);

  return {
    score: Math.round(score),
    level,
    substances: Array.from(substances),
    recommendation,
    explanation,
  };
}

function generateExplanation(
  evaluation: EvaluationData,
  level: RiskLevel,
  score: number
): string {
  let text = `El utensilio evaluado tiene un riesgo de ${level.toLowerCase()}. `;

  if (evaluation.condition === 'nuevo' || evaluation.condition === 'buen estado') {
    text += `Está en buena condición física. `;
  } else {
    text += `Presenta signos de deterioro (${evaluation.condition}). `;
  }

  if (evaluation.material === 'teflón/PTFE' && evaluation.condition === 'rayado') {
    text += `El teflón rayado puede liberar partículas tóxicas. `;
  }

  if (evaluation.material === 'aluminio' && evaluation.foodType === 'ácido') {
    text += `Los alimentos ácidos pueden incrementar la lixiviación de aluminio. `;
  }

  if (evaluation.material === 'plástico' && evaluation.temperature === 'alta') {
    text += `El calor acelera la degradación del plástico y liberación de compuestos. `;
  }

  if (evaluation.age === '>3 años') {
    text += `Su antigüedad sugiere mayor desgaste y liberación de sustancias. `;
  }

  return text;
}

/**
 * Simulated image analysis for future Computer Vision integration
 * Currently detects based on mock data, will be replaced with actual CV model
 */
export function analizarImagenConIA(photoUrl?: string): PhotoAnalysis {
  if (!photoUrl) {
    return {
      detected: [],
      hasProblems: false,
    };
  }

  // Simulated detection - in production, this would call an actual CV API
  const possibleDetections = [
    'Rayaduras',
    'Óxido',
    'Quemado',
    'Desprendimiento',
    'Deformación',
    'Grietas',
    'Manchas',
    'Cambio de color',
    'Residuos adheridos',
  ];

  // Mock: randomly detect 0-3 issues for demo purposes
  const detectionCount = Math.floor(Math.random() * 3);
  const detected = possibleDetections
    .sort(() => Math.random() - 0.5)
    .slice(0, detectionCount);

  return {
    detected,
    hasProblems: detected.length > 0,
  };
}
