import express from 'express'

import * as userController from '../../controllers/user/userController'

const router = express.Router()

router.get('/', userController.getUser)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/signOut', userController.signOut)
router.post('/updateAccount', userController.updateAccount)

export default router
