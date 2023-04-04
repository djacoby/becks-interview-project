import { type Employee } from '@becks-interview-project/sdk';

import { getGetEmployeeByIdQuery } from './employee.queries';
import { executeQuery } from '../../execute-query';

/**
 * Get employee by id
 */
export const getEmployeeById = async (
  employeeId: number,
): Promise<Employee> => {
  const { query, replacements } = getGetEmployeeByIdQuery(employeeId);

  const result = await executeQuery(query, replacements);

  return result;
};
