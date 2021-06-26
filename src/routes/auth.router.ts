
import express from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

import { authenticateUser, registerUser } from '../services/db.service';

export const authRouter = express.Router();

export const authValidator = (): ValidationChain[] => [
  body('username').notEmpty(),
  body('password').notEmpty()
]

authRouter.post(
  '/register',
  authValidator(),
  async (req: express.Request, res: express.Response) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) { return res.status(400).json({ errors: valErr.array() }); }

    const { username, password } = req.body;
    const token = await registerUser(username, password);

    res.send({ accessToken: token });
});

authRouter.post(
  '/login',
  authValidator(),
  async (req: express.Request, res: express.Response) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) { return res.status(400).json({ errors: valErr.array() }); }

    const { username, password } = req.body;
    const token = await authenticateUser(username, password);

    if (Object.keys(token).length === 0) {
      res.status(401).json({ message: "Incorrect username or password" })
    } else {
      res.send({ accessToken: token });
    }
});
