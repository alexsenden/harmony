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
  try {
    const followResult = await prisma.follow.delete({
      where: {
        followingId_followerId: {
          followingId: followInfo.followingId,
          followerId: followInfo.followerId,
        },
      },
    })

    return {
      followingId: followResult.followingId,
      followerId: followResult.followerId,
    }
  } catch {
    throw new HttpError('Not following user', 400)
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
  try {
    const followResult = await prisma.followArtist.delete({
      where: {
        followingId_followerId: {
          followingId: followInfo.followingId,
          followerId: parseInt(followInfo.followerId),
        },
      },
    })
    return {
      followingId: followResult.followingId,
      followerId: followResult.followerId.toString(),
    }
  } catch {
    throw new HttpError('Not following artist', 400)
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
  try {
    const followResult = await prisma.followSong.delete({
      where: {
        followingId_followerId: {
          followingId: followInfo.followingId,
          followerId: parseInt(followInfo.followerId),
        },
      },
    })
    return {
      followingId: followResult.followingId,
      followerId: followResult.followerId.toString(),
    }
  } catch {
    throw new HttpError('Not following song', 400)
  }
}

export const followAlbum = async (followInfo: Follow): Promise<Follow> => {
  try {
    const followResult = await prisma.followAlbum.create({
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
    throw new HttpError('Already following album', 400)
  }
}

export const unFollowAlbum = async (followInfo: Follow): Promise<Follow> => {
  try {
    const followResult = await prisma.followAlbum.delete({
      where: {
        followingId_followerId: {
          followingId: followInfo.followingId,
          followerId: parseInt(followInfo.followerId),
        },
      },
    })
    return {
      followingId: followResult.followingId,
      followerId: followResult.followerId.toString(),
    }
  } catch {
    throw new HttpError('Not following album', 400)
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

export const getAlbumFollow = async (followInfo: Follow): Promise<boolean> => {
  const followResult = await prisma.followAlbum.findFirst({
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
      followerId: true,
    },
    where: {
      followerId: parseInt(artistId),
    },
  })
  return aggregation._count.followerId
}

export const getSongFollowCount = async (songId: string): Promise<number> => {
  console.log('Repo: ' + songId)
  const aggregation = await prisma.followSong.aggregate({
    _count: {
      followerId: true,
    },
    where: {
      followerId: parseInt(songId),
    },
  })
  return aggregation._count.followerId
}

export const getAlbumFollowCount = async (albumId: string): Promise<number> => {
  const aggregation = await prisma.followAlbum.aggregate({
    _count: {
      followerId: true,
    },
    where: {
      followerId: parseInt(albumId),
    },
  })
  return aggregation._count.followerId
}
