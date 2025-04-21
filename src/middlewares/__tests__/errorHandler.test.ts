import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../errorHandler';

const app = express();

app.get('/erro', (_req: Request, _res: Response, next: NextFunction) => {
  const erro = new Error('Erro simulado');
  (erro as any).status = 418; // Teapot 🍵 só de exemplo
  next(erro);
});

// Middleware de erro deve vir depois
app.use(errorHandler);

describe('Middleware errorHandler', () => {
  it('retorna o erro corretamente', async () => {
    const res = await request(app).get('/erro');
    expect(res.statusCode).toBe(418);
    expect(res.body).toEqual({
      error: true,
      message: 'Erro simulado',
    });
  });

  it('retorna erro 500 se nenhum status for definido', async () => {
    const appSemStatus = express();

    appSemStatus.get('/erro500', (_req, _res, next) => {
      next(new Error('Falha genérica'));
    });

    appSemStatus.use(errorHandler);

    const res = await request(appSemStatus).get('/erro500');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: true,
      message: 'Falha genérica',
    });
  });
});
