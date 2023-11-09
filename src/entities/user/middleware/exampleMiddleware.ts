import {MiddlewareFn} from 'type-graphql'
import Context from '../../../types/context'

export const exampleMiddleware: MiddlewareFn<Context> = async ({context}, next) => {
  console.log('Middleware worked out')
  return next() // Идем дальше
}
