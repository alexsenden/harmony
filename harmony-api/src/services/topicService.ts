import * as artistRepo from '../repos/artistRepo'
import * as albumRepo from '../repos/albumRepo'
import * as songRepo from '../repos/songRepo'
import { HttpError } from '../models/error/httpError'
import { Topic, TopicId } from '../models/topic'

export const getTopicByPartialName = async (
  partialName?: string
): Promise<Array<Topic>> => {
  if (!partialName) {
    return []
  }

  const artists = artistRepo.getArtistTopicByPartialName(partialName)
  const albums = albumRepo.getAlbumTopicByPartialName(partialName)
  const songs = songRepo.getSongTopicByPartialName(partialName)

  return [...(await artists), ...(await albums), ...(await songs)]
}

export const validateTopicId = (topicId?: TopicId): Array<string> => {
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
    return ['Exactly one topicId must be defined']
  }

  return []
}
