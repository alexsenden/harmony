import * as likeRepo from '../repos/likeRepo'
import { HttpError } from '../models/error/httpError'
import { Like } from '../models/like'

export const createLike = async (likeData: Like): Promise<Like> => {
  if (!likeData.userId) {
    throw new HttpError('userId is required', 400)
  } else if (!likeData.postId) {
    throw new HttpError('postId is required', 400)
  }

  return await likeRepo.createLike(likeData)
}

export const getLikes = async (postId?: string) => {
  if (!postId) {
    return []
  }

  return await likeRepo.getLikes(postId)
}

export const deleteLike = async (likeData: Like): Promise<Like> => {
  if (!likeData.userId) {
    throw new HttpError('userId is required', 400)
  } else if (!likeData.postId) {
    throw new HttpError('postId is required', 400)
  }

  return await likeRepo.deleteLike(likeData)
}
