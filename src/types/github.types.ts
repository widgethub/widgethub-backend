
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

}