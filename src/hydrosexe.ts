import { PoolOptions, RowDataPacket } from 'mysql2/promise';
import { MySQL } from '../src/controllers/db';
import connect from './models/connection';
import { Hydros } from '../src/models';

const access: PoolOptions = {
  host: '108.179.193.150',
  user: 'hydros28',
  password: 'A9302pbycW',
  database: 'hydros28_estfrn02',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

interface Sensor extends RowDataPacket {
  id: number;
  Temp: string;
  hum: string;
  cab_temp: string;
  bat_volts: string;
  uv_level: string;
  bar: string;
  wind_peak: string;
  wind_rt: string;
  wind_avg: string;
  wind_dir_rt: string;
  wind_dir_avg: string;
  reading_time: string; 
}

(async () => {
  connect();

  const mysql = new MySQL(access);

  const sensores = await mysql.queryRows('SELECT * FROM Sensor ORDER BY id DESC LIMIT 13000;');

  sensores[0].forEach((sensor) => {
    const document = new Hydros({
      _id: sensor.id.toString(),
      Temp: sensor.Temp,
      hum: sensor.hum,
      cab_temp: sensor.cab_temp,
      bat_volts: sensor.bat_volts,
      uv_level: sensor.uv_level,
      bar: sensor.bar,
      wind_peak: sensor.wind_peak,
      wind_rt: sensor.wind_rt,
      wind_avg: sensor.wind_avg,
      wind_dir_rt: sensor.wind_dir_rt,
      wind_dir_avg: sensor.wind_dir_avg,
      reading_time: new Date(sensor.reading_time), 
    });
    document
      .save()
      .then(() => console.log(`Sensor ${sensor.id} saved successfully.`))
      .catch((err) => console.error(`Error saving sensor ${sensor.id}:`, err));
  });

  await mysql.connection.end();
})();
