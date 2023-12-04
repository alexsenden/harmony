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
  Prisma,
} from '@prisma/client'
import { Post, PostType } from '../models/post'
import { User } from '../models/user'
import { PollOptionVote } from '../models/pollOption'
import { FollowFeedFilter } from '../models/followFeedFilter'

const FEED_PAGE_SIZE = 20

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

export const getPostsByUserId = async (
  offset: number,
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
    ...getPostIncludeParams(requester),
    ...getFeedSortParams(offset),
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getPostsByArtistId = async (
  offset: number,
  artistId: number,
  requester?: User
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      artistId: artistId,
    },
    ...getPostIncludeParams(requester),
    ...getFeedSortParams(offset),
  })
  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getPostsByAlbumId = async (
  offset: number,
  albumId: number,
  requester?: User
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      albumId: albumId,
    },
    ...getPostIncludeParams(requester),
    ...getFeedSortParams(offset),
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}
export const getPostsBySongId = async (
  offset: number,
  songId: number,
  requester?: User
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      songId: Number(songId),
    },
    ...getPostIncludeParams(requester),
    ...getFeedSortParams(offset),
  })
  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

export const getTrendingPosts = async (
  offset: number,
  requester?: User
): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    ...getPostIncludeParams(requester),
    ...getFeedSortParams(offset),
  })

  return posts.map(post => {
    return mapPrismaPostToPost(post)
  })
}

interface IFollowFeedFilterFlags {
  album?: boolean
  artist?: boolean
  song?: boolean
  user?: boolean
}

const getFollowFeedFilterFlagsFromEnum = (
  filter: FollowFeedFilter
): IFollowFeedFilterFlags => {
  switch (filter) {
    case FollowFeedFilter.ALBUM:
      return { album: true }
    case FollowFeedFilter.ARTIST:
      return { artist: true }
    case FollowFeedFilter.SONG:
      return { song: true }
    case FollowFeedFilter.USER:
      return { user: true }
    case FollowFeedFilter.ALL:
      return { album: true, artist: true, song: true, user: true }
  }
}

export const getFollowingPosts = async (
  filter: FollowFeedFilter,
  offset: number,
  requester: User
) => {
  const filterFlags = getFollowFeedFilterFlagsFromEnum(filter)

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          ...(filterFlags.album
            ? {
                album: {
                  followers: {
                    some: {
                      followingId: {
                        equals: requester.userId,
                      },
                    },
                  },
                },
              }
            : {}),
        },
        {
          ...(filterFlags.artist
            ? {
                artist: {
                  followers: {
                    some: {
                      followingId: {
                        equals: requester.userId,
                      },
                    },
                  },
                },
              }
            : {}),
        },
        {
          ...(filterFlags.song
            ? {
                song: {
                  followers: {
                    some: {
                      followingId: {
                        equals: requester.userId,
                      },
                    },
                  },
                },
              }
            : {}),
        },
        {
          ...(filterFlags.user
            ? {
                user: {
                  follows: {
                    some: {
                      followerId: {
                        equals: requester.userId,
                      },
                    },
                  },
                },
              }
            : {}),
        },
      ],
    },
    ...getPostIncludeParams(requester),
    ...getFeedSortParams(offset),
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
    ...getPostIncludeParams(requester),
  })

  return mapPrismaPostToPost(post)
}

const getPostIncludeParams = (requester?: User) => {
  return {
    include: {
      user: true,
      pollOptions: {
        ...getPollOptionParams(requester?.userId),
        orderBy: {
          entryNumber: Prisma.SortOrder.asc,
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
  }
}

const getFeedSortParams = (offset: number) => {
  return {
    orderBy: {
      createdAt: Prisma.SortOrder.desc,
    },
    skip: offset,
    take: FEED_PAGE_SIZE,
  }
}

const getPollOptionParams = (userId: string | undefined) => {
  return {
    include: {
      pollVotes: {
        where: {
          userId: userId || '',
        },
      },
      _count: {
        select: {
          pollVotes: true,
        },
      },
    },
  }
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

export const mapPrismaPostToPost = (post: PostWithRelations): Post => {
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
    user: {
      username: post.user.username,
      userId: post.user.userId,
      picture: post.user.picture,
    },
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
    entryNumber: pollOption.entryNumber,
    votes: pollOption._count.pollVotes || 0,
    votedOn: pollOption.pollVotes.length > 0,
  }
}

const checkPollOptionsForVote = (
  pollOptions: Array<PollOptionWithRelations>
): boolean => {
  for (const pollOption of pollOptions) {
    if (pollOption.pollVotes && pollOption.pollVotes.length > 0) {
      return true
    }
  }
  return false
}

export const sumPollVotes = (
  pollOptions: Array<PollOptionWithRelations>
): number => {
  let sum = 0

  for (const pollOption of pollOptions) {
    pollOption._count = pollOption._count || {}
    sum = sum + (pollOption._count.pollVotes || 0)
  }
  return sum
}
