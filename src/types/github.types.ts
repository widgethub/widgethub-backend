
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class GithubUser {

  @Field()
  username: String

  @Field()
  followers: number
  
  @Field()
  following: number

  @Field()
  repoCount: number

  @Field()
  pastYearContributions: number

}