
import React from 'react';

interface WindCompassProps {
  currentDirection: number;
  currentIntensity: number;
  averageDirection: number;
}

export const WindCompass: React.FC<WindCompassProps> = ({
  currentDirection,
  currentIntensity,
  averageDirection,
}) => {
  const getIntensityColor = (intensity: number) => {
    if (intensity < 5) return '#22c55e';
    if (intensity < 15) return '#eab308';
    return '#ef4444';
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity < 5) return 'Light';
    if (intensity < 15) return 'Moderate';
    return 'Strong';
  };

  const compassSize = 200;
  const center = compassSize / 2;
  const radius = 80;

  const currentRad = (currentDirection - 90) * (Math.PI / 180);
  const averageRad = (averageDirection - 90) * (Math.PI / 180);

  const currentArrowEnd = {
    x: center + Math.cos(currentRad) * radius,
    y: center + Math.sin(currentRad) * radius,
  };

  const averageArrowEnd = {
    x: center + Math.cos(averageRad) * (radius * 0.7),
    y: center + Math.sin(averageRad) * (radius * 0.7),
  };

  const intensityColor = getIntensityColor(currentIntensity);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full max-w-[300px] aspect-square relative">
        <svg
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Circles and arrows */}
          <circle cx={center} cy={center} r={radius + 10} fill="none" stroke={intensityColor} strokeWidth="3" />
          <circle cx={center} cy={center} r={radius} fill="rgba(255,255,255,0.9)" stroke="#e2e8f0" strokeWidth="2" />

          <text x={center} y="20" textAnchor="middle" className="text-sm font-bold fill-slate-700">N</text>
          <text x={compassSize - 15} y={center + 5} textAnchor="middle" className="text-sm font-bold fill-slate-700">E</text>
          <text x={center} y={compassSize - 5} textAnchor="middle" className="text-sm font-bold fill-slate-700">S</text>
          <text x="15" y={center + 5} textAnchor="middle" className="text-sm font-bold fill-slate-700">W</text>

          <line x1={center} y1={center} x2={averageArrowEnd.x} y2={averageArrowEnd.y} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
          <line x1={center} y1={center} x2={currentArrowEnd.x} y2={currentArrowEnd.y} stroke={intensityColor} strokeWidth="4" markerEnd="url(#arrowhead)" />

          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={intensityColor} />
            </marker>
          </defs>

          <circle cx={center} cy={center} r="4" fill={intensityColor} />
        </svg>
      </div>

      <div className="text-center mt-4">
        <div className="text-2xl font-bold" style={{ color: intensityColor }}>
          {currentIntensity} m/s
        </div>
        <div className="text-sm text-slate-600">{getIntensityLabel(currentIntensity)} Wind</div>
        <div className="text-xs text-slate-500 mt-1">
          ⬆ Current: {currentDirection}° | ┇ Avg: {averageDirection}°
        </div>
      </div>
    </div>
  );
};
