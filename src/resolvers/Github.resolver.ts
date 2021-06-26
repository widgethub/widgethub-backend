
import { Arg, Query, Resolver } from "type-graphql";
import { githubRequest } from "../services/github.service";
import { GithubUser } from '../types/github.types';
import { inspect } from 'util';

@Resolver()
export class GithubResolver {

  @Query(() => GithubUser)
  async getUser(
    @Arg('username') username: string
  ): Promise<GithubUser> {

    const githubResp = await githubRequest(username); 
    // console.log(githubResp)
    const userInfo = githubResp.data.user;

    console.log(inspect(userInfo, { depth: null }));

    let newGithubUser = new GithubUser();
    newGithubUser.username = userInfo.login;
    newGithubUser.followers = userInfo.followers.totalCount;
    newGithubUser.following = userInfo.following.totalCount;
    newGithubUser.repoCount = userInfo.repositories.totalCount;
    newGithubUser.pastYearContributions =  userInfo.contributionsCollection.contributionCalendar.totalContributions;

    return newGithubUser;
  }

}