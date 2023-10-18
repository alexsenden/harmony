export type Topic = {
  topicId: TopicId
  name: string
}

export type TopicId = {
  artistId?: number
  albumId?: number
  songId?: number
}
