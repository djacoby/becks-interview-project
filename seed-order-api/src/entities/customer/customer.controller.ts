import { type Request, type Response } from 'express';

import { getCustomerById } from './customer.service';

/**
 * Get customer by id controller
 */
export const getCustomerByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  const customer = await getCustomerById(Number(id));

  if (!customer) {
    res.status(404).json({ message: 'No customer found' });
  }

  res.status(200).json(customer);
};
