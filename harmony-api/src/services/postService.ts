import * as postRepo from '../repos/postRepo'
import * as pollOptionRepo from '../repos/pollOptionRepo'
import { Post, PostType } from '../models/post'
import { validateTopicId } from './topicService'
import { HttpError } from '../models/error/httpError'
import { PollOption } from '../models/pollOption'

export const createPost = async (postData?: Post): Promise<Post> => {
  const validatedPost = validatePost(postData)
  const postResult = await postRepo.createPost(validatedPost)

  if (postData?.postType === PostType.POLL) {
    const pollOptionResult: Array<Promise<PollOption>> = []

    for (const pollOption of postData.pollOptions || []) {
      pollOptionResult.push(
        pollOptionRepo.createPollOption({
          pollOptionData: pollOption,
          postId: postResult.postId,
        })
      )
    }

    postResult.pollOptions = await Promise.all(pollOptionResult)
  }

  return postResult
}

export const validatePost = (postData?: Post): Post => {
  if (!postData) {
    throw new HttpError('Post data is required to create new post', 400)
  }

  let errorMessages = validateTopicId(postData?.topicId)
  errorMessages = errorMessages.concat(validateUserId(postData))
  errorMessages = errorMessages.concat(validateTitle(postData))

  switch (postData?.postType) {
    case PostType.DISCUSSION:
      errorMessages = errorMessages.concat(validateBody(postData))
      break
    case PostType.POLL:
      errorMessages = errorMessages.concat(validatePollOptions(postData))
      break
    case PostType.REVIEW:
      errorMessages = errorMessages.concat(validateBody(postData))
      errorMessages = errorMessages.concat(validateRating(postData))
      break
    default:
      errorMessages.push(`Unsupported postType: ${postData?.postType}`)
  }

  if (errorMessages.length > 0) {
    throw new HttpError(errorMessages.join(';\n'), 400)
  }

  return postData
}

export const validateUserId = (postData?: Post): Array<string> => {
  if (!postData?.userId) {
    return ['userId field is required to create a new post']
  }

  return []
}

export const validateTitle = (postData?: Post): Array<string> => {
  if (!postData?.title) {
    return ['title field is required to create a new post']
  }

  return []
}

export const validateBody = (postData: Post): Array<string> => {
  if (!postData.body) {
    return ['body field is required to create a new discussion or review post']
  }

  return []
}

export const validateRating = (postData: Post): Array<string> => {
  const errorMessages = []

  if (!postData.rating && postData.rating !== 0) {
    errorMessages.push('rating field is required to create a new review post')
  } else if (postData.rating < 0 || postData.rating > 5) {
    errorMessages.push('rating field must be in the domain [0, 5]')
  }

  return errorMessages
}

export const validatePollOptions = (postData: Post): Array<string> => {
  const errorMessages = []

  if (!postData.pollOptions) {
    errorMessages.push(
      'pollOptions field is required to create a new poll post'
    )
  } else {
    for (let i = 0; i < postData.pollOptions.length; i++) {
      if (!postData.pollOptions[i].option) {
        errorMessages.push(
          `pollOptions[${i}] field failed validation: field must be non-empty to create a new poll post`
        )
      }
    }
  }

  return errorMessages
}
