"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Button } from "@/components/ui/button"

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

// Defina a interface para os dados diários de temperatura
interface DailySensorData {
  date: string;
  maxima: number;
  minima: number;
}

const chartConfig = {
  maxima: {
    label: "Máxima",
    color: "hsl(var(--chart-1))",
  },
  minima: {
    label: "Mínima",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [chartData, setChartData] = React.useState<DailySensorData[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      let days = 90
      if (timeRange === "30d") days = 30
      else if (timeRange === "7d") days = 7
      
      const response = await fetch(`/api/temperature?days=${days}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro na resposta da API')
      }
      
      const data: DailySensorData[] = await response.json()
      
      if (!data || data.length === 0) {
        setError(`Nenhum dado encontrado para os últimos ${days} dias`)
      } else {
        setChartData(data)
      }
    } catch (err: any) {
      console.error("[FRONT] Erro ao buscar dados:", err)
      setError(err.message || 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [timeRange])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Temperaturas Diárias</CardTitle>
          <CardDescription>
            Máximas e mínimas registradas
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Selecione o período"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex h-[250px] flex-col items-center justify-center">
            <p>Carregando dados...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Aguarde enquanto buscamos as informações
            </p>
          </div>
        ) : error ? (
          <div className="flex h-[250px] flex-col items-center justify-center text-destructive">
            <p className="font-medium">Erro ao carregar dados</p>
            <p className="text-sm mt-2 text-center">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={fetchData}
            >
              Tentar novamente
            </Button>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[250px] flex-col items-center justify-center">
            <p>Nenhum dado disponível</p>
            <p className="text-sm text-muted-foreground mt-2">
              Não encontramos registros para o período selecionado
            </p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillmaxima" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-maxima)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-maxima)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillminima" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-minima)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-minima)"
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
                  return date.toLocaleDateString("pt-BR", {
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
                      return new Date(value).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="maxima"
                type="natural"
                fill="url(#fillmaxima)"
                stroke="var(--color-maxima)"
                stackId="a"
              />
              <Area
                dataKey="minima"
                type="natural"
                fill="url(#fillminima)"
                stroke="var(--color-minima)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}