import { Searchable } from '../models/searchable'
import { TopicId } from '../models/topic'

export const getSearchableContext = (searchable: Searchable) => {
  'topicId' in searchable ? getTopicContext(searchable.topicId) : '(User)'
}

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

export const getSearchableLabel = (searchable: Searchable) => {
  return 'name' in searchable ? searchable.name : searchable.username || ''
}
