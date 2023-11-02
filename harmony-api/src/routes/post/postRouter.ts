import express from 'express'

import trendingRouter from './trending/trendingRouter'
import followingRouter from './following/followingRouter'
import userRouter from './user/userRouter'
import * as postController from '../../controllers/post/postController'

const router = express.Router()

router.use('/trending', trendingRouter)
router.use('/following', followingRouter)
router.use('/user', userRouter)

router.post('/', postController.post)
router.get('/:postId', postController.get)

export default router
