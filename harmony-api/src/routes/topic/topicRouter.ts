import express from 'express'

import * as topicController from '../../controllers/topic/topicController'

const router = express.Router()

router.get('/partialName/:partialName?', topicController.getTopicByPartialName)
router.get(
  '/partialNameOrUsername/:partialName?',
  topicController.getTopicOrUserByPartialName
)

export default router
