import express from 'express'

import * as topicController from '../../controllers/topic/topicController'

const router = express.Router()

router.use('/partialName/:partialName', topicController.getTopicByPartialName)
router.use(
  '/partialNameOrUsername/:partialName',
  topicController.getTopicOrUserByPartialName
)

export default router
