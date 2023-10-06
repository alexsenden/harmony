import * as topicRepo from '../repos/topicRepo'
import { HttpError } from '../models/error/httpError'
import { Topic, TopicId } from '../models/topic'

export const getTopicByPartialName = (partialName?: string): Array<Topic> => {
  if (!partialName) {
    return []
  }

  return topicRepo.getTopicByPartialName(partialName)
}

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
