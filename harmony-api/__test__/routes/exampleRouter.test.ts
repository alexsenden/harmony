import request from 'supertest'
import express, { Express } from 'express'
import router from '../../src/routes/routes'

const app: Express = express()
app.use('/', router)

describe('/example', () => {
  it('responds to /example?echo={echo} with the echo text', async () => {
    const res = await request(app).get('/example?echo=Echo_Me_Please!')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ echo: 'Echo_Me_Please!' })
  })
})
