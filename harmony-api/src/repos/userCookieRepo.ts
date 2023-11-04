import prisma from '../../prisma/prisma'

import { User } from '../models/user'

export const assignUserCookie = async (userData: User): Promise<string> => {
  const cookieData = await prisma.userCookie.create({
    data: {
      userId: userData.userId,
    },
  })
  return cookieData.cookie
}

export const removeUserCookie = async (cookie: string) => {
  await prisma.userCookie.delete({
    where: {
      cookie: cookie,
    },
  })
}
