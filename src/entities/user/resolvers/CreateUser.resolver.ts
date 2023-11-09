import {Arg, Mutation, Resolver} from 'type-graphql'
import jwt from 'jsonwebtoken'

import {CreateUserInput, User, UserModel} from '../scheme'
import {createConfirmationUrl} from '../../../utils/createConfirmationUrl'
import {sendEmail} from '../../../utils/sendEmail'
import gravatar from '../../../utils/gravatar'

@Resolver()
export class CreateUserResolver {
  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    try {
      if (!input.avatar) {
        input.avatar = gravatar(input.email)
      }

      const user = await UserModel.create(input)
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      user.token = token

      // Сохраняем юзера которого хотим подтвердить и возвращаем url на которую должны перейти для подтверждения с токеном подтверждения
      const confirmUrl = await createConfirmationUrl(user._id)
      sendEmail(user.email, confirmUrl) // Отправить письмо для подтверждения

      return user
    } catch (error) {
      console.log(error)
    }
  }
}
