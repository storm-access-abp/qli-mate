"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

// Formata o valor para exibição no tooltip
const formatValue = (value: number) => `${value.toFixed(2)} km/h`;

// Formata o rótulo do tooltip (data/hora)
const formatLabel = (value: string) => 
  new Date(value).toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });

export function LineWindChart() {
  const [windData, setWindData] = React.useState<{ time: string; ventoMax: number }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchWindData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/wind-data');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do vento');
        }
        
        const hourlyData = await response.json();
        const convertedData = hourlyData.map((item: any) => ({
          time: item.time,
          ventoMax: Math.round(item.wind_peak * 3.6 * 100) / 100
        }));
        
        setWindData(convertedData);
      } catch (error) {
        console.error("Erro ao buscar dados do vento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWindData();
    const interval = setInterval(fetchWindData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="px-6 py-5">
          <CardTitle>Intensidade do Vento</CardTitle>
          <CardDescription>Últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <p>Carregando dados...</p>
        </CardContent>
      </Card>
    );
  }

  if (windData.length === 0) {
    return (
      <Card>
        <CardHeader className="px-6 py-5">
          <CardTitle>Intensidade do Vento</CardTitle>
          <CardDescription>Últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <p>Nenhum dado disponível</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="px-6 py-5">
        <CardTitle>Intensidade do Vento</CardTitle>
        <CardDescription>Últimas 24 horas</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            data={windData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              unit=" km/h"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || payload.length === 0) return null;
                
                return (
                  <div className="bg-white p-3 border rounded-md shadow-lg">
                    <p className="font-medium">{formatLabel(label)}</p>
                    <p className="text-sm">
                      {`${chartConfig.ventoMax.label}: ${formatValue(payload[0].value as number)}`}
                    </p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="ventoMax"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const chartConfig = {
  ventoMax: {
    label: "Pico de Vento (km/h)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;