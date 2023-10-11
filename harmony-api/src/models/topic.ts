export type Topic = {
  topicId: TopicId
  name: string
}

export type TopicId = {
  artistId?: string
  albumId?: string
  songId?: string
}
