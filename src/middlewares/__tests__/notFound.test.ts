import request from 'supertest';
import express from 'express';
import { notFound } from '../notFound';

const app = express();

app.use('/existe', (_req, res) => {
  res.send('Ok');
});

// Middleware 404
app.use(notFound);

describe('Middleware notFound', () => {
  it('retorna 404 para rota inexistente', async () => {
    const res = await request(app).get('/nao-existe');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: true,
      message: 'Rota não encontrada',
    });
  });
});
