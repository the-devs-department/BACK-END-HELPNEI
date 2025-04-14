import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import { runSeeders } from './seed/seederAll';
import { resetDatabase } from './config/resetDatabase';

const app = express();
const port = 3000;

app.use(express.json());

const start = async () => {
  try {
    await resetDatabase(); // 🔥 Dropa e recria o banco
    await AppDataSource.initialize(); // Conecta ao banco
    console.log('✅ Conexão com o banco de dados estabelecida.');

    await runSeeders(); // Executa os seeders
    console.log('✅ Seeders executados com sucesso.');

    // Rotas
    app.get('/', (_req: Request, res: Response) => {
      res.send('Aqui será a página do projeto');
    });

    // Inicia o servidor após tudo estar pronto
    app.listen(port, () => {
      console.log(`🚀 Projeto rodando em: http://localhost:${port}`);
    });

  } catch (err) {
    console.error('❌ Erro ao iniciar a aplicação:', err);
  }
};

start();