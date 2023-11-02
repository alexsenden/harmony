import { PollOption } from './pollOption'
import { TopicId } from './topic'

export type Post = {
  userId: string
  postId: string
  topicId: TopicId
  postType: PostType
  numComments?: number
  numLikes?: number
  title: string
  body?: string
  rating?: number
  pollOptions?: Array<PollOption>
  username?: string
  topicName?: string
  picture?: number
}

export enum PostType {
  DISCUSSION = 'DISCUSSION',
  POLL = 'POLL',
  REVIEW = 'REVIEW',
}
