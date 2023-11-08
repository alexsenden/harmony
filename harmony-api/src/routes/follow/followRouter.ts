import express from 'express'

import followCountRouter from './followCount/followCountRouter'
import * as followController from '../../controllers/follow/followController'

const router = express.Router()

router.use('/followCount', followCountRouter)

router.get('/', followController.getFollow)
router.post('/', followController.toggleUserFollow)

router.get('/artist', followController.getArtistFollow)
router.post('/artist', followController.toggleArtistFollow)

export default router
