import express from 'express'

import * as postController from '../../../../controllers/post/postController'

const router = express.Router()

router.post('/', postController.postLike)
router.get('/', postController.getLike)
router.delete('/', postController.removeLike)

export default router
