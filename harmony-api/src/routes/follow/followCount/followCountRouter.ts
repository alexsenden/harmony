import express from 'express'

import * as followCountController from '../../../controllers/follow/followCount/followCountController'

const router = express.Router()

router.get('/', followCountController.getFollowCount)

export default router
