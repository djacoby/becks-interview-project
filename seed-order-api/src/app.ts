import express, { Express } from 'express';
import dotenv from 'dotenv';
const cors = require('cors');

import { router } from './v0/router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const corsOpts = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOpts));
app.use('/', router);

app.listen(port, () => {
  console.log('test')
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
