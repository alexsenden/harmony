import express from 'express'

import * as userController from '../../controllers/user/userController'
import * as commentController from '../../controllers/post/commentController'

const router = express.Router()

router.get('/', userController.getUserByCookie)
router.get('/:username', userController.getUserByUsername)
router.get('/:userId/comment', commentController.getCommentsByUserID)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/signOut', userController.signOut)
router.post('/updateAccount', userController.updateAccount)

export default router
