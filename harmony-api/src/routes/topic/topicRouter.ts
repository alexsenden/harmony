import express from 'express'

import partialNameRouter from './partialName/partialNameRouter'

const router = express.Router()

router.use('/partialName', partialNameRouter)

export default router
