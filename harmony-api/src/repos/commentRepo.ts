import prisma from '../../prisma/prisma'
import { Comment, CommentWithUser } from '../models/comment'

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
      post: {
        select: {
          title: true,
        },
      },
    },
  })
  return comments.map(comment => {
    return {
      commentId: comment.commentId,
      userId: comment.userId,
      postId: comment.postId,
      postTitle: comment.post.title,

      createdAt: comment.createdAt,
      content: comment.content || '',
      user: comment.user,
    }
  })
}

export const getCommentsByUserID = async (
  userID?: string
): Promise<Array<CommentWithUser>> => {
  const comments = await prisma.comment.findMany({
    where: {
      userId: userID,
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
      post: {
        select: {
          title: true,
        },
      },
    },
  })
  return comments.map(comment => {
    return {
      commentId: comment.commentId,
      userId: comment.userId,
      postId: comment.postId,
      postTitle: comment.post.title,
      createdAt: comment.createdAt,
      content: comment.content || '',
      user: comment.user,
    }
  })
}
