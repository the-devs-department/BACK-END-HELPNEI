import { Router } from 'express';
import * as controllers from '../controllers';

const router = Router();

// Rotas do usuário
router.get('/users', controllers.userController.getAll.bind(controllers.userController));
router.get('/users/:id', controllers.userController.getOne.bind(controllers.userController));
router.post('/users', controllers.userController.create.bind(controllers.userController));
router.put('/users/:id', controllers.userController.update.bind(controllers.userController));
router.delete('/users/:id', controllers.userController.delete.bind(controllers.userController));

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
    router.get(`/${path}`, controller.getAll.bind(controller));
    router.get(`/${path}/:id`, controller.getOne.bind(controller));
    router.post(`/${path}`, controller.create.bind(controller));
    router.put(`/${path}/:id`, controller.update.bind(controller));
    router.delete(`/${path}/:id`, controller.delete.bind(controller));
});

export default router;
