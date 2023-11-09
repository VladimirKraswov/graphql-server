import {Request, Response} from 'express'
import {User} from '../entities/user/scheme/User'

interface Context {
  req: Request
  res: Response
  user: User | null
}

export default Context
