import prisma from '../../prisma/prisma'
import { Login } from '../models/login'
import {User} from '../models/user'

export const getUserByLoginInfo = async (loginData: Login): Promise<User> => {
  const userData = await prisma.user.findFirst({
    where: {
      username: {
        equals: loginData.username,
      },
      password: {
        equals: loginData.password,
      },
    },
  })
  if (userData === null)
    return Promise.reject('Invalid username or password')
  return {
    userId: userData.userId,
    username: userData.username,
    password: userData.password,
  }
}
