
import { Arg, Query, Resolver } from 'type-graphql';
import { JSDOM } from 'jsdom';

import { redditRequest } from '../services/provider.service';
import { RedditUser } from '../types/reddit.types';

@Resolver()
export class RedditResolver {

  @Query(() => RedditUser)
  async getRedditUser(
    @Arg('username') username: string
  ): Promise<RedditUser> {

  }
}