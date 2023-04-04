import { Router } from 'express';

import { createOrderController } from './order.controller';

/**
 * Order router
 */
export const router = Router();

/**
 * POST /order
 */
router.post(`/`, createOrderController);
