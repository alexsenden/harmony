import { Router } from 'express'

import exampleRouter from './example/exampleRouter'
import postRouter from './post/postRouter'

const router = Router()

router.use('/example', exampleRouter)
router.use('/post', postRouter)

export default router
