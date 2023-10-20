import prisma from '../../prisma/prisma'
import { HttpError } from '../models/error/httpError'
import { Follow } from '../models/follow'

export const followUser = async (followInfo: Follow): Promise<Follow> => {
  try {
    const followResult = await prisma.follow.create({
      data: {
        followingId: followInfo.followingId,
        followerId: followInfo.followerId,
      },
    })

    return {
      followingId: followResult.followingId,
      followerId: followResult.followerId,
    }
  } catch (e) {
    throw new HttpError('Already following user', 400)
  }
}

export const unFollowUser = async (followInfo: Follow): Promise<Follow> => {
  const followResult = await prisma.follow.delete({
    where: {
      followingId_followerId: {
        followingId: followInfo.followingId,
        followerId: followInfo.followerId,
      },
    },
  })
  if (followResult === null) {
    throw new HttpError('Not following user', 400)
  }
  return {
    followingId: followResult.followingId,
    followerId: followResult.followerId,
  }
}

export const getFollow = async (followInfo: Follow): Promise<boolean> => {
  const followResult = await prisma.follow.findFirst({
    where: {
      followerId: {
        equals: followInfo.followerId,
      },
      followingId: {
        equals: followInfo.followingId,
      },
    },
  })
  return followResult !== null
}

export const getFollowCount = async (userId: string): Promise<number> => {
  const aggregation = await prisma.follow.aggregate({
    _count: {
      followingId: true,
    },
    where: {
      followingId: userId,
    },
  })
  return aggregation._count.followingId
}
