import express from 'express'

import * as userController from '../../../controllers/post/user/userController'

const router = express.Router()

router.get('/:userId', userController.get)

export default router
