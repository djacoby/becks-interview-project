import {
  Router,
  type Request,
  type Response,
} from 'express';

/**
 * Base router
 */
export const router = Router();

router.get('/hello', (req: Request, res: Response) => {
  res.send({ res: 'Hello! '});
});
