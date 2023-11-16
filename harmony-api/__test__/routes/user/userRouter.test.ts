import request from 'supertest'
import { Express } from 'express'

import prisma from '../../../prisma/prisma'

import {
  FAKE_COMMENT_WITH_USER,
  FAKE_USER_1,
  FakeApp,
} from '../../testUtils/testData'
import { authMock } from '../../testUtils/authUtils'

let app: Express
beforeEach(() => {
  app = FakeApp()
  authMock()
})

describe('GET /user/:userId/comment', () => {
  it('responds with code 200 and an array of comments', async () => {
    jest
      .spyOn(prisma.comment, 'findMany')
      .mockResolvedValueOnce([FAKE_COMMENT_WITH_USER])

    const res = await request(app).get(`/user/${FAKE_USER_1.userId}/comment`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        ...FAKE_COMMENT_WITH_USER,
        createdAt: FAKE_COMMENT_WITH_USER.createdAt.toISOString(),
        user: {
          ...FAKE_COMMENT_WITH_USER.user,
          createdAt: FAKE_COMMENT_WITH_USER.user.createdAt.toISOString(),
        },
      },
    ])
  })
})
