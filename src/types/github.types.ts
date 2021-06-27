
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class GithubUser {

  @Field()
  username: string

  @Field()
  followers: number
  
  @Field()
  following: number

  @Field()
  repoCount: number

  @Field()
  pastYearContributions: number

  @Field()
  avatarUrl: string

  @Field(() => [GithubRepo])
  pinnedRepos: GithubRepo[]

}

@ObjectType()
export class GithubRepo {

  @Field()
  name: string

  @Field()
  url: string

  @Field()
  description: string

  @Field()
  language: string

  @Field()
  languageColor: string

  @Field()
  forkCount: number

  @Field()
  starCount: number

}