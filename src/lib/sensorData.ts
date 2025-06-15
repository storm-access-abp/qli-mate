import { query } from './db';

export interface SensorData {
  Id: number;
  Temp: number; // Temperatura do ar (°C)
  Hum: number; // Umidade relativa do ar (%)
  cab_temp: number; // Temperatura da cabine (°C)
  bat_volts: number; // Tensão da bateria (V)
  uv_level: number; // Irradiação solar (w/m²)
  Bar: number; // Pressão atmosférica (hPa)
  wind_peak: number; // Pico de intensidade do vento (m/s)
  wind_rt: number; // Intensidade do vento (m/s)
  wind_avg: number; // Intensidade média do vento (m/s)
  wind_dir_rt: number; // Direção do vento (°)
  wind_dir_avg: number; // Direção média do vento (°)
  reading_time: string; // Data do registro (AA-MM-DD HH:MM:SS)
}

export interface DailyMaxTemp {
  data_dia: string;
  temperatura_maxima: number;
  temperatura_minima: number;
}

export interface DailySensorData {
  date: string;
  max: number;
  min: number;
}


export async function getLatestSensorData(): Promise<SensorData> {
  const results = (await query(
    'SELECT Id, Temp, Hum, cab_temp, bat_volts, uv_level, Bar, wind_peak, wind_rt, wind_avg, wind_dir_rt, wind_dir_avg, reading_time ' +
      'FROM Sensor ORDER BY reading_time DESC LIMIT 1'
  )) as SensorData[];

  if (!results || results.length === 0) {
    throw new Error('Nenhum dado do sensor encontrado');
  }

  return results[0];
}

export async function getDailyMinMax(days: number): Promise<DailySensorData[]> {
  const results = await query(
    `SELECT 
      DATE(reading_time) AS date,
      MAX(Temp) AS max,
      MIN(Temp) AS min 
     FROM Sensor 
     WHERE reading_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
     GROUP BY DATE(reading_time)
     ORDER BY date ASC`,
    [days]
  ) as DailySensorData[];

  if (!results) {
    throw new Error('Nenhum dado do sensor encontrado');
  }
  
  return results;
}
