import { Router } from 'express';

import { router as productRouter } from './entities/product/product.routes';
import { router as healthRouter } from './entities/health.routes';
import { API_ROUTES } from './constants';

/**
 * Base router
 */
export const router = Router();

router.use(API_ROUTES.health, healthRouter);
router.use(API_ROUTES.product, productRouter);
