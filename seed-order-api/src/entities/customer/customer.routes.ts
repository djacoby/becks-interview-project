import { Router } from 'express';

import { getCustomerByIdController } from './customer.controller';

/**
 * Customer router
 */
export const router = Router();
/**
 * GET /customer/:id
 */
router.get(`/:id`, getCustomerByIdController);
