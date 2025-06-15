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

export interface HourlyWindData {
  time: string; // Data e hora (formato: YYYY-MM-DD HH:MM:SS)
  wind_peak: number; // Pico de vento (m/s)
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

// Nova função para obter dados de vento por hora
export async function getHourlyWindData(hours: number): Promise<HourlyWindData[]> {
  const results = await query(
    `SELECT 
      DATE_FORMAT(reading_time, '%Y-%m-%dT%H:00') AS time,
      MAX(wind_peak) AS wind_peak
     FROM Sensor
     WHERE reading_time >= DATE_SUB(NOW(), INTERVAL ? HOUR)
     GROUP BY DATE_FORMAT(reading_time, '%Y%m%d%H')
     ORDER BY time ASC`,
    [hours]
  ) as HourlyWindData[];

  if (!results) {
    throw new Error('Nenhum dado do vento encontrado');
  }

  return results;
}