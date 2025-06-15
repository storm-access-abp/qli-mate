import { getHourlyWindData } from '@/lib/sensorData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const windData = await getHourlyWindData(24);
    return NextResponse.json(windData);
  } catch (error) {
    console.error('Erro ao buscar dados do vento:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados do vento' },
      { status: 500 }
    );
  }
}