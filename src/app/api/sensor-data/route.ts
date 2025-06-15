import { getTableSensorData, getTotalSensorRecords } from '@/lib/sensorData';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 0;
  const pageSize = Number(searchParams.get('pageSize')) || 50;

  try {
    const [data, total] = await Promise.all([
      getTableSensorData(page, pageSize),
      getTotalSensorRecords()
    ]);
    
    return NextResponse.json({ data, total });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sensor data' },
      { status: 500 }
    );
  }
}