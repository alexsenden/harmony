import * as postRepo from '../repos/postRepo'
import { Post, PostType } from '../models/post'
import { validateTopicId } from './topicService'
import { HttpError } from '../models/error/httpError'

export const createPost = async (postData?: Post): Promise<Post> => {
  const validatedPost = validatePost(postData)
  return postRepo.createPost(validatedPost)
}

const validatePost = (postData?: Post): Post => {
  validateTopicId(postData?.topicId)

  switch (postData?.postType) {
    case PostType.DISCUSSION:
      validateDiscussion(postData)
      return postData
    case PostType.POLL:
      //validatePoll(postData)
      return postData
    case PostType.REVIEW:
      //validateReview(postData)
      return postData
  }

  throw new Error(`Unsupported postType: ${postData?.postType}`)
}

const validateDiscussion = (postData?: Post) => {
  const errorMessages = []

  if (!postData?.userId) {
    errorMessages.push(
      'userId field is required to create a new discussion post'
    )
  }
  if (!postData?.title) {
    errorMessages.push(
      'title field is required to create a new discussion post'
    )
  }
  if (!postData?.body) {
    errorMessages.push('body field is required to create a new discussion post')
  }

  if (errorMessages.length !== 0) {
    throw new HttpError(errorMessages.join('; '), 400)
  }
}
