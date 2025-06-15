// src/app/api/temperature/route.ts
import { getDailyMinMax } from '@/lib/sensorData';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = searchParams.get('days') || '30'; // Valor padrão 30 dias
    
    const data = await getDailyMinMax(parseInt(days, 10));
    
    // Formatar os dados para o formato esperado pelo gráfico
    const formattedData = data.map(item => ({
      date: item.date,
      maxima: item.max,
      minima: item.min
    }));
    
    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error('Failed to fetch temperature data:', error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch temperature data" },
      { status: 500 }
    );
  }
}