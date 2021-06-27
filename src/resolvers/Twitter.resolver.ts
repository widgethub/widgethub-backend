
import { Arg, Query, Resolver } from 'type-graphql';
import { JSDOM } from 'jsdom';

import { twitterRequest } from '../services/provider.service';
import { TwitterUser } from '../types/twitter.types';

@Resolver()
export class TwitterResolver {

  @Query(() => TwitterUser)
  async getTwitterUser(
    @Arg('username') username: string
  ): Promise<TwitterUser> {

    const twitterReq = await twitterRequest(username);

    /* error check for invalid user somehow */

    const dom = new JSDOM(twitterReq);
    const socialDom = dom.window.document.querySelectorAll('article')
    console.log(socialDom.length)
    for (const social of socialDom) {
      console.log(social)
    }

    const newTwitterUser: TwitterUser = {
      username: username,
      followers: 0,
      following: 0,
      recentTweet: '',
      avatarUrl: ''
    }

    return newTwitterUser;
  }
}