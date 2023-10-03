import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import router from './routes/routes'

dotenv.config()

const app: Express = express()

// Allow different origins to use the API
app.use(cors())

app.use('/', router)

// Error handler middleware
app.use(
  (err: Error & { statusCode?: number }, req: Request, res: Response): void => {
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
