import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import router from './routes/routes'

dotenv.config()

const app: Express = express()

const jsonParser = bodyParser.json()

// Configure CORS
const corsOptions = {
  origin: true,
  credentials: true,
}
app.use(cors(corsOptions))

app.use('/', jsonParser, router)

// Error handler middleware
app.use(
  (
    err: Error & { statusCode?: number },
    req: Request,
    res: Response,
    next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
  ): void => {
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })
  }
)

// Initialize Server
const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`🚀[server]: Server is running at http://localhost:${port}`)
})
