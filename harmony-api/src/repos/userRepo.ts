import prisma from '../../prisma/prisma'
import { Like as PrismaLike, Post as PrismaPost, Comment as PrismaComment, Follow as PrismaFollow} from '@prisma/client'
import { User } from '../models/user'
import { Post } from '../models/post'

export const register = async (userData: User): Promise<User> => {
  const postResult = await prisma.user.create({
    data: {
        username:  userData.username,
        password:  userData.password,
        firstName: userData.firstName,
        lastName:  userData.lastName,
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
}
