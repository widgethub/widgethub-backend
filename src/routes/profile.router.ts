
import express from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { getUserProviders, newUserProvider, deleteUserProvider, updateUserProvider } from '../services/db.service';
import { checkAuth } from './middleware/auth.middleware';
import { Provider } from '../types/provider.types';

export const profileRouter = express.Router();

const providerValidator = (prefixName: string): ValidationChain[] => [
  body(prefixName).notEmpty(),
  body(`${prefixName}.name`).notEmpty(),
  body(`${prefixName}.info`).notEmpty(),
  body(`${prefixName}.provider`).notEmpty()
]

profileRouter.get(
  '/providers',
  checkAuth,
  async (req: any, res: express.Response) => {

    // maybe double check this is defined or sm first
    const db_resp = await getUserProviders(req.userData.user_id); 

    let providersList: Provider[] = [];
    for (const row of db_resp) {
      providersList.push({
        id: row.id,
        provider: row.provider,
        name: row.name,
        info: row.info
      });
    }

    res.send({ providers: providersList });
});

profileRouter.post(
  '/providers',
  providerValidator('newProvider'),
  checkAuth,
  async (req: any, res: express.Response) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) { return res.status(400).json({ errors: valErr.array() }); }

    // need to check if provider is of right type
    const dbResponse = await newUserProvider(req.userData.user_id, req.body.newProvider);
    const newProviderId = dbResponse.rows[0].id;

    res.status(200).json({ id: newProviderId });
});

profileRouter.patch(
  '/providers',
  providerValidator('updatedProvider'),
  checkAuth,
  async (req: any, res: express.Response) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) { return res.status(400).json({ errors: valErr.array() }); }

    await updateUserProvider(req.body.updatedProvider);

    res.status(200).json({ message: 'success' });
});

profileRouter.delete(
  '/providers',
  body('provider_id').notEmpty().isInt(),
  checkAuth,
  async (req: any, res: express.Response) => {
    const valErr = validationResult(req);
    if (!valErr.isEmpty()) { return res.status(400).json({ errors: valErr.array() }); }

    await deleteUserProvider(req.body.provider_id);

    res.status(200).json({ message: 'success' });
});
