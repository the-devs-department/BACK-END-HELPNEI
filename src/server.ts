import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import authRoutes from './routes/authRoutes';
import { DashboardData } from './services/dashboardService';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/dashboard/:companyId', async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;
    const dashboardData = await DashboardData(companyId);
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar dados do dashboard' });
  }
});

app.use('/api', routes);
app.use("/api/auth", authRoutes);

// Middleware for 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro:', err.stack);
  res.status(500).json({ error: true, message: err.message || 'Erro interno do servidor' });
});

export default app; 