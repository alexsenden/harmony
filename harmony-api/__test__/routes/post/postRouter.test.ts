import request from 'supertest'
import { Express } from 'express'
import { Decimal } from '@prisma/client/runtime/library'

import prisma from '../../../prisma/prisma'

import {
  FAKE_COMMENT,
  FAKE_LIKE,
  FAKE_LIKE_WITH_USER,
  FAKE_POLL_OPTION,
  FAKE_POLL_OPTION_VOTE,
  FAKE_POST,
  FakeApp,
} from '../../testUtils/testData'
import { PostType as PrismaPostType } from '@prisma/client'
import { SESSION_AS_COOKIE, authMock } from '../../testUtils/authUtils'

let app: Express
beforeEach(() => {
  app = FakeApp()
  authMock()
})

describe('POST /post', () => {
  it('responds with code 200 and the new post', async () => {
    jest.spyOn(prisma.post, 'create').mockResolvedValueOnce({
      userId: FAKE_POST.userId,
      postType: PrismaPostType[FAKE_POST.postType],
      title: FAKE_POST.title,
      content: FAKE_POST.body || '',
      rating: new Decimal(FAKE_POST.rating || 0),
      artistId: FAKE_POST.topicId.artistId || null,
      albumId: FAKE_POST.topicId.albumId || null,
      songId: FAKE_POST.topicId.songId || null,
      postId: FAKE_POST.postId,
      createdAt: FAKE_POST.createdAt,
    })
    jest
      .spyOn(prisma.pollOption, 'create')
      .mockResolvedValueOnce(FAKE_POLL_OPTION)

    const res = await request(app).post('/post').send(FAKE_POST)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      body: FAKE_POST.body,
      postId: FAKE_POST.postId,
      postType: FAKE_POST.postType,
      rating: FAKE_POST.rating,
      numComments: FAKE_POST.numComments,
      numLikes: FAKE_POST.numLikes,
      title: FAKE_POST.title,
      topicId: FAKE_POST.topicId,
      userId: FAKE_POST.userId,
      createdAt: FAKE_POST.createdAt.toISOString(),
      pollOptions: [
        {
          entryNumber: FAKE_POLL_OPTION.entryNumber,
          option: FAKE_POLL_OPTION.option,
          pollOptionId: FAKE_POLL_OPTION.pollOptionId,
        },
      ],
    })
  })
})

describe('GET /post/:postId/comment', () => {
  it('responds with code 200 and an array of comments', async () => {
    jest.spyOn(prisma.comment, 'findMany').mockResolvedValueOnce([FAKE_COMMENT])

    const res = await request(app).get(`/post/${FAKE_POST.postId}/comment`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        ...FAKE_COMMENT,
        createdAt: FAKE_COMMENT.createdAt.toISOString(),
      },
    ])
  })
})

describe('POST /post/:postId/comment', () => {
  it('responds with code 200 and the new comment', async () => {
    jest.spyOn(prisma.comment, 'create').mockResolvedValueOnce(FAKE_COMMENT)

    const res = await request(app)
      .post(`/post/${FAKE_POST.postId}/comment`)
      .set('Cookie', SESSION_AS_COOKIE)
      .send(FAKE_COMMENT)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      ...FAKE_COMMENT,
      createdAt: FAKE_COMMENT.createdAt.toISOString(),
    })
  })
})

describe('POST /post/:postId/like', () => {
  it('responds with code 200 and the new like', async () => {
    jest.spyOn(prisma.like, 'create').mockResolvedValueOnce(FAKE_LIKE)

    const res = await request(app)
      .post(`/post/${FAKE_POST.postId}/like`)
      .set('Cookie', SESSION_AS_COOKIE)
      .send(FAKE_LIKE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_LIKE)
  })
})

describe('GET /post/:postId/like', () => {
  it('responds with code 200 and an array of likes', async () => {
    jest
      .spyOn(prisma.like, 'findMany')
      .mockResolvedValueOnce([FAKE_LIKE_WITH_USER])

    const res = await request(app).get(`/post/${FAKE_POST.postId}/like`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        ...FAKE_LIKE_WITH_USER,
        user: {
          ...FAKE_LIKE_WITH_USER.user,
          createdAt: FAKE_LIKE_WITH_USER.user.createdAt.toISOString(),
        },
      },
    ])
  })
})

describe('DELETE /post/:postId/like', () => {
  it('responds with code 200 and an array of likes', async () => {
    jest.spyOn(prisma.like, 'delete').mockResolvedValueOnce(FAKE_LIKE)

    const res = await request(app)
      .delete(`/post/${FAKE_POST.postId}/like`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_LIKE)
  })
})

describe('POST /post/vote', () => {
  it('responds with code 200 and the poll option vote', async () => {
    jest
      .spyOn(prisma.pollOption, 'findFirst')
      .mockResolvedValueOnce(FAKE_POLL_OPTION)
    jest.spyOn(prisma.pollVote, 'count').mockResolvedValueOnce(0)
    jest
      .spyOn(prisma.pollVote, 'create')
      .mockResolvedValueOnce(FAKE_POLL_OPTION_VOTE)

    const res = await request(app)
      .post('/post/vote')
      .set('Cookie', SESSION_AS_COOKIE)
      .send(FAKE_POLL_OPTION_VOTE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_POLL_OPTION_VOTE)
  })
})
