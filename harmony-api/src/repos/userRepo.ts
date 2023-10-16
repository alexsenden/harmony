import prisma from '../../prisma/prisma'
import {User} from '../models/user'

export const createUserCookie = async (userData: User): Promise<string> => {
  const cookieResult = await prisma.userCookie.create({
    data: {
      userId: userData.userId
    }
  })
  return cookieResult.cookie
}
export const checkUserCookie = async (userData: User, cookie: string): Promise<boolean> => {
  const cookieResult = await prisma.userCookie.findFirst({
    where: {
      userId: {
        equals: userData.userId
      },
      cookie: {
        equals: cookie
      }
    }
  })
  return cookieResult!==null
}
