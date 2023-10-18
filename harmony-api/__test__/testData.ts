import express, { Express, NextFunction, Request, Response } from 'express'
import { PollOption } from '../src/models/pollOption'
import { Post, PostType } from '../src/models/post'
import { TopicId } from '../src/models/topic'
import bodyParser from 'body-parser'
import router from '../src/routes/routes'

export const FakeApp = () => {
  const app: Express = express()
  const jsonParser = bodyParser.json()
  app.use('/', jsonParser, router)
  app.use(
    (
      err: Error & { statusCode?: number },
      req: Request,
      res: Response,
      next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
    ): void => {
      const statusCode = err.statusCode || 500
      console.error(err.message, err.stack)
      res.status(statusCode).json({ message: err.message })
    }
  )
  return app
}

export const FAKE_TOPIC_ID: TopicId = {
  artistId: 1000,
}

export const FAKE_POLL_OPTION: PollOption = {
  pollOptionId: 'fake-poll-option-id',
  option: 'This is a fake poll option.',
}

export const FAKE_POST: Post = {
  userId: 'fake-user-id',
  postId: 'fake-post-id',
  topicId: FAKE_TOPIC_ID,
  postType: PostType.DISCUSSION,
  title: 'Fake Post Title!',
  body: 'Fake Post Body!',
  rating: 3,
  pollOptions: [FAKE_POLL_OPTION],
}
