import prisma from '../../prisma/prisma'
import { User } from '../models/user'
import { HttpError } from '../models/error/httpError'

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
      password: postResult.password,
      createdAt: postResult.createdAt,
      active: postResult.active,
      posts: [],
      likes: [],
      comments: [],
      follows: [],
      followers: [],
      firstName: postResult.firstName,
      lastName: postResult.lastName,
    }
  } catch (e) {
    throw new HttpError('Username already exists', 400)
  }
}
