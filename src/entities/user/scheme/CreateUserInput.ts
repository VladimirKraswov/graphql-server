import {Field, InputType} from 'type-graphql'
import {IsEmail, Length} from 'class-validator'

import {IsEmailAlreadyExist} from '../validators/isEmailAlreadyExist'
import {PasswordInput} from './shared/PasswordInput'
import {userInfoMixinInput} from './shared/userInfoMixinInput'

// Описание сразу для GraphQL, Mongoose и TypeScript
@InputType()
export class CreateUserInput extends userInfoMixinInput(PasswordInput) {
  @Field(() => String)
  @Length(1, 30, {message: 'The login must contain from 1 to 30 characters'})
  login: string

  @IsEmail() // Проверить что вводимые данные это email
  @IsEmailAlreadyExist({message: 'Email is already in use'}) // Использовать пользовательский декоратор валидации
  @Field(() => String) // <-- GraphQL. Эти данные обязательные для заполнения
  email: string
}
