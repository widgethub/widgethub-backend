
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express, { response } from 'express';
import cors from 'cors';

import { GithubResolver } from './resolvers/Github.resolver';
import { githubRequest } from './services/github.service';

import { authRouter } from './routes/auth.router';
import { profileRouter } from './routes/profile.router';

import { postgresConnect } from './services/db.service';

const main = async () => {

  const schema = await buildSchema({
    resolvers: [ GithubResolver ]
  });

  const apollo = new ApolloServer({ schema });
  const app = express();
  apollo.applyMiddleware({ app });

  app.use(express.json());
  app.use(cors());

  /* routes */
  app.use('/auth', authRouter);
  app.use('/profile', profileRouter);

  app.listen(5001, () => {
    console.log('server started');
  });

  postgresConnect();

}

main();
