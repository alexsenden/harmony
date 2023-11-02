import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import router from './routes/routes'

dotenv.config()

const app: Express = express()

const jsonParser = bodyParser.json()

// Allow different origins to use the API
app.use(cors({
  origin: `${process.env.FRONT_END_BASE_ENDPOINT}`,
  credentials: true,
}))

app.use(cookieParser())

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
