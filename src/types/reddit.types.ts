
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RedditUser {

  @Field()
  username: string

  @Field()
  karma: number

}