import express from 'express'

import * as followingController from '../../../controllers/post/following/followingController'

const router = express.Router()

router.get('/', followingController.getFollowingFeed)
router.get('/artist', followingController.getFollowingArtistsFeed)

export default router
