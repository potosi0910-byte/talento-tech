'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  AgeType,
  ConditionType,
  EvaluationData,
  FoodType,
  FrequencyType,
  MaterialType,
  TemperatureType,
  UtensilType,
} from '@/lib/types';

interface EvaluationFormProps {
  onSubmit: (data: EvaluationData) => void;
  isLoading?: boolean;
}

export function EvaluationForm({ onSubmit, isLoading }: EvaluationFormProps) {
  const [formData, setFormData] = useState<Partial<EvaluationData>>({
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSelectChange = (field: keyof EvaluationData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.utensilType) newErrors.utensilType = 'Campo requerido';
    if (!formData.material) newErrors.material = 'Campo requerido';
    if (!formData.condition) newErrors.condition = 'Campo requerido';
    if (!formData.age) newErrors.age = 'Campo requerido';
    if (!formData.temperature) newErrors.temperature = 'Campo requerido';
    if (!formData.foodType) newErrors.foodType = 'Campo requerido';
    if (!formData.frequency) newErrors.frequency = 'Campo requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData as EvaluationData);
  };

  const utensils: UtensilType[] = [
    'sartén',
    'olla',
    'cuchara',
    'espátula',
    'tabla',
    'recipiente plástico',
    'molde',
    'cuchillo',
    'otro',
  ];

  const materials: MaterialType[] = [
    'teflón/PTFE',
    'aluminio',
    'acero inoxidable',
    'hierro fundido',
    'cerámica',
    'silicona',
    'plástico',
    'madera',
    'cobre',
    'vidrio',
    'otro',
  ];

  const conditions: ConditionType[] = [
    'nuevo',
    'buen estado',
    'rayado',
    'quemado',
    'deformado',
    'oxidado',
    'desprendimiento',
    'olor extraño',
  ];

  const ages: AgeType[] = ['<6 meses', '6m-1año', '1-3 años', '>3 años'];

  const temperatures: TemperatureType[] = [
    'baja',
    'media',
    'alta',
    'llama directa',
    'horno',
    'microondas',
  ];

  const foodTypes: FoodType[] = ['ácido', 'graso', 'salado', 'seco', 'líquido'];

  const frequencies: FrequencyType[] = ['ocasional', 'semanal', 'diaria'];

  return (
    <Card className="p-6 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Utensil Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Utensilio *
            </label>
            <Select value={formData.utensilType || ''} onValueChange={(v) => handleSelectChange('utensilType', v)}>
              <SelectTrigger className={errors.utensilType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {utensils.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.utensilType && (
              <p className="mt-1 text-sm text-red-600">{errors.utensilType}</p>
            )}
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material *
            </label>
            <Select value={formData.material || ''} onValueChange={(v) => handleSelectChange('material', v)}>
              <SelectTrigger className={errors.material ? 'border-red-500' : ''}>
                <SelectValue placeholder="Seleccionar material" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.material && (
              <p className="mt-1 text-sm text-red-600">{errors.material}</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condición *
            </label>
            <Select value={formData.condition || ''} onValueChange={(v) => handleSelectChange('condition', v)}>
              <SelectTrigger className={errors.condition ? 'border-red-500' : ''}>
                <SelectValue placeholder="Seleccionar condición" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Antigüedad *
            </label>
            <Select value={formData.age || ''} onValueChange={(v) => handleSelectChange('age', v)}>
              <SelectTrigger className={errors.age ? 'border-red-500' : ''}>
                <SelectValue placeholder="Seleccionar antigüedad" />
              </SelectTrigger>
              <SelectContent>
                {ages.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age}</p>
            )}
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temperatura de Uso *
            </label>
            <Select value={formData.temperature || ''} onValueChange={(v) => handleSelectChange('temperature', v)}>
              <SelectTrigger className={errors.temperature ? 'border-red-500' : ''}>
                <SelectValue placeholder="Seleccionar temperatura" />
              </SelectTrigger>
              <SelectContent>
                {temperatures.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.temperature && (
              <p className="mt-1 text-sm text-red-600">{errors.temperature}</p>
            )}
          </div>

          {/* Food Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Alimento *
            </label>
            <Select value={formData.foodType || ''} onValueChange={(v) => handleSelectChange('foodType', v)}>
              <SelectTrigger className={errors.foodType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {foodTypes.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.foodType && (
              <p className="mt-1 text-sm text-red-600">{errors.foodType}</p>
            )}
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frecuencia de Uso *
            </label>
            <Select value={formData.frequency || ''} onValueChange={(v) => handleSelectChange('frequency', v)}>
              <SelectTrigger className={errors.frequency ? 'border-red-500' : ''}>
                <SelectValue placeholder="Seleccionar frecuencia" />
              </SelectTrigger>
              <SelectContent>
                {frequencies.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.frequency && (
              <p className="mt-1 text-sm text-red-600">{errors.frequency}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? 'Procesando...' : 'Evaluar Utensilio'}
        </Button>
      </form>
    </Card>
  );
}
