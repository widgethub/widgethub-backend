
import { Arg, Query, Resolver } from 'type-graphql';
import { JSDOM } from 'jsdom';

import { redditRequest } from '../services/reddit.service';
import { redditUser } from '../types/reddit.types';

@Resolver()
export class RedditResolver {

  @Query(() => redditUser)
  async getRedditUser(
    @Arg('username') username: string
  ): Promise<RedditUser> {

  }
}