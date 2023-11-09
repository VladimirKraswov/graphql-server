import {Query, Resolver} from 'type-graphql'
import {User, UserModel} from '../scheme'

const MAX_QUERY_ENTITIES = 100

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return UserModel.find({}).limit(MAX_QUERY_ENTITIES)
  }
}
