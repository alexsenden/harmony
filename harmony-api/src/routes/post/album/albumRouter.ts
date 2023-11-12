import express from 'express'

import * as albumController from '../../../controllers/post/album/albumController'

const router = express.Router()

router.get('/:albumId', albumController.getPostsByAlbumId)

export default router
