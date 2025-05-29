import React from "react";
import { Component } from "@/components/dashboard/home/chart";
import { WeatherCard } from "@/components/dashboard/home/WeatherCard";
import { Thermometer, Droplets, CircleGauge, Sunset } from 'lucide-react';
import { getLatestSensorData } from '@/lib/sensorData';

function formatUVLevel(uvValue: number): string {
  let level = "";
  if (uvValue >= 0 && uvValue < 100) level = "Muito Baixo";
  else if (uvValue >= 100 && uvValue < 300) level = "Baixo";
  else if (uvValue >= 300 && uvValue < 600) level = "Médio";
  else if (uvValue >= 600 && uvValue < 900) level = "Alto";
  else if (uvValue >= 900) level = "Muito Alto";
  else return "--";
  
  return `${level}`;
}

export default async function WeatherDashboard() {
  // Busca os dados mais recentes do banco de dados
  const sensorData = await getLatestSensorData();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <WeatherCard
          title="Temperature"
          value={sensorData?.Temp || '--'}
          unit="°C"
          icon={Thermometer}
          color="#FF7D50"
        />
        <WeatherCard
          title="Umidade"
          value={sensorData?.hum || '--'}
          unit="%"
          icon={Droplets}
          color="#FF7D50"
        />
        <WeatherCard
          title="Pressão"
          value={sensorData?.bar || '--'}
          unit="hPa"
          icon={CircleGauge}
          color="#FF7D50"
        />
        <WeatherCard
          title="Nível UV"
          value={sensorData ? formatUVLevel(sensorData.uv_level) : '--'}
          unit=""
          icon={Sunset}
          color="#FF7D50"
        />
      </div>
      <Component />
    </div>
  );
}
