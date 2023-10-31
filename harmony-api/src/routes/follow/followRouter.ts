import express from 'express'

import followCountRouter from './followCount/followCountRouter'
import * as followController from '../../controllers/follow/followController'

const router = express.Router()

router.use('/followCount', followCountRouter)

router.get('/', followController.get)
router.post('/', followController.post)

export default router
