import {Field, InputType} from 'type-graphql'
import {Length, IsEmail} from 'class-validator'

import {IsEmailAlreadyExist} from '../validators/isEmailAlreadyExist'
import {userInfoMixinInput} from './shared/userInfoMixinInput'
@InputType()
export class ChangeUserInfoInput extends userInfoMixinInput(class {}) {
  @Field({nullable: true})
  @Length(1, 30, {message: 'The login must contain from 1 to 30 characters'})
  login: string

  @IsEmail() // Проверить что вводимые данные это email
  @IsEmailAlreadyExist({message: 'Email is already in use'}) // Использовать пользовательский декоратор валидации
  @Field({nullable: true}) // <-- GraphQL. Эти данные обязательные для заполнения
  email: string
}
