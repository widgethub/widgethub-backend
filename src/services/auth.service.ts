
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config';


export const generateToken = (user_id: string): string => {
  return jwt.sign(
    { user_id: user_id },
    JWT_KEY,
    { expiresIn: "24h" }
  );
}
