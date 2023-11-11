import express from 'express'

import * as artistController from '../../../controllers/post/artist/artistController'

const router = express.Router()

router.get('/:artistId', artistController.getPostsByArtistId)

export default router
