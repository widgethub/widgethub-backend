
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DevpostUser {

  @Field()
  username: string

  @Field()
  projectsCount: number

  @Field()
  hackathonsCount: number

  @Field()
  achievementsCount: number

  @Field()
  followers: number

  @Field()
  following: number

  @Field()
  likesCount: number

  @Field()
  avatarUrl: string

}