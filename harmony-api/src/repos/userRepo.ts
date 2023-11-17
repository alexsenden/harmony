import prisma from '../../prisma/prisma'
import { User as PrismaUser } from '@prisma/client'

import { User } from '../models/user'
import { HttpError } from '../models/error/httpError'
import { Login } from '../models/login'
import { Account } from '../models/account'

export const register = async (user: User): Promise<User> => {
  try {
    const userData = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        active: true,
      },
    })

    return mapPrismaUserToUser(userData)
  } catch (e) {
    throw new HttpError(`Username ${user.username} already exists`, 400)
  }
}

export const getUserByName = async (userName?: string): Promise<User> => {
  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        username: userName,
      },
    })

    return mapPrismaUserToUser(userData)
  } catch {
    throw new HttpError(`User with name ${userName} not found`, 404)
  }
}

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
  console.log('TESTMINE', userData)
  if (userData === null) {
    throw new HttpError('Invalid username or password', 400)
  }

  return mapPrismaUserToUser(userData)
}

export const getUserFromCookie = async (cookie: string): Promise<User> => {
  try {
    const userData = await prisma.user.findFirstOrThrow({
      where: {
        tokens: {
          some: {
            cookie: cookie,
          },
        },
      },
    })

    return mapPrismaUserToUser(userData)
  } catch {
    throw new HttpError(`User session cookie '${cookie}' does not exist`, 400)
  }
}

export const getUserByPartialUsername = async (
  partialName: string
): Promise<Array<Partial<User>>> => {
  return prisma.$queryRaw<Array<Partial<User>>>`
    select 
      user_id as userId,
      first_name as firstName,
      last_name as lastName,
      username
    from "user"
    where username ilike ${`${partialName}%`}
    limit 5;
  `
}

export const setUserData = async (userData: Account): Promise<Account> => {
  const userResult = prisma.user.update({
    where: {
      userId: userData.userId,
    },
    data: {
      bio: userData.bio,
      picture: userData.picture,
      firstName: userData.firstName,
      lastName: userData.lastName,
    },
  })

  return userResult
}

export const mapPrismaUserToUser = (user: PrismaUser): User => {
  return {
    userId: user.userId,
    username: user.username,
    password: '', // Redact password info
    createdAt: user.createdAt,
    active: user.active,
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    picture: user.picture,
  }
}
