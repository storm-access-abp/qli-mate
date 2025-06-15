"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface TableSensorData {
  reading_time: string;
  temp: number | string;
  hum: number | string;
  uv_level: number | string;
  bar: number | string;
  wind_peak: number | string;
  wind_rt: number | string;
  wind_avg: number | string;
  wind_dir_rt: number | string;
  wind_dir_avg: number | string;
}

interface DataTableProps {
  stationName: string;
}

export const DataTable: React.FC<DataTableProps> = ({ stationName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tableData, setTableData] = useState<TableSensorData[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/sensor-data?page=${currentPage}&pageSize=${itemsPerPage}`
        );
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        
        const { data, total } = await response.json();
        setTableData(data);
        setTotalRecords(total);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados do sensor');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Função segura para formatar números
  const safeNumber = (value: any, decimals: number = 1) => {
    const num = parseFloat(value);
    return isNaN(num) ? "N/A" : num.toFixed(decimals);
  };

  const downloadCSV = () => {
    // Função segura para valores do CSV
    const safeValue = (value: any) => {
      const num = parseFloat(value);
      return isNaN(num) ? "" : num.toString();
    };

    const headers = [
      "Data/Hora",
      "Temperatura (°C)",
      "Umidade (%)",
      "UV (W/m²)",
      "Pressão (hPa)",
      "Pico Vento (m/s)",
      "Vento Atual (m/s)",
      "Vento Médio (m/s)",
      "Dir. Vento Atual (°)",
      "Dir. Vento Média (°)",
    ];

    const csvContent = [
      headers.join(","),
      ...tableData.map((row) =>
        [
          `"${row.reading_time}"`,
          safeValue(row.temp),
          safeValue(row.hum),
          safeValue(row.uv_level),
          safeValue(row.bar),
          safeValue(row.wind_peak),
          safeValue(row.wind_rt),
          safeValue(row.wind_avg),
          safeValue(row.wind_dir_rt),
          safeValue(row.wind_dir_avg),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${stationName}_dados_meteorologicos.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRecords);
  const canGoBack = currentPage > 0;
  const canGoForward = endIndex < totalRecords;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-slate-600">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-lg text-red-600">{error}</div>
        <Button onClick={() => setCurrentPage(0)} variant="outline">
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-sm text-slate-600">
          Mostrando {startIndex + 1}-{endIndex} de {totalRecords} registros
        </div>
        <Button onClick={downloadCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Baixar CSV
        </Button>
      </div>

      <div className="overflow-auto max-h-[60vh] border rounded-md">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Hora</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Temp (°C)</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Umidade (%)</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">UV (W/m²)</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Pressão (hPa)</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Pico Vento</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Vento Atual</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Vento Médio</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Dir. Atual</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-medium text-slate-700">Dir. Média</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="border border-slate-300 px-3 py-2">
                  {format(new Date(row.reading_time), "dd/MM/yy HH:mm")}
                </td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.temp)}</td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.hum)}</td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.uv_level)}</td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.bar)}</td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.wind_peak)}</td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.wind_rt)}</td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.wind_avg)}</td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.wind_dir_rt, 0)}°</td>
                <td className="border border-slate-300 px-3 py-2">{safeNumber(row.wind_dir_avg, 0)}°</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => setCurrentPage(prev => prev - 1)} 
          disabled={!canGoBack || isLoading} 
          variant="outline" 
          size="sm"
        >
          Anterior
        </Button>
        <Button 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={!canGoForward || isLoading} 
          variant="outline" 
          size="sm"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export function WeatherStationTable() {
  return (
    <DataTable stationName="Estação Meteorológica Principal" />
  );
}