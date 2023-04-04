import { type Customer } from '@becks-interview-project/sdk';

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
