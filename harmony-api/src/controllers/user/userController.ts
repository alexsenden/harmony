import { NextFunction, Request, Response } from 'express'

import * as userService from '../../services/userService'
import { User } from '../../models/user'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.body as User
  console.log(userData)

  try {
    res.json(await userService.register(userData))
  } catch (error) {
    next(error)
  }
}
