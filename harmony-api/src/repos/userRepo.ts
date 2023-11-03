import prisma from '../../prisma/prisma'
import { User } from '../models/user'
import { HttpError } from '../models/error/httpError'
import { Login } from '../models/login'
import { Account } from '../models/account'

export const register = async (userData: User): Promise<User> => {
  try {
    const postResult = await prisma.user.create({
      data: {
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        active: true,
      },
    })

    // other objects will come from another commit and then I will complete this part
    return {
      userId: postResult.userId,
      username: postResult.username,
      password: '',
      createdAt: postResult.createdAt,
      active: postResult.active,
      firstName: postResult.firstName,
      lastName: postResult.lastName,
      bio: postResult.bio,
      picture: postResult.picture,
    }
  } catch (e) {
    throw new HttpError('Username already exists', 400)
  }
}

export const getUserByName = async (userName?: string): Promise<User> => {
  const user = await prisma.user
    .findUniqueOrThrow({
      where: {
        username: userName,
      },
    })
    .catch(() => {
      throw new HttpError(`User with name ${userName} not found`, 404)
    })

  user.password = ''
  return user
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
  if (userData === null) {
    return Promise.reject('Invalid username or password')
  }
  return {
    userId: userData.userId,
    username: userData.username,
    password: '',
    createdAt: userData.createdAt,
    active: userData.active,
    firstName: userData.firstName,
    lastName: userData.lastName,
    bio: userData.bio,
    picture: userData.picture,
  }
}

export const assignUserCookie = async (userData: User): Promise<string> => {
  const cookieData = await prisma.userCookie.create({
    data: {
      userId: userData.userId,
    },
  })
  return cookieData.cookie
}

export const getUserFromCookie = async (cookie: string): Promise<User> => {
  console.log(cookie)

  const cookieData = await prisma.userCookie
    .findFirstOrThrow({
      where: {
        cookie: {
          equals: cookie,
        },
      },
    })
    .catch(() => {
      return Promise.reject('Cookie does not exist')
    })

  console.log(cookieData)

  const userData = await prisma.user.findFirst({
    where: {
      userId: {
        equals: cookieData.userId,
      },
    },
  })

  if (userData === null) {
    return Promise.reject('No user connected to cookie')
  }

  console.log(userData)

  return {
    userId: userData.userId,
    username: userData.username,
    password: '', // It felt like a bit of a security issue to give password with the token
    createdAt: userData.createdAt,
    active: userData.active,
    firstName: userData.firstName,
    lastName: userData.lastName,
    bio: userData.bio,
    picture: userData.picture,
  }
}

export const removeUserCookie = async (cookie: string) => {
  await prisma.userCookie.delete({
    where: {
      cookie: cookie,
    },
  })
}

export const setUserData = async (userData: Account): Promise<Account> => {
  try {
    const userResult = await prisma.user.update({
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

    // other objects will come from another commit and then I will complete this part
    return Promise.resolve(userResult)
  } catch (e) {
    throw new HttpError('Username already exists', 400)
  }
}
