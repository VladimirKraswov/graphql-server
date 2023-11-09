import {Arg, Mutation, Resolver} from 'type-graphql'
import {sendEmail} from '../../../utils/sendEmail'
import {UserModel} from '../scheme'

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await UserModel.findOne({email})
    if (!user) {
      return true
    }

    const confirmUrl = `http://localhost:3000/change-password/${user._id}`
    sendEmail(user.email, confirmUrl)

    return true
  }
}
