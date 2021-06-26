
import express from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { checkAuth } from './middleware/auth.middleware';

export const profileRouter = express.Router();

profileRouter.get(
  '/',
  checkAuth,
  (req: express.Request, res: express.Response) => {
    res.send('profile endpoint');
});

profileRouter.post(
  '/providers',
  checkAuth,
  (req: express.Request, res: express.Response) => {

});