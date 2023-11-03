import { PollOption } from './pollOption'
import { TopicId } from './topic'
import { User } from './user'

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
  topicName?: string
  user?: User
  numLikes?: number
}

export enum PostType {
  DISCUSSION = 'DISCUSSION',
  POLL = 'POLL',
  REVIEW = 'REVIEW',
}
