import express from 'express'

import trendingRouter from './trending/trendingRouter'
import followingRouter from './following/followingRouter'
import * as postController from '../../controllers/post/postController'

const router = express.Router()

router.use('/trending', trendingRouter)
router.use('/following', followingRouter)

router.post('/', postController.post)
router.get('/', postController.get)

router.post('/like', postController.postLike)
router.get('/like', postController.getLike)
router.delete('/like', postController.removeLike)

router.post('/comment', postController.postComment)
router.get('/comments', postController.getComments)

router.get('/:postId', postController.getPost)

export default router
