import {Field, InputType} from 'type-graphql'
import {IsEmail, MaxLength, MinLength, Length} from 'class-validator'

@InputType()
export class LoginUserInput {
  @Field({nullable: true})
  @Length(1, 30, {message: 'The login must contain from 1 to 30 characters'})
  login: string

  @Field({nullable: true})
  @IsEmail() // Проверить что вводимые данные это email
  email: string

  @Field(() => String)
  password: string
}
