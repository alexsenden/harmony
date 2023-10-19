import { NextFunction, Request, Response } from 'express'

import * as userService from '../../services/userService'
import { User } from '../../models/user'
import { Login } from '../../models/login'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body as User
  console.log(userData)
  try {
    const newUser = await userService.register(userData)
    const userCookie = await userService.assignUserCookie(newUser)
    res.json({
      userData: newUser,
      'Set-Cookie': 'userCookie = ' + userCookie,
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginData = req.body as Login
  try {
    const loginUser = await userService.login(loginData)
    res.json({
      userData: loginUser,
      'Set-Cookie':
        'userCookie = ' + (await userService.assignUserCookie(loginUser)),
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.headers.usercookie as string
    res.json({
      userData: await userService.getUserFromCookie(cookie),
    })
  } catch (error) {
    next(error)
  }
}

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.headers.usercookie as string
    userService.removeUserCookie(cookie)
    res.json(true)
  } catch (error) {
    next(error)
  }
}
