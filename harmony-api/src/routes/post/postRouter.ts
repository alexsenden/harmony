import express from 'express'

import trendingRouter from './trending/trendingRouter'
import followingRouter from './following/followingRouter'
import userRouter from './user/userRouter'
import artistRouter from './artist/artistRouter'
import albumRouter from './album/albumRouter'
import songRouter from './song/songRouter'
import * as postController from '../../controllers/post/postController'
import * as commentController from '../../controllers/post/commentController'
import * as likeController from '../../controllers/post/likeController'

const router = express.Router()

// Feed routes
router.use('/trending', trendingRouter)
router.use('/following', followingRouter)
router.use('/user', userRouter)
router.use('/artist', artistRouter)
router.use('/album', albumRouter)
router.use('/song', songRouter)

// Like routes
router.post('/:postId/like', likeController.postLike)
router.get('/:postId/like', likeController.getLikes)
router.delete('/:postId/like', likeController.removeLike)

// Comment routes
router.post('/:postId/comment', commentController.postComment)
router.get('/:postId/comment', commentController.getComments)

// Individual post routes
router.post('/', postController.createPost)
router.get('/:postId', postController.getPostById)

export default router
