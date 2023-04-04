import { Client } from 'pg';

import { config } from './config';

/**
 * Get database connection instance
 */
export const executeQuery = async (query: string, replacements: any[]) => {
  const db = new Client(config.db);

  db.connect();

  const result = await db.query(query, replacements);

  db.end();

  if (result.rows.length > 1) {
    return result.rows;
  }

  return result.rows[0];
};
