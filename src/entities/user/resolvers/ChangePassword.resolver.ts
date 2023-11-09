import {Arg, Mutation, Resolver} from 'type-graphql'

import getHasPassword from '../../../utils/getHasPassword'
import {User, UserModel} from '../scheme'
import {ChangePasswordInput} from '../scheme/ChangePasswordInput'

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, {nullable: true})
  async changePassword(@Arg('input') {token, password}: ChangePasswordInput): Promise<User | null> {
    // const userId = await redis.get(frorgotPasswordPrefix + token)

    // if (!userId) {
    //   return null
    // }

    // const user = await UserModel.findOne(userId)

    // if (!user) {
    //   return null
    // }

    // user.password = await getHasPassword(password)
    // await user.save()

    // return user
    return null
  }
}
