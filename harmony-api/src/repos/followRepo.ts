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

export const followArtist = async (followInfo: Follow): Promise<Follow> => {
  try {
    const followResult = await prisma.followArtist.create({
      data: {
        followingId: followInfo.followingId,
        followerId: parseInt(followInfo.followerId),
      },
    })

    return {
      followingId: followResult.followingId,
      followerId: followResult.followerId.toString(),
    }
  } catch (e) {
    throw new HttpError('Already following artist', 400)
  }
}

export const unFollowArtist = async (followInfo: Follow): Promise<Follow> => {
  console.log(followInfo.followingId + ',' + followInfo.followerId)
  const followResult = await prisma.followArtist.delete({
    where: {
      followingId_followerId: {
        followingId: followInfo.followingId,
        followerId: parseInt(followInfo.followerId),
      },
    },
  })
  if (followResult === null) {
    throw new HttpError('Not following artist', 400)
  }
  return {
    followingId: followResult.followingId,
    followerId: followResult.followerId.toString(),
  }
}

export const followSong = async (followInfo: Follow): Promise<Follow> => {
  try {
    const followResult = await prisma.followSong.create({
      data: {
        followingId: followInfo.followingId,
        followerId: parseInt(followInfo.followerId),
      },
    })

    return {
      followingId: followResult.followingId,
      followerId: followResult.followerId.toString(),
    }
  } catch (e) {
    throw new HttpError('Already following song', 400)
  }
}

export const unFollowSong = async (followInfo: Follow): Promise<Follow> => {
  console.log(followInfo.followingId + ',' + followInfo.followerId)
  const followResult = await prisma.followSong.delete({
    where: {
      followingId_followerId: {
        followingId: followInfo.followingId,
        followerId: parseInt(followInfo.followerId),
      },
    },
  })
  if (followResult === null) {
    throw new HttpError('Not following song', 400)
  }
  return {
    followingId: followResult.followingId,
    followerId: followResult.followerId.toString(),
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

export const getArtistFollow = async (followInfo: Follow): Promise<boolean> => {
  const followResult = await prisma.followArtist.findFirst({
    where: {
      followerId: {
        equals: parseInt(followInfo.followerId),
      },
      followingId: {
        equals: followInfo.followingId,
      },
    },
  })
  return followResult !== null
}

export const getSongFollow = async (followInfo: Follow): Promise<boolean> => {
  const followResult = await prisma.followSong.findFirst({
    where: {
      followerId: {
        equals: parseInt(followInfo.followerId),
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

export const getArtistFollowCount = async (
  artistId: string
): Promise<number> => {
  const aggregation = await prisma.followArtist.aggregate({
    _count: {
      followingId: true,
    },
    where: {
      followingId: artistId,
    },
  })
  return aggregation._count.followingId
}

export const getSongFollowCount = async (songId: string): Promise<number> => {
  const aggregation = await prisma.followSong.aggregate({
    _count: {
      followingId: true,
    },
    where: {
      followingId: songId,
    },
  })
  return aggregation._count.followingId
}
