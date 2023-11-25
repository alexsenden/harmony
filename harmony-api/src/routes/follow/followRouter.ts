import express from 'express'

import followCountRouter from './followCount/followCountRouter'
import * as followController from '../../controllers/follow/followController'

const router = express.Router()

router.use('/followCount', followCountRouter)

router.get('/user/:userId', followController.getFollow)
router.post('/', followController.toggleUserFollow)

router.get('/artist/:artistId', followController.getArtistFollow)
router.post('/artist', followController.toggleArtistFollow)

router.get('/song/:songId', followController.getSongFollow)
router.post('/song', followController.toggleSongFollow)

router.get('/album/:albumId', followController.getAlbumFollow)
router.post('/album', followController.toggleAlbumFollow)

export default router
