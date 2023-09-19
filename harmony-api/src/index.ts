import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import exampleRouter from './routes/example/exampleRouter'

dotenv.config()

const app: Express = express()

// Allow different origins to use the API
app.use(cors())

// Set up routers
app.use('/example', exampleRouter)

// Error handler middleware
app.use(
  (
    err: Error & { statusCode?: number },
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })
  }
)

// Initialize Server
const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
