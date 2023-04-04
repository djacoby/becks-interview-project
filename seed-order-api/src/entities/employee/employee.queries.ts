import { type Query } from '../../interface';

/**
 * Get query to get employee by id
 */
export const getGetEmployeeByIdQuery = (employeeId: number): Query => {
  return {
    query: `
      SELECT
        "id"
        ,"departmentId"
        ,"name"
        ,"email"
        ,"created"
        ,"updated"
      FROM employee
      WHERE "id" = $1
      AND "deleted" IS NULL;
    `,
    replacements: [employeeId],
  };
};
