import {Arg, Query, Resolver} from 'type-graphql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {UserModel, LoginUserInput, User} from '../scheme'
import {AuthenticationError} from 'apollo-server-core'

@Resolver()
export class LoginResolver {
  @Query(() => User)
  async login(@Arg('input') input: LoginUserInput): Promise<User> {
    try {
      if (input.email) {
        input.email = input.email.trim().toLowerCase() // Нормализуем e-mail
      }
      const user = await UserModel.findOne({
        $or: [{login: input.login}, {email: input.email}],
      })

      if (!user) {
        throw new AuthenticationError('User not found')
      }

      // Если пароли не совпадают, выбрасываем ошибку аутентификации
      const isValid = await bcrypt.compare(input.password, user.password)
      if (!isValid) {
        throw new AuthenticationError('Invalid password')
      }

      if (!user.confirmed) {
        throw new AuthenticationError('You have not confirmed your email address')
      }

      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      user.token = token
      return user
    } catch (error) {
      console.log(error)
    }
  }
}
