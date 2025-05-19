import { Router } from 'express';
import * as controllers from '../controllers/mainController';
import { DashboardData } from '../services/dashboardService';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Rotas do usuário
router.get('/users', authenticate, controllers.userController.getAll.bind(controllers.userController));
router.get('/users/:userId', authenticate, controllers.userController.getOne.bind(controllers.userController));
router.post('/users', authenticate, controllers.userController.create.bind(controllers.userController));
router.put('/users/:userId', authenticate, controllers.userController.update.bind(controllers.userController));
router.delete('/users/:userId', authenticate, controllers.userController.delete.bind(controllers.userController));

// Mapeamento de parâmetros de ID para cada entidade
const idParameters = {
    'sponsors': 'sponsorId',
    'locations': 'locationId',
    'stores': 'storeId',
    'transactions': 'transactionId',
    'app-usage': 'usageId',
    'user-locations': 'userLocationId',
    'sponsored-requests': 'requestId'
};

// Repetição para as outras entidades
const entities = {
    'sponsors': controllers.sponsorController,
    'locations': controllers.locationController,
    'stores': controllers.storeController,
    'transactions': controllers.transactionController,
    'app-usage': controllers.userAppUsageController,
    'user-locations': controllers.userLocationController,
    'sponsored-requests': controllers.sponsoredRequestController
};

Object.entries(entities).forEach(([path, controller]) => {
    const paramName = idParameters[path] || 'id';
    router.get(`/${path}`, authenticate, controller.getAll.bind(controller));
    router.get(`/${path}/:${paramName}`, authenticate, controller.getOne.bind(controller));
    router.post(`/${path}`, authenticate, controller.create.bind(controller));
    router.put(`/${path}/:${paramName}`, authenticate, controller.update.bind(controller));
    router.delete(`/${path}/:${paramName}`, authenticate, controller.delete.bind(controller));
});

//Pegas as informações do dashboard
router.get('/dashboard/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;
        const dashboardData = await DashboardData(companyId);
        res.json(dashboardData);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter dados do dashboard', error });
    }
});
export default router;
