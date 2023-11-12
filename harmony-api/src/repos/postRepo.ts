import prisma from '../../prisma/prisma'
import {
  PostType as PrismaPostType,
  Post as PrismaPost,
  Song,
  Artist,
  Album,
  User as PrismaUser,
  PollOption,
  Like,
} from '@prisma/client'
import { Post, PostType } from '../models/post'
import { User } from '../models/user'
import { PollOptionVote } from '../models/pollOption'

export const createPost = async (postData: Post): Promise<Post> => {
  const postResult = await prisma.post.create({
    data: {
      userId: postData.userId,
      postType: PrismaPostType[postData.postType],
      title: postData.title,
      content: postData.body,
      rating: postData.rating,
      artistId: postData.topicId.artistId,
      albumId: postData.topicId.albumId,
      songId: postData.topicId.songId,
    },
  })

  return {
    userId: postResult.userId,
    postId: postResult.postId,
    postType: PostType[postResult.postType],
    title: postResult.title,
    body: postResult.content || '',
    numLikes: 0,
    numComments: 0,
    rating: Number(postResult.rating) || undefined,
    topicId: {
      artistId: postResult.artistId || undefined,
      albumId: postResult.albumId || undefined,
      songId: postResult.songId || undefined,
    },
    createdAt: postResult.createdAt,
  }
}

export const getPostByUserId = async (
  userID: string,
  requester?: User
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      userId: {
        contains: userID,
        mode: 'insensitive',
      },
    },
    include: {
      user: true,
      pollOptions: {
        include: {
          pollVotes: {
            where: {
              userId: requester?.userId || '',
            },
          },
          _count: {
            select: {
              pollVotes: true,
            },
          },
        },
      },
      song: true,
      album: true,
      artist: true,
      likes: {
        where: {
          userId: requester?.userId || '',
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getTrendingPosts = async (
  requester?: User
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      pollOptions: {
        include: {
          pollVotes: {
            where: {
              userId: requester?.userId || '',
            },
          },
          _count: {
            select: {
              pollVotes: true,
            },
          },
        },
      },
      song: true,
      album: true,
      artist: true,
      likes: {
        where: {
          userId: requester?.userId || '',
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getFollowingUserPosts = async (
  userId: string
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      user: {
        follows: {
          some: {
            followerId: {
              equals: userId,
            },
          },
        },
      },
    },
    include: {
      user: true,
      pollOptions: {
        include: {
          pollVotes: {
            where: {
              userId: userId,
            },
          },
          _count: {
            select: {
              pollVotes: true,
            },
          },
        },
      },
      song: true,
      album: true,
      artist: true,
      likes: {
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getFollowingArtistPosts = async (
  userId: string
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      artist: {
        followers: {
          some: {
            followingId: {
              equals: userId,
            },
          },
        },
      },
    },
    include: {
      user: true,
      pollOptions: true,
      song: true,
      album: true,
      artist: true,
      likes: {
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getFollowingSongPosts = async (
  userId: string
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      song: {
        followers: {
          some: {
            followingId: {
              equals: userId,
            },
          },
        },
      },
    },
    include: {
      user: true,
      pollOptions: true,
      song: true,
      album: true,
      artist: true,
      likes: {
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getFollowingAlbumPosts = async (
  userId: string
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      album: {
        followers: {
          some: {
            followingId: {
              equals: userId,
            },
          },
        },
      },
    },
    include: {
      user: true,
      pollOptions: true,
      song: true,
      album: true,
      artist: true,
      likes: {
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getPostById = async (
  postId: string,
  requester?: User
): Promise<Post> => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      postId: postId,
    },
    include: {
      user: true,
      pollOptions: {
        include: {
          pollVotes: {
            where: {
              userId: requester?.userId || '',
            },
          },
          _count: {
            select: {
              pollVotes: true,
            },
          },
        },
      },
      song: true,
      album: true,
      artist: true,
      likes: {
        where: {
          userId: requester?.userId || '',
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  })

  return mapPrismaPostToPost(post)
}

interface PostWithRelations extends PrismaPost {
  song: Song | null
  artist: Artist | null
  album: Album | null
  user: PrismaUser
  pollOptions: Array<PollOptionWithRelations>
  likes: Array<Like>
  _count: {
    comments?: number
    likes?: number
  }
}

interface PollOptionWithRelations extends PollOption {
  pollVotes?: Array<PollOptionVote>
  _count?: {
    pollVotes?: number
  }
}

interface PollOptionWithVotes extends PollOption {
  votes?: number
  votedOn?: boolean
}

const mapPrismaPostToPost = (post: PostWithRelations): Post => {
  return {
    postId: post.postId,
    userId: post.userId,
    title: post.title,
    topicId: {
      artistId: post.artistId || undefined,
      albumId: post.albumId || undefined,
      songId: post.songId || undefined,
    },
    postType: PostType[post.postType],
    body: post.content || undefined,
    pollOptions: post.pollOptions.map(mapPrismaPollToPoll),
    rating: Number(post.rating) || undefined,
    topicName:
      post.song?.songName || post.album?.albumName || post.artist?.artistName,
    user: post.user,
    numComments: post._count.comments,
    numLikes: post._count.likes,
    numVotes: sumPollVotes(post.pollOptions),
    isLiked: post.likes.length > 0,
    isVoted: checkPollOptionsForVote(post.pollOptions),
    createdAt: post.createdAt,
  }
}

const mapPrismaPollToPoll = (
  pollOption: PollOptionWithRelations
): PollOptionWithVotes => {
  pollOption._count = pollOption._count || {}
  pollOption.pollVotes = pollOption.pollVotes || []
  return {
    pollOptionId: pollOption.pollOptionId,
    postId: pollOption.postId,
    option: pollOption.option,
    votes: pollOption?._count.pollVotes || 0,
    votedOn: pollOption?.pollVotes.length > 0,
  }
}

const checkPollOptionsForVote = (
  pollOptions: Array<PollOptionWithRelations>
): boolean => {
  for (const pollOption of pollOptions) {
    pollOption.pollVotes = pollOption.pollVotes || []
    if (pollOption.pollVotes.length > 0) {
      return true
    }
  }
  return false
}

const sumPollVotes = (pollOptions: Array<PollOptionWithRelations>): number => {
  let sum = 0

  for (const pollOption of pollOptions) {
    pollOption._count = pollOption._count || {}
    sum = sum + (pollOption._count.pollVotes || 0)
  }
  return sum
}
