import { Router } from 'express'

import exampleRouter from './example/exampleRouter'
import postRouter from './post/postRouter'
import topicRouter from './topic/topicRouter'
import userRouter from './user/userRouter'
import followRouter from './follow/followRouter'

const router = Router()

router.use('/example', exampleRouter)
router.use('/post', postRouter)
router.use('/topic', topicRouter)
router.use('/user', userRouter)
router.use('/follow', followRouter)

export default router
