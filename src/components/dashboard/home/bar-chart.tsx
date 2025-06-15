"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Exemplo de dados simulados de pico de vento (últimas 24h)
const windData = [
  { time: "2025-06-12T14:00", ventoMax: 0.16 },
  { time: "2025-06-12T15:00", ventoMax: 2.35 },
  { time: "2025-06-12T16:00", ventoMax: 3.21 },
  { time: "2025-06-12T17:00", ventoMax: 5.42 },
  { time: "2025-06-12T18:00", ventoMax: 6.34 },
  { time: "2025-06-12T19:00", ventoMax: 8.12 },
  { time: "2025-06-12T20:00", ventoMax: 7.89 },
  { time: "2025-06-12T21:00", ventoMax: 9.16 },
  { time: "2025-06-12T22:00", ventoMax: 10.34 },
  { time: "2025-06-12T23:00", ventoMax: 12.56 },
  { time: "2025-06-13T00:00", ventoMax: 11.98 },
  { time: "2025-06-13T01:00", ventoMax: 9.45 },
  { time: "2025-06-13T02:00", ventoMax: 8.76 },
  { time: "2025-06-13T03:00", ventoMax: 7.65 },
  { time: "2025-06-13T04:00", ventoMax: 11.67 },
  { time: "2025-06-13T05:00", ventoMax: 13.89 },
  { time: "2025-06-13T06:00", ventoMax: 14.46 },
  { time: "2025-06-13T07:00", ventoMax: 12.76 },
  { time: "2025-06-13T08:00", ventoMax: 10.34 },
  { time: "2025-06-13T09:00", ventoMax: 9.16 },
  { time: "2025-06-13T10:00", ventoMax: 11.98 },
  { time: "2025-06-13T11:00", ventoMax: 13.12 }, // pico
  { time: "2025-06-13T12:00", ventoMax: 12.78 },
  { time: "2025-06-13T13:00", ventoMax: 11.34 }
];

const chartConfig = {
  ventoMax: {
    label: "Pico de Vento (km/h)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineWindChart() {
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
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  nameKey="ventoMax"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "short",
                    })
                  }
                />
              }
            />
            <Line
              type="monotone"
              dataKey="ventoMax"
              stroke="var(--color-ventoMax)"
              strokeWidth={2}
              dot
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}