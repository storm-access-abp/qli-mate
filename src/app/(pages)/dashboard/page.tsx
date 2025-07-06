import React from "react";
import { Component } from "@/components/dashboard/home/chart";
import { WeatherCard } from "@/components/dashboard/home/WeatherCard";
import { WindCompass } from "@/components/dashboard/home/alert";
import { Thermometer, Droplets, CircleGauge, Sunset } from 'lucide-react';
import { DataTable } from "@/components/ui/data-table";
import { getLatestSensorData } from "@/lib/sensorData";
import { formatUVLevel } from "@/lib/utils/uvUtils";

export default async function Teste() {
  const sensorData = await getLatestSensorData();
  return (
    <div className="grid grid-cols-4 auto-rows-auto gap-2">
      <div className="col-start-1">
        <WeatherCard
          title="Temperatura"
          value={sensorData?.Temp || '--'}
          unit="°C"
          icon={Thermometer}
          color="#FF7D50"
        />
      </div>
      <div className="col-start-2">
        <WeatherCard
          title="Umidade"
          value={sensorData?.Hum || '--'}
          unit="%"
          icon={Droplets}
          color="#FF7D50"
        />
      </div>
      <div className="col-start-3">
        <WeatherCard
          title="Pressão"
          value={sensorData?.Bar || '--'}
          unit="hPa"
          icon={CircleGauge}
          color="#FF7D50"
        />
      </div>
      <div className="col-start-4">
        <WeatherCard
          title="Nível UV"
          value={sensorData ? formatUVLevel(sensorData.uv_level) : '--'}
          unit=""
          icon={Sunset}
          color="#FF7D50"
        />
      </div>
      <div className="col-span-3 col-start-1 row-start-2">
        <Component />
      </div>
      <div className="row-span-1 col-start-4 row-start-2">
        <WeatherCard title="Condição do vento" color="#4FC3F7">
          <WindCompass
            currentDirection={sensorData?.wind_dir_rt || 0}
            currentIntensity={sensorData?.wind_rt || 0}
            averageDirection={sensorData?.wind_dir_avg || 0}
          />
        </WeatherCard>
      </div>
      <div className="col-span-4 col-start-1 row-start-4">
        <WeatherCard title="Data Table" color="#6B7280">
          <DataTable data={[]} stationName={""} />
        </WeatherCard>
      </div>
    </div>
  );
}