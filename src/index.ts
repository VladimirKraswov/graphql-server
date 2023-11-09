import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import {ApolloServer} from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
  AuthenticationError,
} from 'apollo-server-core'
import depthLimit from 'graphql-depth-limit'
import {createComplexityLimitRule} from 'graphql-validation-complexity'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import db from './db'

import objectRenameKey from './utils/objectRenameKey'
import formatValidationError from './utils/formatValidationError'

import Context from './types/context'
import {User} from './entities/user/scheme'
import {createSchema} from './utils/createSchema'

dotenv.config()

// Получаем информацию пользователя из JWT
const getUser = async (token: string) => {
  if (token) {
    try {
      const user = await jwt.verify(token, process.env.JWT_SECRET)
      objectRenameKey(user, 'id', '_id')
      return user as User
    } catch (err) {
      throw new AuthenticationError('Session invalid')
    }
  }
}

const main = async () => {
  const app = express()

  app.use(
    helmet({
      // contentSecurityPolicy: false,
      // https://github.com/graphql/graphql-playground/issues/1283
      crossOriginEmbedderPolicy: process.env.DEV === 'production',
    }),
  )
  app.use(
    cors({
      credentials: true,
      origin: `http://localhost:${process.env.PORT}`,
    }),
  )

  db.connect(process.env.DB_HOST)

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    formatError: formatValidationError, // Используем свое форматирование для ошибок валидации
    context: async (ctx: Context) => {
      const context = ctx
      const token = ctx.req.headers.authorization // Получаем из заголовков токен пользователя

      if (token) {
        const user = await getUser(token)
        context.user = user
      }
      return context
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({app})

  app.get('/rest', (req, res) => {
    res.json({data: 'api working'})
  })

  return app.listen(process.env.PORT, () => {
    apolloServer?.graphqlPath &&
      console.log(`GraphQL Server running at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`)
  })
}

main()
  .then(() => {
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  })
  .catch((e) => {
    console.log('⚡ Cannot launch server:', e.message)
  })
