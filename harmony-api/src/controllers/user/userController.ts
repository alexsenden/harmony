import { NextFunction, Request, Response } from 'express'

import * as userService from '../../services/userService'
import { User } from '../../models/user'
import { Login } from '../../models/login'
import { Account } from '../../models/account'

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

export const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body as Account
  try {
    const userBio = await userService.setUserData(userData)
    res.json({
      userData: userBio,
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
    if (cookie==='') {
      res.json(null)
    } else {
      const userData = await userService.getUserFromCookie(cookie)

      res.json({
        userData: userData,
      })
    }

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
    await userService.removeUserCookie(cookie)
    res.json(true)
  } catch (error) {
    next(error)
  }
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const username =
    typeof req.query.username === 'string' ? req.query.username : undefined

  try {
    res.json(await userService.getUserByUsername(username))
  } catch (error) {
    next(error)
  }
}
