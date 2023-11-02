import { PollOption } from './pollOption'
import { TopicId } from './topic'

export type Post = {
  userId: string
  postId: string
  topicId: TopicId
  postType: PostType
  title: string
  numComments: number
  numLikes: number
  body: string
  rating?: number
  pollOptions?: Array<PollOption>
  username?: string
  topicName: string
  picture: number
}

export enum PostField {
  TOPIC_ID = 'topicId',
  POST_TYPE = 'postType',
  TITLE = 'title',
  BODY = 'body',
  RATING = 'rating',
  POLL_OPTIONS = 'pollOptions',
}

export enum PostType {
  DISCUSSION = 'DISCUSSION',
  POLL = 'POLL',
  REVIEW = 'REVIEW',
}
