
import express from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

import { registerUser } from '../services/auth.service';

export const authRouter = express.Router();

export const authValidator = (): ValidationChain[] => [
  body('username').notEmpty(),
  body('password').notEmpty()
]

authRouter.post(
  '/register',
  authValidator(),
  async (req: express.Request, res: express.Response) => {
      try { validationResult(req).throw; }
      catch(err) { res.status(400).json({ errors: err.array() }); }

      const { username, password } = req.body;
      const token = await registerUser(username, password);

      res.send({ accessToken: token });
});

authRouter.post(
  '/login',
  authValidator(),
  (req: express.Request, res: express.Response) => {
      try { validationResult(req).throw; }
      catch(err) { res.status(400).json({ errors: err.array() }); }

      const { username, password } = req.body;

});
