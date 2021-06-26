
import { Client } from 'pg';
import { POSTGRES_CONNECTION_STRING } from '../config';

import { Provider } from 'src/types/provider.types';
import { generateToken } from './auth.service';

export const postgresClient = new Client({
  connectionString: POSTGRES_CONNECTION_STRING
});

export const postgresConnect = () => {
  postgresClient.connect()
    .then(() => console.log('successfully connected to db'))
    .catch(err => console.error(err));
}

/* helper */
export const getUserId = async(username: string): Promise<number> => postgresClient.query(
    'SELECT id FROM Users WHERE username = $1',
    [username]
  )
  .then(res => res.rows[0].id)
  .catch(err => err);

/* auth */
export const registerUser = async (username: string, password: string): Promise<string> => postgresClient.query(
    'INSERT INTO Users(username, password) VALUES($1, $2) RETURNING id',
    [username, password]
  )
  .then(res => generateToken(res.rows[0].id))
  .catch(err => err);

export const authenticateUser = async (username: string, password: string) => postgresClient.query(
  'SELECT id FROM Users WHERE username = $1 AND password = $2',
  [username, password]
)
  .then(res => generateToken(res.rows[0].id))
  .catch(err => err);

/* providers */
export const getUserProviders = async (user_id: number) => postgresClient.query(
  'SELECT * FROM Users U INNER JOIN Providers P ON P.user_id = U.id WHERE U.id = $1',
  [user_id]
)
  .then(res => res.rows)
  .catch(err => err);

export const newUserProvider = async (user_id: number, newProvider: Provider) => postgresClient.query(
  'INSERT INTO Providers(name, info, provider, user_id) VALUES($1, $2, $3, $4) RETURNING *',
  [newProvider.name, newProvider.info, newProvider.provider, user_id]
)
  .then(res => res)
  .catch(err => err);

// export const setUserProviders = async (username: string) => postgresClient.query(
//   ''
// )