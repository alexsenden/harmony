import express from 'express'

import trendingRouter from './trending/trendingRouter'
import followingRouter from './following/followingRouter'
import userRouter from './user/userRouter'
import * as postController from '../../controllers/post/postController'

const router = express.Router()

// Feed routes
router.use('/trending', trendingRouter)
router.use('/following', followingRouter)
router.use('/user', userRouter)

// Like routes
router.post('/:postId/like', postController.postLike)
router.delete('/:postId/like', postController.removeLike)

// Comment routes
router.post('/:postId/comment', postController.postComment)
router.get('/:postId/comment', postController.getComments)

// Individual post routes
router.post('/:postId', postController.post)
router.get('/:postId', postController.get)

export default router
