//////////////////////////////////////////////////////////////////////////////////////////////////
//
// Эта схема поддерживает множественное наследование
// BaseClass - класс от которого наследуемся
// nameType - Имя типа, если используем схему более одного раза, для исключения конфликта имен
// Пример использования:
//    export class NewClassInput extends userInfoMixinInput(BaseClass)
// Пример использования при втором наследовании c отсутствующим базовым классом:
//    export class NewClass2Input extends userInfoMixinInput(class {})
// Также мы можем делать бесконечную вложенность:
//    export class NewClassInput extends userInfoMixinInput(PasswordMixinInput(class {}))
/////////////////////////////////////////////////////////////////////////////////////////////////

import {ClassType, Field, InputType} from 'type-graphql'
import {Length} from 'class-validator'

import {randomObjectName} from '../../../../utils/randomObjectName'

export const userInfoMixinInput = <T extends ClassType>(BaseClass?: T | null) => {
  @InputType(randomObjectName()) // Переименовать для исключения дублирования при множественном наследовании
  class UserInfoMixinInput extends BaseClass {
    @Field({nullable: true})
    @Length(1, 30)
    firstName: string

    @Field({nullable: true})
    @Length(1, 30)
    lastName: string

    @Field({nullable: true}) // <-- GraphQL. Эти данные не обязательные для заполнения
    avatar: string
  }
  return UserInfoMixinInput
}
