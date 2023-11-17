import request from 'supertest'
import { Express } from 'express'

import prisma from '../../../prisma/prisma'

import { FAKE_USER_1, FakeApp } from '../../testUtils/testData'
import { SESSION_AS_COOKIE } from '../../testUtils/authUtils'

let app: Express
beforeEach(() => {
  app = FakeApp()
})

describe('GET /user', () => {
  it('responds with code 200 and the user', async () => {
    jest
      .spyOn(prisma.user, 'findFirstOrThrow')
      .mockResolvedValueOnce(FAKE_USER_1)

    const res = await request(app).get('/user').set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      userData: {
        ...FAKE_USER_1,
        createdAt: FAKE_USER_1.createdAt.toISOString(),
        password: '',
      },
    })
  })
})
