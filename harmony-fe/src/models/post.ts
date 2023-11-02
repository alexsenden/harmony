import { PollOption } from './pollOption'
import { TopicId } from './topic'
import { User } from './user'

export type Post = {
  userId: string
  postId: string
  topicId: TopicId
  postType: PostType
  title: string
  body: string
  rating?: number
  pollOptions?: Array<PollOption>
  topicName: string
  user?: User
  comments?: Array<Object> // To be replaced with new comment type
  numLikes?: number
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
