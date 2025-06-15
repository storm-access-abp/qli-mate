import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'br726.hostgator.com.br',
  port: 3306,
  user: 'hydros28',
  password: 'A9302pbycW',
  database: 'hydros28_estfrn02',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query(sql: string, values?: any) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(sql, values);
    return rows;
  } finally {
    connection.release();
  }
}
