import { HttpError } from '../models/error/httpError'
import { TopicId } from '../models/topic'

export const validateTopicId = (topicId?: TopicId) => {
  let definedIds = 0

  if (topicId?.albumId) {
    definedIds++
  }
  if (topicId?.artistId) {
    definedIds++
  }
  if (topicId?.songId) {
    definedIds++
  }

  if (definedIds !== 1) {
    throw new HttpError('Exactly one topicId must be defined', 400)
  }
}
