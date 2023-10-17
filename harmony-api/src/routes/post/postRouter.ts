import express from 'express'

import * as postController from '../../controllers/post/postController'

const router = express.Router()

router.post('/', postController.post)
router.get('/', postController.get)

export default router
