import express from 'express'

import trendingRouter from './trending/trendingRouter'
import followingRouter from './following/followingRouter'
import userRouter from './user/userRouter'
import * as postController from '../../controllers/post/postController'
import * as commentController from '../../controllers/post/commentController'
import * as likeController from '../../controllers/post/likeController'
import * as pollOptionController from '../../controllers/post/pollOptionController'

const router = express.Router()

// Feed routes
router.use('/trending', trendingRouter)
router.use('/following', followingRouter)
router.use('/user', userRouter)

// Like routes
router.post('/:postId/like', likeController.postLike)
router.get('/:postId/like', likeController.getLikes)
router.delete('/:postId/like', likeController.removeLike)

// Comment routes
router.post('/:postId/comment', commentController.postComment)
router.get('/:postId/comment', commentController.getComments)

// Poll option route
router.post('/vote', pollOptionController.voteOnOption)

// Individual post routes
router.post('/', postController.createPost)
router.get('/:postId', postController.getPostById)

export default router
