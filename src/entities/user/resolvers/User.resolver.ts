import {Arg, Query, Resolver} from 'type-graphql'

import {UserModel, User} from '../scheme'

@Resolver()
export class UserResolver {
  @Query(() => User, {nullable: true})
  async user(@Arg('_id') _id: string): Promise<User | null> {
    return UserModel.findById(_id)
  }
}
