import React from "react";
import { Component } from "@/components/dashboard/home/chart";
<<<<<<< HEAD
import { WeatherCard } from "@/components/dashboard/home/WeatherCard";
import { Thermometer, Droplets } from 'lucide-react';

export default function Teste() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <WeatherCard
          title="Temperature"
=======
import { BarComponent } from "@/components/dashboard/home/bar-chart";
import { WeatherCard } from "@/components/dashboard/home/WeatherCard";
import { WindSpeedAlert } from "@/components/dashboard/home/alert";
import { Thermometer, Droplets, CircleGauge, Sunset } from "lucide-react";

export default function Teste() {
  return (
    <div className="grid grid-cols-4 auto-rows-auto gap-2">
      <div className="col-start-1">
        <WeatherCard
          title="Temperatura"
>>>>>>> origin/main
          value={25}
          unit="°C"
          icon={Thermometer}
          color="#FF7D50"
        />
<<<<<<< HEAD
=======
      </div>
      <div className="col-start-2">
>>>>>>> origin/main
        <WeatherCard
          title="Umidade"
          value={25}
          unit="°C"
          icon={Droplets}
          color="#FF7D50"
        />
<<<<<<< HEAD
=======
      </div>
      <div className="col-start-3">
>>>>>>> origin/main
        <WeatherCard
          title="Pressão"
          value={25}
          unit="°C"
<<<<<<< HEAD
          icon={Thermometer}
          color="#FF7D50"
        />
        <WeatherCard
          title="Visibilidade"
          value={25}
          unit="°C"
          icon={Thermometer}
          color="#FF7D50"
        />
      </div>
      <Component />
=======
          icon={CircleGauge}
          color="#FF7D50"
        />
      </div>
      <div className="col-start-4">
        <WeatherCard
          title="Nível UV"
          value={25}
          unit="°C"
          icon={Sunset}
          color="#FF7D50"
        />
      </div>
      <div className="col-span-3 col-start-1 row-start-2">
        <Component />
      </div>
      <div className="col-span-3 col-start-1 row-start-3">
        <BarComponent />
      </div>
      <div className="row-span-2 col-start-4 row-start-2 h-full">
        <WindSpeedAlert />
      </div>
>>>>>>> origin/main
    </div>
  );
}
