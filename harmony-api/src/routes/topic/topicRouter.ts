import express from 'express'

import * as topicController from '../../controllers/topic/topicController'

const router = express.Router()

router.get('/partialName/:partialName?', topicController.getTopicByPartialName)
router.get(
  '/partialNameOrUsername/:partialName?',
  topicController.getTopicOrUserByPartialName
)

router.get('/artist/:artistID', topicController.getArtistById)
router.get('/song/:songID', topicController.getSongById)
router.get('/album/:albumID', topicController.getArtistById)

export default router
