"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface DataTableProps {
  data: Array<{
    reading_time: string;
    temp: number;
    hum: number;
    uv_level: number;
    bar: number;
    wind_peak: number;
    wind_rt: number;
    wind_avg: number;
    wind_dir_rt: number;
    wind_dir_avg: number;
  }>;
  stationName: string;
}

export const DataTable: React.FC<DataTableProps> = ({ data, stationName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 50;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const canGoBack = currentPage > 0;
  const canGoForward = endIndex < data.length;

  const downloadCSV = () => {
    const headers = [
      "Reading Time",
      "Temperature (°C)",
      "Humidity (%)",
      "UV Level (W/m²)",
      "Pressure (hPa)",
      "Wind Peak (m/s)",
      "Wind Current (m/s)",
      "Wind Average (m/s)",
      "Wind Direction Current (°)",
      "Wind Direction Average (°)",
    ];

    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        [
          row.reading_time,
          row.temp,
          row.hum,
          row.uv_level,
          row.bar,
          row.wind_peak,
          row.wind_rt,
          row.wind_avg,
          row.wind_dir_rt,
          row.wind_dir_avg,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${stationName}_weather_data.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header com info + botão download */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-sm text-slate-600">
          Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of {data.length} records
        </div>
        <Button onClick={downloadCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </Button>
      </div>

      {/* Tabela scrollável */}
      <div className="overflow-auto max-h-[60vh] border rounded-md">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Time</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Temp (°C)</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Humidity (%)</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">UV (W/m²)</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Pressure (hPa)</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Wind Peak</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Wind Current</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Wind Avg</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Dir Current</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Dir Avg</th>
            </tr>
          </thead>
          <tbody>
            {weatherStationData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="border border-slate-300 px-3 py-2">{format(new Date(row.reading_time), "MM/dd/yy HH:mm")}</td>
                <td className="border border-slate-300 px-3 py-2">{row.temp.toFixed(1)}</td>
                <td className="border border-slate-300 px-3 py-2">{row.hum.toFixed(1)}</td>
                <td className="border border-slate-300 px-3 py-2">{row.uv_level.toFixed(1)}</td>
                <td className="border border-slate-300 px-3 py-2">{row.bar.toFixed(1)}</td>
                <td className="border border-slate-300 px-3 py-2">{row.wind_peak.toFixed(1)}</td>
                <td className="border border-slate-300 px-3 py-2">{row.wind_rt.toFixed(1)}</td>
                <td className="border border-slate-300 px-3 py-2">{row.wind_avg.toFixed(1)}</td>
                <td className="border border-slate-300 px-3 py-2">{row.wind_dir_rt}°</td>
                <td className="border border-slate-300 px-3 py-2">{row.wind_dir_avg}°</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-4">
        <Button onClick={() => setCurrentPage(prev => prev - 1)} disabled={!canGoBack} variant="outline" size="sm">
          Back 50
        </Button>
        <Button onClick={() => setCurrentPage(prev => prev + 1)} disabled={!canGoForward} variant="outline" size="sm">
          Next 50
        </Button>
      </div>
    </div>
  );
};

// Dados da estação meteorológica (extraídos da imagem)
const weatherStationData = [
  {
    reading_time: "2025-06-15 14:31:17",
    temp: 19.31,
    hum: 100.00,
    uv_level: 438.10,
    bar: 1019.94,
    wind_peak: 6.96,
    wind_rt: 7.32,
    wind_avg: 7.75,
    wind_dir_rt: 329,
    wind_dir_avg: 322
  },
  {
    reading_time: "2025-06-15 14:21:14",
    temp: 19.15,
    hum: 100.00,
    uv_level: 330.70,
    bar: 1019.97,
    wind_peak: 8.71,
    wind_rt: 9.18,
    wind_avg: 9.43,
    wind_dir_rt: 330,
    wind_dir_avg: 327
  },
  {
    reading_time: "2025-06-15 14:11:17",
    temp: 19.34,
    hum: 100.00,
    uv_level: 448.53,
    bar: 1020.12,
    wind_peak: 7.94,
    wind_rt: 7.25,
    wind_avg: 8.42,
    wind_dir_rt: 333,
    wind_dir_avg: 335
  },
  {
    reading_time: "2025-06-15 14:01:20",
    temp: 19.68,
    hum: 100.00,
    uv_level: 256.30,
    bar: 1020.03,
    wind_peak: 0.55,
    wind_rt: 0.00,
    wind_avg: 0.05,
    wind_dir_rt: 323,
    wind_dir_avg: 329
  },
  {
    reading_time: "2025-06-15 13:51:15",
    temp: 19.76,
    hum: 100.00,
    uv_level: 528.10,
    bar: 1020.26,
    wind_peak: 0.16,
    wind_rt: 0.00,
    wind_avg: 0.05,
    wind_dir_rt: 324,
    wind_dir_avg: 339
  },
  {
    reading_time: "2025-06-15 13:41:18",
    temp: 19.03,
    hum: 100.00,
    uv_level: 382.47,
    bar: 1020.33,
    wind_peak: 0.16,
    wind_rt: 0.07,
    wind_avg: 0.05,
    wind_dir_rt: 356,
    wind_dir_avg: 339
  },
  {
    reading_time: "2025-06-15 13:31:14",
    temp: 18.97,
    hum: 100.00,
    uv_level: 430.17,
    bar: 1020.18,
    wind_peak: 0.16,
    wind_rt: 0.07,
    wind_avg: 0.06,
    wind_dir_rt: 327,
    wind_dir_avg: 338
  },
  {
    reading_time: "2025-06-15 13:21:17",
    temp: 18.98,
    hum: 100.00,
    uv_level: 311.57,
    bar: 1020.30,
    wind_peak: 2.90,
    wind_rt: 0.00,
    wind_avg: 1.14,
    wind_dir_rt: 331,
    wind_dir_avg: 332
  },
  {
    reading_time: "2025-06-15 13:11:18",
    temp: 18.50,
    hum: 100.00,
    uv_level: 293.77,
    bar: 1020.53,
    wind_peak: 0.16,
    wind_rt: 0.00,
    wind_avg: 0.05,
    wind_dir_rt: 337,
    wind_dir_avg: 336
  },
  {
    reading_time: "2025-06-15 12:51:15",
    temp: 18.74,
    hum: 100.00,
    uv_level: 394.23,
    bar: 1020.47,
    wind_peak: 1.21,
    wind_rt: 0.00,
    wind_avg: 0.06,
    wind_dir_rt: 322,
    wind_dir_avg: 324
  },
  {
    reading_time: "2025-06-15 12:41:15",
    temp: 18.38,
    hum: 100.00,
    uv_level: 382.10,
    bar: 1020.47,
    wind_peak: 0.22,
    wind_rt: 0.00,
    wind_avg: 0.07,
    wind_dir_rt: 331,
    wind_dir_avg: 330
  },
  {
    reading_time: "2025-06-15 12:31:16",
    temp: 18.32,
    hum: 100.00,
    uv_level: 495.50,
    bar: 1020.74,
    wind_peak: 1.86,
    wind_rt: 0.00,
    wind_avg: 0.05,
    wind_dir_rt: 336,
    wind_dir_avg: 333
  },
  {
    reading_time: "2025-06-15 12:21:31",
    temp: 17.73,
    hum: 100.00,
    uv_level: 402.23,
    bar: 1020.79,
    wind_peak: 3.40,
    wind_rt: 0.00,
    wind_avg: 2.32,
    wind_dir_rt: 323,
    wind_dir_avg: 323
  },
  {
    reading_time: "2025-06-15 12:11:19",
    temp: 17.84,
    hum: 100.00,
    uv_level: 309.77,
    bar: 1021.11,
    wind_peak: 2.96,
    wind_rt: 0.00,
    wind_avg: 0.12,
    wind_dir_rt: 315,
    wind_dir_avg: 329
  },
  {
    reading_time: "2025-06-15 12:01:20",
    temp: 18.02,
    hum: 100.00,
    uv_level: 670.07,
    bar: 1021.21,
    wind_peak: 3.01,
    wind_rt: 0.00,
    wind_avg: 0.45,
    wind_dir_rt: 342,
    wind_dir_avg: 331
  },
  {
    reading_time: "2025-06-15 11:51:18",
    temp: 17.70,
    hum: 100.00,
    uv_level: 362.87,
    bar: 1021.27,
    wind_peak: 7.51,
    wind_rt: 3.59,
    wind_avg: 1.89,
    wind_dir_rt: 328,
    wind_dir_avg: 336
  },
  {
    reading_time: "2025-06-15 11:41:16",
    temp: 17.44,
    hum: 100.00,
    uv_level: 516.77,
    bar: 1021.33,
    wind_peak: 3.01,
    wind_rt: 0.07,
    wind_avg: 0.60,
    wind_dir_rt: 335,
    wind_dir_avg: 329
  },
  {
    reading_time: "2025-06-15 11:31:14",
    temp: 17.85,
    hum: 100.00,
    uv_level: 381.40,
    bar: 1021.61,
    wind_peak: 0.38,
    wind_rt: 0.07,
    wind_avg: 0.07,
    wind_dir_rt: 335,
    wind_dir_avg: 342
  },
  {
    reading_time: "2025-06-15 11:21:15",
    temp: 17.34,
    hum: 100.00,
    uv_level: 612.03,
    bar: 1021.71,
    wind_peak: 10.19,
    wind_rt: 2.69,
    wind_avg: 5.67,
    wind_dir_rt: 351,
    wind_dir_avg: 342
  },
  {
    reading_time: "2025-06-15 11:11:17",
    temp: 16.90,
    hum: 100.00,
    uv_level: 535.00,
    bar: 1021.87,
    wind_peak: 10.96,
    wind_rt: 10.08,
    wind_avg: 7.83,
    wind_dir_rt: 335,
    wind_dir_avg: 338
  },
  {
    reading_time: "2025-06-15 11:01:18",
    temp: 17.67,
    hum: 100.00,
    uv_level: 707.83,
    bar: 1021.45,
    wind_peak: 11.67,
    wind_rt: 15.46,
    wind_avg: 13.03,
    wind_dir_rt: 337,
    wind_dir_avg: 326
  },
  {
    reading_time: "2025-06-15 10:51:15",
    temp: 17.52,
    hum: 100.00,
    uv_level: 605.03,
    bar: 1021.91,
    wind_peak: 11.89,
    wind_rt: 9.59,
    wind_avg: 12.11,
    wind_dir_rt: 316,
    wind_dir_avg: 329
  },
  {
    reading_time: "2025-06-15 10:41:21",
    temp: 16.79,
    hum: 100.00,
    uv_level: 618.03,
    bar: 1021.61,
    wind_peak: 14.46,
    wind_rt: 12.56,
    wind_avg: 13.04,
    wind_dir_rt: 340,
    wind_dir_avg: 336
  },
  {
    reading_time: "2025-06-15 10:21:20",
    temp: 16.20,
    hum: 100.00,
    uv_level: 602.87,
    bar: 1021.95,
    wind_peak: 12.33,
    wind_rt: 10.87,
    wind_avg: 13.26,
    wind_dir_rt: 344,
    wind_dir_avg: 342
  },
  {
    reading_time: "2025-06-15 10:11:16",
    temp: 16.64,
    hum: 100.00,
    uv_level: 401.67,
    bar: 1022.13,
    wind_peak: 0.49,
    wind_rt: 0.07,
    wind_avg: 0.12,
    wind_dir_rt: 335,
    wind_dir_avg: 335
  },
  {
    reading_time: "2025-06-15 10:01:19",
    temp: 16.32,
    hum: 100.00,
    uv_level: 460.23,
    bar: 1022.27,
    wind_peak: 0.22,
    wind_rt: 0.14,
    wind_avg: 0.08,
    wind_dir_rt: 339,
    wind_dir_avg: 340
  },
  {
    reading_time: "2025-06-15 09:51:16",
    temp: 15.91,
    hum: 100.00,
    uv_level: 493.63,
    bar: 1022.25,
    wind_peak: 0.22,
    wind_rt: 0.00,
    wind_avg: 0.07,
    wind_dir_rt: 344,
    wind_dir_avg: 336
  },
  {
    reading_time: "2025-06-15 09:41:18",
    temp: 16.50,
    hum: 100.00,
    uv_level: 372.80,
    bar: 1022.41,
    wind_peak: 0.16,
    wind_rt: 0.00,
    wind_avg: 0.10,
    wind_dir_rt: 328,
    wind_dir_avg: 326
  },
  {
    reading_time: "2025-06-15 09:21:22",
    temp: 15.73,
    hum: 100.00,
    uv_level: 448.83,
    bar: 1022.53,
    wind_peak: 0.22,
    wind_rt: 0.00,
    wind_avg: 0.11,
    wind_dir_rt: 326,
    wind_dir_avg: 329
  },
  {
    reading_time: "2025-06-15 09:11:26",
    temp: 15.60,
    hum: 100.00,
    uv_level: 401.33,
    bar: 1022.43,
    wind_peak: 0.66,
    wind_rt: 0.00,
    wind_avg: 0.14,
    wind_dir_rt: 337,
    wind_dir_avg: 328
  }
];

// Exemplo de uso do componente
export function WeatherStationTable() {
  return (
    <DataTable 
      data={weatherStationData} 
      stationName="Estação Meteorológica Principal" 
    />
  );
}