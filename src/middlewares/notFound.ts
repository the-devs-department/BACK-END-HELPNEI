import { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    error: true,
    statusCode: 404,
    message: 'Rota não encontrada',
  });
}
