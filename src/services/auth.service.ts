
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config';
import { postgresClient } from './db.service';

export const registerUser = async (username: string, password: string): Promise<string> => {
  return '';
}

export const authenticateUser = async (username: string, password: string): Promise<string> => {
  return '';
}

export const generateToken = (username: string): string => {
  return jwt.sign(
    { username: username },
    JWT_KEY,
    { expiresIn: "24h" }
  );
}