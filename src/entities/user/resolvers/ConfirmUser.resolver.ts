import {Arg, Ctx, Mutation, Resolver} from 'type-graphql'
import Context from '../../../types/context'
import {UserModel} from '../scheme'

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('userId') userId: string, @Ctx() context: Context): Promise<boolean> {
    if (!userId) {
      return false
    }

    await UserModel.updateOne({_id: userId}, {confirmed: true})

    // TODO: Необходимо отменить expireAfterSeconds для подтвержденного пользователя
    // await UserModel.schema.index({createdAt: 1}, {expireAfterSeconds: 100000}) // Это не работает

    return true
  }
}
