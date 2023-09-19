import express from 'express'

import * as exampleController from '../../controllers/example/exampleController'

const router = express.Router()

router.get('/', exampleController.get)

export default router
