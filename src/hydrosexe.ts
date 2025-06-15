import { PoolOptions, RowDataPacket } from 'mysql2/promise';
import { MySQL } from '../src/controllers/db';
import connect from './models/connection';
import { Hydros } from '../src/models';

// Esta rotina lê os dados do banco de dados MySQL e os salva no MongoDB.
// É necessário ter o MySQL rodando e a tabela Sensor criada com os dados.
// Certifique-se de que o MongoDB também esteja rodando, a a coleção Hydros será criada na primeira conexão ao MongoDB.
// Certifique-se de que as dependências necessárias estejam instaladas:
// npm install mysql2 mongoose dotenv

// Create the connection pool. The pool-specific settings are the defaults

const access: PoolOptions = {
  host: '108.179.193.150',
  user: 'hydros28',
  password: 'A9302pbycW',
  database: 'hydros28_estfrn02',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Interface Sensor para a tabela no MySQL e a coleção Hydros no MongoDB

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
  reading_time: string; // or Date if you want to parse it as a Date
}

(async () => {
  // conecta ao MongoDB no início da aplicação
  connect();

  // conecta ao MySQL usando a classe MySQL
  const mysql = new MySQL(access);

  /** Getting Sensor Data */

  const sensores = await mysql.queryRows('SELECT * FROM Sensor ORDER BY id DESC LIMIT 13000;');

  // Para cada registro da tabela Sensor retornado, cria um novo documento no MongoDB

  sensores[0].forEach((sensor) => {
    const document = new Hydros({
      // Usando o modelo (Schema) Hydros do Mongoose
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
      reading_time: new Date(sensor.reading_time), // Assuming reading_time is a string that can be parsed as a date
    });
    document
      .save()
      .then(() => console.log(`Sensor ${sensor.id} saved successfully.`))
      .catch((err) => console.error(`Error saving sensor ${sensor.id}:`, err));
  });

  await mysql.connection.end();
})();
