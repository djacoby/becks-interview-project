import { type Customer } from '../../interface';

import { getGetCustomerByIdQuery } from './customer.queries';

import { executeQuery } from '../../execute-query';

/**
 * Get customer by id
 */
export const getCustomerById = async (id: number): Promise<Customer> => {
  const { query, replacements } = getGetCustomerByIdQuery(id);

  const result = await executeQuery(query, replacements);

  return result;
};
