import {Ctx, Mutation, Resolver, Authorized} from 'type-graphql'

import {UserModel} from '../scheme'
import Context from '../../../types/context'

@Resolver()
export class DeleteAccountResolver {
  // @Authorized("ADMIN") // Сообщаем что этот запрос работает только с авторизованными пользователями
  // @Authorized(["ADMIN", "MODERATOR"]) // Сообщаем что этот запрос работает только с авторизованными пользователями
  @Authorized() // Сообщаем что этот запрос работает только с авторизованными пользователями
  @Mutation(() => Boolean)
  async deleteAccount(@Ctx() context: Context): Promise<boolean> {
    return !!(await UserModel.findByIdAndDelete({_id: context.user._id}))
  }
}
