import * as userRepo from '../repos/userRepo'
import {User} from '../models/user';

export const assignUserCookie = async (userData: User): Promise<string> => {
  return userRepo.createUserCookie(userData)
}
export const validateUserCookie = (userData: User, cookie: string): Promise<boolean> => {
  return userRepo.checkUserCookie(userData,cookie)
}
