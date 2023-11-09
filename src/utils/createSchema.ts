import {buildSchema} from 'type-graphql'

import authChecker from './authChecker'

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + '/../entities/*/resolvers/*.resolver.ts'],
    authChecker,
  })
