import { Router } from 'express'

import exampleRouter from './example/exampleRouter'
import postRouter from './post/postRouter'
import topicRouter from './topic/topicRouter'
import userRouter from './user/userRouter'

const router = Router()

router.use('/example', exampleRouter)
router.use('/post', postRouter)
router.use('/topic', topicRouter)
router.use('/user', userRouter)

export default router
