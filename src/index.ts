
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express, { response } from 'express';

import { GithubResolver } from './resolvers/Github.resolver';
import { githubRequest } from './services/github.service';

const main = async () => {

  const schema = await buildSchema({
    resolvers: [ GithubResolver ]
  });

  const apollo = new ApolloServer({ schema });

  const app = express();

  apollo.applyMiddleware({ app });

  app.get('/', async (req, res) => {

    res.send('Home page');
  });

  app.listen(3000, () => {
    console.log('server started');
  });

}

main();
