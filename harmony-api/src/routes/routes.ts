import { Router } from 'express'
import exampleRouter from './example/exampleRouter'

const router = Router()

router.use('/example', exampleRouter)

export default router
