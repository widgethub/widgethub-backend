
import { Arg, Query, Resolver } from "type-graphql";
import { GithubUser } from 'src/types/Github.types';

@Resolver()
export class GithubResolver {

  @Query(() => [GithubUser])
  getUsers(
    @Arg('username') username: string
  ): GithubUser[] {
    return [];
  }

}