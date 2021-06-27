
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TwitterUser {

  @Field()
  username: string

  @Field()
  followers: number

  @Field()
  following: number

  @Field()
  recentTweet: string

  @Field()
  avatarUrl: string

}