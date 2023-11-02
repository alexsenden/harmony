import prisma from '../../prisma/prisma'
import {
  PostType as PrismaPostType,
  Post as PrismaPost,
  Song,
  Artist,
  Album,
  User,
  PollOption,
  Prisma,
} from '@prisma/client'
import { Post, PostType } from '../models/post'

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
    rating: Number(postResult.rating) || undefined,
    topicId: {
      artistId: postResult.artistId || undefined,
      albumId: postResult.albumId || undefined,
      songId: postResult.songId || undefined,
    },
  }
}

export const getPostByUserId = async (userID: string): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    where: {
      userId: {
        contains: userID,
        mode: 'insensitive',
      },
    },
    include: {
      user: true,
      pollOptions: true,
      song: true,
      album: true,
      artist: true,
      _count: {
        select: {
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

export const getTrendingPosts = async (): Promise<Array<Post>> => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      pollOptions: true,
      song: true,
      album: true,
      artist: true,
      _count: {
        select: {
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

export const getFollowingPosts = async (
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
      pollOptions: true,
      song: true,
      album: true,
      artist: true,
      _count: {
        select: {
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

export const getPostById = async (postId: string): Promise<Post> => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      postId: postId,
    },
    include: {
      user: true,
      pollOptions: true,
      song: true,
      album: true,
      artist: true,
      _count: {
        select: {
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
  user: User
  pollOptions: Array<PollOption>
  _count: {
    likes?: number
  }
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
    pollOptions: post.pollOptions,
    rating: Number(post.rating) || undefined,
    topicName:
      post.song?.songName || post.album?.albumName || post.artist?.artistName,
    user: post.user,
    numLikes: post._count.likes || 0,
  }
}
