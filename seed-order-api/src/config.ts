import dotenv from 'dotenv';

dotenv.config();

interface Config {
  api: {
    host: string;
    port: number;
  };
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
}

// TODO: use env vars
/**
 * Configuration object containing all environment variables
 */
export const config: Config = {
  api: {
    host: 'localhost',
    port: 8000,
  },
  db: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'pass',
    database: 'becks',
  },
};
