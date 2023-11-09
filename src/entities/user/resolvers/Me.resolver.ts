import {Ctx, Query, Resolver, Authorized} from 'type-graphql'

import Context from '../../../types/context'
import {UserModel, User} from '../scheme'

@Resolver()
export class MeResolver {
  @Authorized() // Сообщаем что этот запрос работает только с авторизованными пользователями
  @Query(() => User, {description: 'Get current user'})
  async me(@Ctx() context: Context): Promise<User> {
    return UserModel.findById(context.user._id)
  }
}
