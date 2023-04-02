import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).send({ result: 'okay' });
});
