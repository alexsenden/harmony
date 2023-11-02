import { TopicId } from '../models/topic'

export const getTopicContext = (topicId: TopicId) => {
  let topicContext = ''

  if (topicId.artistId) {
    topicContext = '(Artist)'
  } else if (topicId.albumId) {
    topicContext = '(Album)'
  } else if (topicId.songId) {
    topicContext = '(Song)'
  }

  return topicContext
}
