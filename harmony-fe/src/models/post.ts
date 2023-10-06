import { TopicId } from './topic'

export type Post = {
  userId: string
  postId: string
  topicId: TopicId
  postType: PostType
  title: string
  body: string
  rating?: number
  pollOptions?: Array<Object>
}

export enum PostField {
  TOPIC_ID = 'topicId',
  POST_TYPE = 'postType',
  TITLE = 'title',
  BODY = 'body',
  RATING = 'rating',
}

export enum PostType {
  DISCUSSION = 'DISCUSSION',
  POLL = 'POLL',
  REVIEW = 'REVIEW',
}
