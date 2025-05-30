import mysql from 'mysql2/promise';

export async function query(sql: string, values?: any) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(sql, values);
    return rows;
  } finally {
    connection.release();
  }
}
