import {MaxLength, MinLength} from 'class-validator'
import {Field, InputType} from 'type-graphql'

@InputType()
export class PasswordInput {
  @MinLength(6, {
    message: 'password must be at least 6 characters long',
  })
  @MaxLength(50, {
    message: 'password must not be longer than 50 characters',
  })
  @Field(() => String)
  password: string
}
