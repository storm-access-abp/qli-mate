"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const chartData = [
  { date: "2024-04-01", max: 24.03, min: 16.05 },
  { date: "2024-04-02", max: 23.82, min: 16.09 },
  { date: "2024-04-03", max: 23.39, min: 16.11 },
  { date: "2024-04-04", max: 23.50, min: 14.93 },
  { date: "2024-04-05", max: 22.64, min: 15.15 },
  { date: "2024-05-01", max: 22.73, min: 16.64 },
  { date: "2024-05-02", max: 21.92, min: 17.35 },
  { date: "2024-05-03", max: 22.90, min: 17.04 },
  { date: "2024-05-04", max: 26.81, min: 18.57 },
  { date: "2024-05-05", max: 27.53, min: 18.17 },
  { date: "2024-05-06", max: 25.86, min: 18.00 },
  { date: "2024-05-07", max: 23.85, min: 18.15 },
  { date: "2024-05-08", max: 25.67, min: 17.74 },
  { date: "2024-05-09", max: 24.25, min: 17.32 },
  { date: "2024-05-10", max: 22.93, min: 16.06 },
  { date: "2024-05-11", max: 23.65, min: 16.98 },
  { date: "2024-05-12", max: 24.55, min: 17.03 },
  { date: "2024-05-13", max: 24.09, min: 16.82 },
  { date: "2024-05-19", max: 24.47, min: 16.97 },
  { date: "2024-05-20", max: 25.63, min: 17.66 },
  { date: "2024-05-21", max: 26.82, min: 18.88 },
  { date: "2024-05-22", max: 26.55, min: 19.70 },
  { date: "2024-05-23", max: 27.77, min: 19.53 },
  { date: "2024-05-24", max: 26.52, min: 19.00 },
  { date: "2024-05-25", max: 25.03, min: 18.78 },
  { date: "2024-05-26", max: 25.07, min: 20.49 },
  { date: "2024-05-27", max: 22.86, min: 18.08 },
  { date: "2024-05-28", max: 24.28, min: 17.90 },
  { date: "2024-05-29", max: 25.62, min: 18.54 },
  { date: "2024-05-30", max: 28.05, min: 20.19 },
  { date: "2024-05-31", max: 28.25, min: 19.81 },
  { date: "2024-06-04", max: 26.70, min: 19.90 },
  { date: "2024-06-05", max: 24.65, min: 16.63 },
  { date: "2024-06-14", max: 23.06, min: 18.96 },
  { date: "2024-06-15", max: 28.02, min: 19.66 },
  { date: "2024-06-16", max: 28.10, min: 19.53 },
  { date: "2024-06-17", max: 23.81, min: 19.04 },
  { date: "2024-06-18", max: 27.81, min: 18.39 },
  { date: "2024-06-19", max: 27.88, min: 17.07 },
  { date: "2024-06-23", max: 27.78, min: 17.87 }
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  max: {
    label: "Máxima",
    color: "hsl(var(--chart-1))",
  },
  min: {
    label: "Mínima",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillmax" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-max)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-max)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillmin" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-min)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-min)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="max"
              type="natural"
              fill="url(#fillmax)"
              stroke="var(--color-max)"
              stackId="a"
            />
            <Area
              dataKey="min"
              type="natural"
              fill="url(#fillmin)"
              stroke="var(--color-min)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}