import express from 'express'

import * as topicController from '../../../controllers/topic/topicController'

const router = express.Router()

router.get('/:partialName?', topicController.get)

export default router
