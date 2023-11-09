import {
  getModelForClass,
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
  post,
  modelOptions,
} from '@typegoose/typegoose'
import {AsQueryMethod} from '@typegoose/typegoose/lib/types'
import {Field, ObjectType, ID, Root} from 'type-graphql'

import getHasPassword from '../../../utils/getHasPassword'

// Вспомогательный метод позволяющий найти пользователя по email
function findByEmail(this: ReturnModelType<typeof User, QueryHelpers>, email: User['email']) {
  return this.findOne({email})
}

// Описание вспомогательных методов
interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>
}

async function beforeSaving() {
  // Если изменяется поле 'password'
  if (this.isModified('password')) {
    this.password = await getHasPassword(this.password) // Сохраним в БД хэшированный пароль
  }
}

// Описание сразу для GraphQL, Mongoose и TypeScript
@pre<User>('save', beforeSaving) // Выполнить перед сохранением в БД
// @post<User>('save', (user) => {
//   // Выполнить после сохранения
//   console.log(user.firstName)
// })
// TODO: Включить когда будет решена проблема с отменой expireAfterSeconds для подтвержденных пользователей
//@index({createdAt: 1}, {expireAfterSeconds: 60})
@modelOptions({schemaOptions: {timestamps: true}})
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string

  @Field(() => String) // <-- GraphQL . Я хочу обязательно получать эти данные из GraphQL при запросе
  @prop({required: true, unique: true}) // <-- Mongoose type. Я хочу получать эти данные из БД при запросе
  login: string // <-- TypeScript

  @Field({nullable: true}) // <-- GraphQL. Я могу не получить эти данные при GraphQL запросе
  @prop({required: false}) // <-- Mongoose. Я могу не получить эти данные при запросе к БД
  firstName: string

  @Field({nullable: true})
  @prop({required: false}) // Mongoose type
  lastName: string

  // @Field({nullable: true})
  // name(@Root() parent: User): string {
  //   return `${parent.firstName} ${parent.lastName}`
  // }

  @Field(() => String)
  @prop({lowercase: true, required: true, unique: true}) // Говорим что это поле обязательно, преобразуем его в lowercase и должно быть уникальным
  email: string

  // Пароль мы не хотим возвращать в ответах GraphQL поэтому описание @Field(() => String) не добавляем
  @prop({required: true})
  password: string

  @Field({nullable: true})
  @prop({required: false})
  avatar: string

  @Field({nullable: true})
  token: string

  @prop({required: true, default: false}) // Обязательное поле со значением по умолчанию false
  confirmed: boolean

  // @prop({type: Date, default: Date.now})
  // createdAt: Date
}

// Создаем модель на основе класса
export const UserModel = getModelForClass<typeof User, QueryHelpers>(User, {
  schemaOptions: {},
})
// export const UserModel = getModelForClass<typeof User, QueryHelpers>(User, {schemaOptions: {timestamps: true}})
