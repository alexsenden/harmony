import prisma from '../../prisma/prisma'
import {
  PostType as PrismaPostType,
  Post as PrismaPost,
  Song,
  Artist,
  Album,
  User,
  PollOption,
  Like,
} from '@prisma/client'
import { Post, PostType } from '../models/post'
import { Comment, CommentWithUser } from '../models/comment'

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
  }
}

export const createLike = async (likeData: Like): Promise<Like> => {
  const likeResult = await prisma.like.create({
    data: {
      userId: likeData.userId,
      postId: likeData.postId,
    },
  })

  return likeResult
}

export const getLikesByUserId = async (
  userId?: string
): Promise<Array<Like>> => {
  const likes = await prisma.like.findMany({
    where: {
      userId: userId,
    },
  })
  return likes.map(like => {
    return like
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

export const createComment = async (commentData: Comment): Promise<Comment> => {
  const commentResult = await prisma.comment.create({
    data: {
      userId: commentData.userId,
      postId: commentData.postId,
      content: commentData.content,
    },
  })
  return {
    commentId: commentResult.commentId,
    userId: commentResult.userId,
    postId: commentResult.postId,
    createdAt: commentResult.createdAt,
    content: commentResult.content || '',
  }
}

export const getComments = async (
  postId?: string
): Promise<Array<CommentWithUser>> => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    orderBy: {
      createdAt: 'desc',
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
  return comments.map(comment => {
    return {
      commentId: comment.commentId,
      userId: comment.userId,
      postId: comment.postId,
      createdAt: comment.createdAt,
      content: comment.content || '',
      user: comment.user,
    }
  })
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
      likes: true,
      _count: {
        select: {
          comments: true,
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
      likes: true,
      _count: {
        select: {
          comments: true,
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
      likes: true,
      _count: {
        select: {
          comments: true,
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
      likes: true,
      _count: {
        select: {
          comments: true,
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
  likes: Array<Like>
  _count: {
    comments?: number
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
    numComments: post._count.comments,
    numLikes: post.likes.length,
  }
}
