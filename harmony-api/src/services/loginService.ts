import * as loginRepo from '../repos/loginRepo'
import { Login } from '../models/login'
import { User } from '../models/user'

export const loginUser = async(loginData: Login): Promise<User> => {
  return loginRepo.getUserByLoginInfo(loginData)
}
