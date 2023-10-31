import express from 'express'

import * as followCountController from '../../../controllers/follow/followCount/folowCountController'

const router = express.Router()

router.get('/', followCountController.get)

export default router
