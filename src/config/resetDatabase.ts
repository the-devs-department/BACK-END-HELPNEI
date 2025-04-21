import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

export const resetDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  const dbName = process.env.DB_DATABASE || 'HelpneiDB';

  console.log(`💥 Dropando e criando banco: ${dbName}...`);
  await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
  await connection.query(`CREATE DATABASE \`${dbName}\``);
  console.log(`✅ Banco ${dbName} criado com sucesso!`);

  await connection.end();
};
