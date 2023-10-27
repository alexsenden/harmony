import express from 'express'

import * as userController from '../../controllers/user/userController'

const router = express.Router()

router.post('/register', userController.register)
router.get('/', userController.get)
router.post('/login', userController.login)
router.post('/signOut', userController.signOut)
router.get('/getUser', userController.getUser)
router.post('/updateAccount', userController.updateAccount)

export default router
