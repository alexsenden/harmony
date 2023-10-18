import express from 'express'

import * as userController from '../../controllers/user/userController'

const router = express.Router()

router.post('/register', userController.register)
router.get('/get', userController.get)

export default router
