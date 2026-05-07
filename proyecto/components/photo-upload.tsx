'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Upload, Check } from 'lucide-react';
import { PhotoAnalysis } from '@/lib/types';
import { analizarImagenConIA } from '@/lib/risk-engine';

interface PhotoUploadProps {
  onPhotoAnalysis: (analysis: PhotoAnalysis, photoUrl: string) => void;
  onRemove?: () => void;
}

export function PhotoUpload({ onPhotoAnalysis, onRemove }: PhotoUploadProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoAnalysis, setPhotoAnalysis] = useState<PhotoAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);

    // Simulate analysis
    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = analizarImagenConIA(url);
      setPhotoAnalysis(analysis);
      onPhotoAnalysis(analysis, url);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    setPhotoUrl(null);
    setPhotoAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onRemove?.();
  };

  const detectionChecklist = [
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

  if (photoUrl && photoAnalysis) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Análisis Visual</h3>
            <button
              onClick={handleRemove}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={photoUrl}
              alt="Utensilio"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Deterioros Detectados:</h4>
            <div className="grid grid-cols-2 gap-2">
              {detectionChecklist.map((item) => {
                const isDetected = photoAnalysis.detected?.includes(item) || false;
                return (
                  <div
                    key={item}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      isDetected
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isDetected
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {isDetected && <Check size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm ${isDetected ? 'text-red-700 font-medium' : 'text-gray-600'}`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {photoAnalysis.hasProblems && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800">
                Se detectaron deterioros en la imagen. Esto incrementa el riesgo evaluado.
              </p>
            </div>
          )}

          {!photoAnalysis.hasProblems && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                No se detectaron deterioros visibles en la imagen.
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Foto del Utensilio (Opcional)</h3>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            capture="environment"
          />

          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">
            Sube una foto o toma una con tu cámara
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG o GIF (máx. 10MB)
          </p>
        </div>

        {isAnalyzing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <p className="text-sm text-blue-900">Analizando imagen...</p>
          </div>
        )}

        <p className="text-xs text-gray-500">
          La foto se analizará para detectar rayaduras, óxido, quemaduras, deformaciones y otros deterioros.
        </p>
      </div>
    </Card>
  );
}
