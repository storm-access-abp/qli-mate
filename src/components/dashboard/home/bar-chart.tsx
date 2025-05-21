"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
const chartData = [
  { date: "2024-04-01", precipitacao: 222, mobile: 150 },
  { date: "2024-04-02", precipitacao: 97, mobile: 180 },
  { date: "2024-04-03", precipitacao: 167, mobile: 120 },
  { date: "2024-04-04", precipitacao: 242, mobile: 260 },
  { date: "2024-05-27", precipitacao: 420, mobile: 460 },
  { date: "2024-05-28", precipitacao: 233, mobile: 190 },
  { date: "2024-05-29", precipitacao: 78, mobile: 130 },
  { date: "2024-05-30", precipitacao: 340, mobile: 280 },
  { date: "2024-05-31", precipitacao: 178, mobile: 230 },
  { date: "2024-06-01", precipitacao: 178, mobile: 200 },
  { date: "2024-06-02", precipitacao: 470, mobile: 410 },
  { date: "2024-06-03", precipitacao: 103, mobile: 160 },
  { date: "2024-06-04", precipitacao: 439, mobile: 380 },
  { date: "2024-06-07", precipitacao: 323, mobile: 370 },
  { date: "2024-06-08", precipitacao: 385, mobile: 320 },
  { date: "2024-06-09", precipitacao: 438, mobile: 480 },
  { date: "2024-06-10", precipitacao: 155, mobile: 200 },
  { date: "2024-06-11", precipitacao: 92, mobile: 150 },
  { date: "2024-06-12", precipitacao: 492, mobile: 420 },
  { date: "2024-06-13", precipitacao: 81, mobile: 130 },
  { date: "2024-06-14", precipitacao: 426, mobile: 380 },
  { date: "2024-06-15", precipitacao: 307, mobile: 350 },
  { date: "2024-06-16", precipitacao: 371, mobile: 310 },
  { date: "2024-06-17", precipitacao: 475, mobile: 520 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  precipitacao: {
    label: "Mínimo",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Máximo",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarComponent() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("precipitacao");

  const total = React.useMemo(
    () => ({
      precipitacao: chartData.reduce((acc, curr) => acc + curr.precipitacao, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Tendência climática</CardTitle>
          <CardDescription>Ao longo do ano</CardDescription>
        </div>
        <div className="flex">
          {["precipitacao", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}