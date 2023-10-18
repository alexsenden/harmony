import express from 'express'

import * as userController from '../../controllers/user/userController'

const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('signOut', userController.signOut)
router.get('/getUser', userController.getUser)

export default router
