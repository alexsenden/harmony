import { Router } from 'express'

import exampleRouter from './example/exampleRouter'
import postRouter from './post/postRouter'
import topicRouter from './topic/topicRouter'
import loginRouter from "./login/loginRouter";

const router = Router()

router.use('/example', exampleRouter)
router.use('/post', postRouter)
router.use('/topic', topicRouter)
router.use('/login',loginRouter)


export default router
