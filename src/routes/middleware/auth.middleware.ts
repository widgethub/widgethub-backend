import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../config';

export const checkAuth = (req, res, next) => {

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