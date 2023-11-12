import express from 'express'

import * as followingController from '../../../controllers/post/following/followingController'

const router = express.Router()

router.get('/:feedType', followingController.getFollowingFeed)

export default router
