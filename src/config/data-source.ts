import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

//variavel para verificar se é script dev ou start
const isDevelopment = process.env.NODE_ENV !== 'production';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'HelpneiDB',
  synchronize: true, // Cria as tabelas automaticamente
  entities: [
    isDevelopment 
      ? __dirname + '/../entities/*.ts'
      : __dirname + '/../entities/*.js'
  ],
});