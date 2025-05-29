import { query } from './db';

export interface SensorData {
  map(arg0: (item: any) => { date: any; temp: any; }): unknown;
  id: number;
  Temp: number;
  hum: number;
  bar: number;
  uv_level: number;
  reading_time: string;
}

export async function getLatestSensorData(): Promise<SensorData> {
  const results = await query(
    'SELECT Temp, hum, bar, uv_level FROM Sensor ORDER BY reading_time DESC LIMIT 1'
  ) as SensorData[];
  if (!results || results.length === 0) {
    throw new Error('Nenhum dado do sensor encontrado');
  }
  
  return results[0];
}

export async function getMaxSensorTemp(): Promise<SensorData> {
  const results = await query(
    'SELECT DATE(reading_time) AS data_dia, MAX(temp) AS temperatura_maxima FROM Sensor GROUP BY DATE(reading_time) ORDER BY data_dia DESC LIMIT 30'
  ) as SensorData[];
  if (!results || results.length === 0) {
    throw new Error('Nenhum dado do sensor encontrado');
  }
  
  return results[0];
}