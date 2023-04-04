import { Router } from 'express';

import { router as healthRouter } from './entities/health.routes';
import { router as productRouter } from './entities/product/product.routes';
import { router as orderRouter } from './entities/order/order.routes';
import { router as customerRouter } from './entities/customer/customer.routes';

import { API_ROUTES } from './constants';

/**
 * Base router
 */
export const router = Router();

router.use(API_ROUTES.health, healthRouter);
router.use(API_ROUTES.product, productRouter);
router.use(API_ROUTES.order, orderRouter);
router.use(API_ROUTES.customer, customerRouter);
