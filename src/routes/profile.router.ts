
import express from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { getUserProviders } from '../services/db.service';
import { checkAuth } from './middleware/auth.middleware';
import { Provider } from '../types/provider.types';

export const profileRouter = express.Router();

profileRouter.get(
  '/providers',
  checkAuth,
  async (req: any, res: express.Response) => {

    // maybe double check this is defined or sm first
    const user_id = req.userData.user_id
    const db_resp = await getUserProviders(user_id); 

    let providersList = [];
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
  body('provider_id').notEmpty(),
  body('newProvider').notEmpty(),
  checkAuth,
  (req: express.Request, res: express.Response) => {
    try { validationResult(req).throw; }
    catch(err) { res.status(400).json({ errors: err.array() }); }

});