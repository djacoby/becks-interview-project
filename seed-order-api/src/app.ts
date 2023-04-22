import express, { type Express, type Request, type Response } from 'express';
import * as cors from 'cors';
import * as winston from 'winston';
import { errorLogger, logger } from 'express-winston';
import * as dotenv from 'dotenv';

import { router } from './router';

import { config } from './config';

dotenv.config();

const app: Express = express();
const port = config.api.port;

const corsOpts: cors.CorsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors.default(corsOpts));
app.use(express.json());

app.use(
  logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
  }),
);

app.use(
  errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
  }),
);

// Initialize routes
app.use('/', router);

// 404 catch all handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
