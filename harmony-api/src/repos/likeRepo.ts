import prisma from '../../prisma/prisma'
import { Like, LikeWithUser } from '../models/like'

export const createLike = async (likeData: Like): Promise<Like> => {
  const likeResult = await prisma.like.create({
    data: {
      userId: likeData.userId,
      postId: likeData.postId,
    },
  })

  return likeResult
}

export const getLikes = async (
  postId?: string
): Promise<Array<LikeWithUser>> => {
  const likes = await prisma.like.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: {
        select: {
          username: true,
          picture: true,
        },
      },
    },
  })

  return likes.map(like => {
    return {
      userId: like.userId,
      postId: like.postId,
      user: like.user,
    }
  })
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
