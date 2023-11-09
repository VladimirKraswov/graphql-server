import {Arg, Ctx, Mutation, Resolver, Authorized} from 'type-graphql'

import {ChangeUserInfoInput, User, UserModel} from '../scheme'
import Context from '../../../types/context'

@Resolver()
export class ChangeUserInfoResolver {
  @Authorized()
  // @UseMiddleware(exampleMiddleware)// Выполнить перед мутацией
  // @UseMiddleware(exampleMiddleware, exampleMiddleware2)// Их может быть несколько
  @Mutation(() => User)
  async changeUserInfo(@Arg('input') input: ChangeUserInfoInput, @Ctx() context: Context): Promise<User> {
    return UserModel.findOneAndUpdate(
      {
        _id: context.user._id,
      },
      {
        $set: {
          ...input,
        },
      },
      {
        new: true,
      },
    )
  }
}
