import * as loginRepo from '../repos/loginRepo'
import { Login } from '../models/login'
import { User } from '../models/user'
import {HttpError} from "../models/error/httpError";

export const loginUser = async(loginData: Login): Promise<User> => {
  try {
    return await loginRepo.getUserByLoginInfo(loginData)
  } catch (error) {
    throw new HttpError(`Incorrect Credentials`, 401)
  }
}
