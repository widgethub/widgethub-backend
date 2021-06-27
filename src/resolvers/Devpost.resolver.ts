
import { Arg, Query, Resolver } from 'type-graphql';
import { UserInputError } from 'apollo-server-errors';
import { JSDOM } from 'jsdom';
import { devpostRequest } from '../services/devpost.service';
import { DevpostUser } from  '../types/devpost.types';

@Resolver()
export class DevpostResolver {

  @Query(() => DevpostUser)
  async getDevpostUser(
    @Arg('username') username: string
  ): Promise<DevpostUser> {
    
    const devpostResp = await devpostRequest(username);
    if (devpostResp.isAxiosError) {
      throw new UserInputError('invalid devpost account');
    }

    const dom = new JSDOM(devpostResp);

    /* get devpost stats */
    const statsDom = dom.window.document.querySelector('#portfolio-navigation').querySelectorAll('span');
    const sanitized = [];
    for (const stat of statsDom) {
      sanitized.push(parseInt(stat.textContent));
    }

    /* get avatarUrl */
    const avatarUrl = dom.window.document.querySelector('#portfolio-user-photo').querySelector('img').getAttribute('src');

    /* sorta bad */
    const newDevpostUser: DevpostUser = {
      username: username,
      projectsCount: sanitized[0],
      hackathonsCount: sanitized[1],
      achievementsCount: sanitized[2],
      followers: sanitized[3],
      following: sanitized[4],
      likesCount: sanitized[5],
      avatarUrl: avatarUrl
    }

    return newDevpostUser;
  }

}