import prisma from '../../prisma/prisma'
import { Like } from '../models/like'

export const createLike = async (likeData: Like): Promise<Like> => {
  const likeResult = await prisma.like.create({
    data: {
      userId: likeData.userId,
      postId: likeData.postId,
    },
  })

  return likeResult
}

export const deleteLike = async (likeData: Like): Promise<Like> => {
  const deleteLike = await prisma.like.delete({
    where: {
      userId_postId: {
        userId: likeData.userId,
        postId: likeData.postId,
      },
    },
  })

  return deleteLike
}
