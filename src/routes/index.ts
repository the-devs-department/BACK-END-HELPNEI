import { Router } from 'express';
import * as controllers from '../controllers';

const router = Router();

// Rotas do usuário
router.get('/users', controllers.userController.getAll.bind(controllers.userController));
router.get('/users/:userId', controllers.userController.getOne.bind(controllers.userController));
router.post('/users', controllers.userController.create.bind(controllers.userController));
router.put('/users/:userId', controllers.userController.update.bind(controllers.userController));
router.delete('/users/:userId', controllers.userController.delete.bind(controllers.userController));

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
    router.get(`/${path}`, controller.getAll.bind(controller));
    router.get(`/${path}/:${paramName}`, controller.getOne.bind(controller));
    router.post(`/${path}`, controller.create.bind(controller));
    router.put(`/${path}/:${paramName}`, controller.update.bind(controller));
    router.delete(`/${path}/:${paramName}`, controller.delete.bind(controller));
});

export default router;
