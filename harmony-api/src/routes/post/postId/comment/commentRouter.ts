import express from 'express'

import * as postController from '../../../../controllers/post/postController'

const router = express.Router()

router.post('/', postController.postComment)
router.get('/', postController.getComments)

export default router
