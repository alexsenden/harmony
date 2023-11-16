import express from 'express'

import * as songController from '../../../controllers/post/song/songController'

const router = express.Router()

router.get('/:songId', songController.getPostsBySongId)

export default router
