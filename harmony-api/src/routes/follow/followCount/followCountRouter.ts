import express from 'express'

import * as followCountController from '../../../controllers/follow/followCount/followCountController'

const router = express.Router()

router.get('/:userId', followCountController.getFollowCount)
router.get('/artist/:artistId', followCountController.getArtistFollowCount)
router.get('/song/:songId', followCountController.getSongFollowCount)
router.get('/album/:albumId', followCountController.getAlbumFollowCount)

export default router
