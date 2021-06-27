
import { Arg, Query, Resolver } from "type-graphql";
import { UserInputError } from 'apollo-server-errors';

import { githubRequest } from "../services/github.service";
import { GithubUser } from '../types/github.types';

@Resolver()
export class GithubResolver {

  @Query(() => GithubUser)
  async getGithubUser(
    @Arg('username') username: string
  ): Promise<GithubUser> {

    const githubResp = await githubRequest(username); 
    if (githubResp.hasOwnProperty('errors')) {
      throw new UserInputError('invalid github account');
    }

    const userInfo = githubResp.data.user;

    let newGithubUser = new GithubUser();
    newGithubUser.username = userInfo.login;
    newGithubUser.followers = userInfo.followers.totalCount;
    newGithubUser.following = userInfo.following.totalCount;
    newGithubUser.repoCount = userInfo.repositories.totalCount;
    newGithubUser.pastYearContributions =  userInfo.contributionsCollection.contributionCalendar.totalContributions;
    newGithubUser.avatarUrl = userInfo.avatarUrl;

    return newGithubUser;
  }

}