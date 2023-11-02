import express from 'express'

import likeRouter from './like/likeRouter'
import commentRouter from './comment/commentRouter'
import * as postController from '../../../controllers/post/postController'

const router = express.Router()

router.use('/like', likeRouter)
router.use('/comment', commentRouter)

router.get('/:postId', postController.get)

export default router
