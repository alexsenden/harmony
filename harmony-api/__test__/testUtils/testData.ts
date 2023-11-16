import { PollOption } from '../../src/models/pollOption'
import { Post, PostType } from '../../src/models/post'
import { TopicId } from '../../src/models/topic'
import { User } from '../../src/models/user'
import { createExpressApp } from '../../src/app'

export const FakeApp = () => {
  return createExpressApp()
}

export const FAKE_TOPIC_ID: TopicId = {
  artistId: 1000,
}

export const FAKE_POLL_OPTION: PollOption = {
  pollOptionId: 'fake-poll-option-id',
  option: 'This is a fake poll option.',
  entryNumber: 1,
}

export const FAKE_POST: Post = {
  userId: 'fake-user-id',
  postId: 'fake-post-id',
  topicId: FAKE_TOPIC_ID,
  postType: PostType.DISCUSSION,
  title: 'Fake Post Title!',
  body: 'Fake Post Body!',
  numComments: 0,
  numLikes: 0,
  rating: 3,
  pollOptions: [FAKE_POLL_OPTION],
  createdAt: new Date(),
}

export const FAKE_USER_1: User = {
  userId: 'fake-user-id-1',
  username: 'fake-user-1',
  password: 'fake-password-1',
  active: true,
  createdAt: new Date(),
  firstName: 'fake-firstname-1',
  lastName: 'fake-lastname-1',
  picture: 0,
}

export const FAKE_USER_2: User = {
  userId: 'fake-user-id-2',
  username: 'fake-user-2',
  password: 'fake-password-2',
  active: true,
  createdAt: new Date(),
  firstName: 'fake-firstname-2',
  lastName: 'fake-lastname-2',
  picture: 0,
}

export const FAKE_USER_1_COOKIE = {
  cookie: 'fake-user-1-cookie',
  userId: FAKE_USER_1.userId,
}

export const FAKE_COMMENT = {
  userId: 'fake-user-id',
  postId: 'fake-post-id',
  createdAt: new Date(),
  content: 'Test comment content!',
  commentId: 'fake-comment-id',
}

export const FAKE_COMMENT_WITH_USER = {
  ...FAKE_COMMENT,
  user: FAKE_USER_1,
}
