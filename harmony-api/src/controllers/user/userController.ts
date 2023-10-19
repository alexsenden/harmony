import { NextFunction, Request, Response } from 'express'

import * as userService from '../../services/userService'
import { User } from '../../models/user'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body as User
  console.log(userData)

  try {
    res.json(await userService.register(userData))
  } catch (error) {
    next(error)
  }
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const username =
    typeof req.query.username === 'string' ? req.query.username : undefined

  try {
    res.json(await userService.get(username))
  } catch (error) {
    next(error)
  }
}
