import {NextFunction, Request, Response} from 'express'
import * as loginService from '../../services/loginService'
import {Login} from "../../models/login";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const loginData = req.body as Login

  try {
    res.json(await loginService.loginUser(loginData))
  } catch (error) {
    next(error)
  }
}
