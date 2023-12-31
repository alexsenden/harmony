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
  try {
    const newUser = await userService.register(userData)
    const userCookie = await userService.assignUserCookie(newUser)
    res.cookie('userCookie', userCookie)
    res.json({
      userData: newUser,
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
    res.cookie('userCookie', await userService.assignUserCookie(loginUser))
    res.json({
      userData: loginUser,
    })
  } catch (error) {
    next(error)
  }
}

export const getUserByCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies.userCookie
    if (!cookie) {
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

export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username =
    typeof req.params.username === 'string' ? req.params.username : undefined

  try {
    res.json(await userService.getUserByUsername(username))
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
    const cookie = req.cookies.userCookie
    await userService.removeUserCookie(cookie)
    res.json(true)
  } catch (error) {
    next(error)
  }
}

const MAX_TEMP_TRIES = 20
export const getTempUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let tries = 0
    let successTemp = false
    let newUser, userCookie
    do {
      try {
        const userData = userService.getTempUserData()
        newUser = await userService.register(userData)
        userCookie = await userService.assignUserCookie(newUser)
        successTemp = true
      } finally {
        tries++
      }
    } while (tries < MAX_TEMP_TRIES && !successTemp)

    res.cookie('userCookie', userCookie)
    res.json({
      userData: newUser,
    })
  } catch (error) {
    next(error)
  }
}
