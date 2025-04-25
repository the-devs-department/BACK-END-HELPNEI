import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  status?: number
}

export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.status || 500
  const message = err.message || 'Erro interno no servidor'

  console.error(`[ERROR] ${statusCode} - ${message}`)

  res.status(statusCode).json({
    error: true,
    message,
  })
}
