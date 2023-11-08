import express from 'express'

import * as followingController from '../../../controllers/post/following/followingController'

const router = express.Router()

router.get('/', followingController.getAllFollowingFeed)
router.get('/user', followingController.getFollowingUserFeed)
router.get('/artist', followingController.getFollowingArtistsFeed)
router.get('/album', followingController.getFollowingAlbumsFeed)

export default router
