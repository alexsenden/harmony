import * as commentRepo from '../repos/commentRepo'
import { Comment } from '../models/comment'
import { HttpError } from '../models/error/httpError'

export const createComment = async (commentData: Comment): Promise<Comment> => {
  if (!commentData.userId) {
    throw new HttpError('userId is required', 400)
  } else if (!commentData.postId) {
    throw new HttpError('postId is required', 400)
  }

  return await commentRepo.createComment(commentData)
}

export const getComments = async (postId?: string) => {
  if (!postId) {
    return []
  }

  return await commentRepo.getComments(postId)
}

export const getCommentsByUserID = async (userID?: string) => {
  if (!userID) {
    return []
  }

  return await commentRepo.getCommentsByUserID(userID)
}
