
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config';
import { postgresClient } from './db.service';

export const registerUser = async (username: string, password: string): Promise<string> => postgresClient.query(
    'INSERT INTO Users(username, password) VALUES($1, $2) RETURNING username',
    [username, password]
  )
  .then(res => generateToken(res.rows[0].username))
  .catch(err => err);

export const authenticateUser = async (username: string, password: string) => postgresClient.query(
  'SELECT * FROM Users WHERE username = $1 AND password = $2',
  [username, password]
)
  .then(res => generateToken(res.rows[0].username))
  .catch(err => err);

export const generateToken = (username: string): string => {
  return jwt.sign(
    { username: username },
    JWT_KEY,
    { expiresIn: "24h" }
  );
}
