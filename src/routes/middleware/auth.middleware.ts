
import express from 'express';

import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../config';

// export interface UserIdRequest extends express.Request {
//   userData: any
// }

export const checkAuth = (req: any, res: express.Response, next: express.NextFunction) => {

  try {
    const token = req.header("x-access-token");
    const decoded = jwt.verify(token, JWT_KEY);
    req.userData = decoded;

  } catch(err) {

    return res.status(401).json({
      message: 'Unauthorized login'
    })

  }

  next();
}