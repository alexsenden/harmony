import {NextFunction, Request, Response} from 'express'
import * as loginService from '../../services/loginService'
import {Login} from "../../models/login";
import {assignUserCookie} from "../../services/userService";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const loginData = req.body as Login
  try {
    const loginUser = await loginService.loginUser(loginData)
    res.json({userData: loginUser,'Set-Cookie': 'userCookie = '+ await assignUserCookie(loginUser)})
  } catch (error) {
    next(error)
  }
}
