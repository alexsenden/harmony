import request from 'supertest'
import { Express } from 'express'

import prisma from '../../../prisma/prisma'

import {
  FAKE_COMMENT_WITH_USER,
  FAKE_USER_1,
  FAKE_USER_1_COOKIE,
  FakeApp,
} from '../../testUtils/testData'
import { SESSION_AS_COOKIE, authMock } from '../../testUtils/authUtils'

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

describe('GET /user/:username', () => {
  it('responds with code 200 and the user', async () => {
    jest
      .spyOn(prisma.user, 'findUniqueOrThrow')
      .mockResolvedValueOnce(FAKE_USER_1)

    const res = await request(app)
      .get(`/user/${FAKE_USER_1.username}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      ...FAKE_USER_1,
      createdAt: FAKE_USER_1.createdAt.toISOString(),
      password: '',
    })
  })
})

describe('POST /user/register', () => {
  it('responds with code 200 and the user', async () => {
    jest.spyOn(prisma.user, 'create').mockResolvedValueOnce(FAKE_USER_1)
    jest
      .spyOn(prisma.userCookie, 'create')
      .mockResolvedValueOnce({ ...FAKE_USER_1_COOKIE, expiry: null })

    const res = await request(app).post('/user/register').send(FAKE_USER_1)

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

describe('POST /user/login', () => {
  it('responds with code 200 and the user', async () => {
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValueOnce(FAKE_USER_1)
    jest
      .spyOn(prisma.userCookie, 'create')
      .mockResolvedValueOnce({ ...FAKE_USER_1_COOKIE, expiry: null })

    const res = await request(app).post('/user/login').send(FAKE_USER_1)

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

describe('POST /user/signOut', () => {
  it('responds with code 200 and true', async () => {
    jest
      .spyOn(prisma.userCookie, 'delete')
      .mockResolvedValueOnce({ ...FAKE_USER_1_COOKIE, expiry: null })

    const res = await request(app)
      .post('/user/signOut')
      .set('Cookie', SESSION_AS_COOKIE)
      .send(FAKE_USER_1)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(true)
  })
})

describe('POST /user/updateAccount', () => {
  it('responds with code 200 and the updated user', async () => {
    jest.spyOn(prisma.user, 'update').mockResolvedValueOnce(FAKE_USER_1)

    const res = await request(app)
      .post('/user/updateAccount')
      .set('Cookie', SESSION_AS_COOKIE)
      .send(FAKE_USER_1)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      userData: {
        ...FAKE_USER_1,
        createdAt: FAKE_USER_1.createdAt.toISOString(),
      },
    })
  })
})
