import express from 'express'

import * as followController from '../../controllers/follow/followController'

const router = express.Router()

router.get('/', followController.getFollow)
router.post('/', followController.follow)
router.get('/followCount', followController.getFollowCount)

export default router
