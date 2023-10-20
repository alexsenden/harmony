import express from 'express'

import * as trendingController from '../../../controllers/post/trending/trendingController'

const router = express.Router()

router.get('/', trendingController.get)

export default router
