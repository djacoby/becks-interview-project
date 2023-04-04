import { type Query } from '../../interface';

/**
 * Get query to get single customer by id
 */
export const getGetCustomerByIdQuery = (id: number): Query => {
  return {
    query: `
      SELECT
        "id"
        ,"name"
        ,"organization"
        ,"email"
        ,"addressLine"
        ,"city"
        ,"state"
        ,"zip"
        ,"country"
      FROM customer
      WHERE "id" = $1
      AND "deleted" IS NULL;
    `,
    replacements: [id],
  };
};
