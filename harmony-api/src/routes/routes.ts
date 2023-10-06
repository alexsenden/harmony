import { Router } from 'express'

import exampleRouter from './example/exampleRouter'
import postRouter from './post/postRouter'
import topicRouter from './topic/topicRouter'

const router = Router()

router.use('/example', exampleRouter)
router.use('/post', postRouter)
router.use('/topic', topicRouter)

export default router
