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
            {currentData.map((row, index) => (
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