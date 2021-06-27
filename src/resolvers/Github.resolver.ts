
import { Arg, Query, Resolver } from "type-graphql";
import { UserInputError } from 'apollo-server-errors';

import { githubRequest } from "../services/provider.service";
import { GithubUser, GithubRepo } from '../types/github.types';

import { inspect } from 'util';

@Resolver()
export class GithubResolver {

  @Query(() => GithubUser)
  async getGithubUser(
    @Arg('username') username: string
  ): Promise<GithubUser> {

    const githubResp = await githubRequest(username); 
    console.log(inspect(githubResp.data.user, {depth: 6}))
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

    let repoList: GithubRepo[] = []
    for (const repo of userInfo.itemShowcase.items.edges) {
      let newGithubRepo = new GithubRepo();
      newGithubRepo.name = repo.node.nameWithOwner;
      newGithubRepo.url = repo.node.url;
      newGithubRepo.description = repo.node.description;
      newGithubRepo.language = repo.node.primaryLanguage.name;
      newGithubRepo.languageColor = repo.node.primaryLanguage.color;
      newGithubRepo.forkCount = repo.node.forkCount;
      newGithubRepo.starCount = repo.node.stargazerCount;

      repoList.push(newGithubRepo);
    }

    newGithubUser.pinnedRepos = repoList;

    return newGithubUser;
  }

}