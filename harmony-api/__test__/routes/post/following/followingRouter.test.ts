import { Express } from 'express'
import request from 'supertest'

import prisma from '../../../../prisma/prisma'

import { SESSION_AS_COOKIE, authMock } from '../../../testUtils/authUtils'
import {
  FAKE_POST,
  FakeApp,
  PrismaPostResponse,
} from '../../../testUtils/testData'
import { Decimal } from '@prisma/client/runtime/library'
import { PostType as PrismaPostType } from '@prisma/client'
import * as userService from '../../../../src/services/userService'

let app: Express
beforeEach(() => {
  app = FakeApp()
  authMock()
})

describe('GET /post/following/ALL', () => {
  it('responds with code 200 and an array of posts', async () => {
    jest.spyOn(prisma.post, 'findMany').mockResolvedValue([
      {
        ...FAKE_POST,
        content: FAKE_POST.body,
        artistId: FAKE_POST.topicId.artistId || null,
        albumId: FAKE_POST.topicId.albumId || null,
        songId: FAKE_POST.topicId.songId || null,
        rating: new Decimal(FAKE_POST.rating || 0),
        postType: PrismaPostType[FAKE_POST.postType],
        _count: {
          comments: 0,
          likes: 0,
        },
        likes: [],
      } as unknown as PrismaPostResponse,
    ])

    const res = await request(app)
      .get('/post/following/ALL')
      .set('Cookie', SESSION_AS_COOKIE)

    const expected = {
      ...FAKE_POST,
      createdAt: FAKE_POST.createdAt.toISOString(),
      isLiked: false,
      isVoted: false,
      numVotes: 0,
      pollOptions: [
        {
          entryNumber: 0,
          option: 'This is a fake poll option.',
          pollOptionId: 'fake-poll-option-id',
          postId: 'fake-post-id',
          votedOn: false,
          votes: 0,
        },
      ],
      user: {
        userId: FAKE_POST.user.userId,
        username: FAKE_POST.user.username,
        picture: FAKE_POST.user.picture,
      },
    }

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([expected])
  })

  it('calls error handler middleware when unauthorized', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})

    const res = await request(app)
      .get('/post/following/ALL')
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(401)
    expect(res.body).toEqual({ message: 'Unauthorized' })
  })

  it('calls error handler middleware when unauthorized', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockImplementation(() => {
      throw new Error('error')
    })
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})

    const res = await request(app)
      .get('/post/following/ALL')
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual({ message: 'error' })
  })
})

describe('GET /post/following/user', () => {
  it('responds with code 200 and an array of comments', async () => {
    jest.spyOn(prisma.post, 'findMany').mockResolvedValueOnce([
      {
        ...FAKE_POST,
        content: FAKE_POST.body,
        artistId: FAKE_POST.topicId.artistId || null,
        albumId: FAKE_POST.topicId.albumId || null,
        songId: FAKE_POST.topicId.songId || null,
        rating: new Decimal(FAKE_POST.rating || 0),
        postType: PrismaPostType[FAKE_POST.postType],
        _count: {
          comments: 0,
          likes: 0,
        },
        likes: [],
      } as unknown as PrismaPostResponse,
    ])

    const res = await request(app)
      .get('/post/following/USER')
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        ...FAKE_POST,
        createdAt: FAKE_POST.createdAt.toISOString(),
        isLiked: false,
        isVoted: false,
        numVotes: 0,
        pollOptions: [
          {
            entryNumber: 0,
            option: 'This is a fake poll option.',
            pollOptionId: 'fake-poll-option-id',
            postId: 'fake-post-id',
            votedOn: false,
            votes: 0,
          },
        ],
        user: {
          userId: FAKE_POST.user.userId,
          username: FAKE_POST.user.username,
          picture: FAKE_POST.user.picture,
        },
      },
    ])
  })
})

describe('GET /post/following/album', () => {
  it('responds with code 200 and an array of comments', async () => {
    jest.spyOn(prisma.post, 'findMany').mockResolvedValueOnce([
      {
        ...FAKE_POST,
        content: FAKE_POST.body,
        artistId: FAKE_POST.topicId.artistId || null,
        albumId: FAKE_POST.topicId.albumId || null,
        songId: FAKE_POST.topicId.songId || null,
        rating: new Decimal(FAKE_POST.rating || 0),
        postType: PrismaPostType[FAKE_POST.postType],
        _count: {
          comments: 0,
          likes: 0,
        },
        likes: [],
      } as unknown as PrismaPostResponse,
    ])

    const res = await request(app)
      .get('/post/following/ALBUM')
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        ...FAKE_POST,
        createdAt: FAKE_POST.createdAt.toISOString(),
        isLiked: false,
        isVoted: false,
        numVotes: 0,
        pollOptions: [
          {
            entryNumber: 0,
            option: 'This is a fake poll option.',
            pollOptionId: 'fake-poll-option-id',
            postId: 'fake-post-id',
            votedOn: false,
            votes: 0,
          },
        ],
        user: {
          userId: FAKE_POST.user.userId,
          username: FAKE_POST.user.username,
          picture: FAKE_POST.user.picture,
        },
      },
    ])
  })
})

describe('GET /post/following/artist', () => {
  it('responds with code 200 and an array of comments', async () => {
    jest.spyOn(prisma.post, 'findMany').mockResolvedValueOnce([
      {
        ...FAKE_POST,
        content: FAKE_POST.body,
        artistId: FAKE_POST.topicId.artistId || null,
        albumId: FAKE_POST.topicId.albumId || null,
        songId: FAKE_POST.topicId.songId || null,
        rating: new Decimal(FAKE_POST.rating || 0),
        postType: PrismaPostType[FAKE_POST.postType],
        _count: {
          comments: 0,
          likes: 0,
        },
        likes: [],
      } as unknown as PrismaPostResponse,
    ])

    const res = await request(app)
      .get('/post/following/ARTIST')
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        ...FAKE_POST,
        createdAt: FAKE_POST.createdAt.toISOString(),
        isLiked: false,
        isVoted: false,
        numVotes: 0,
        pollOptions: [
          {
            entryNumber: 0,
            option: 'This is a fake poll option.',
            pollOptionId: 'fake-poll-option-id',
            postId: 'fake-post-id',
            votedOn: false,
            votes: 0,
          },
        ],
        user: {
          userId: FAKE_POST.user.userId,
          username: FAKE_POST.user.username,
          picture: FAKE_POST.user.picture,
        },
      },
    ])
  })
})

describe('GET /post/following/song', () => {
  it('responds with code 200 and an array of comments', async () => {
    jest.spyOn(prisma.post, 'findMany').mockResolvedValueOnce([
      {
        ...FAKE_POST,
        content: FAKE_POST.body,
        artistId: FAKE_POST.topicId.artistId || null,
        albumId: FAKE_POST.topicId.albumId || null,
        songId: FAKE_POST.topicId.songId || null,
        rating: new Decimal(FAKE_POST.rating || 0),
        postType: PrismaPostType[FAKE_POST.postType],
        _count: {
          comments: 0,
          likes: 0,
        },
        likes: [],
      } as unknown as PrismaPostResponse,
    ])

    const res = await request(app)
      .get('/post/following/SONG')
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        ...FAKE_POST,
        createdAt: FAKE_POST.createdAt.toISOString(),
        isLiked: false,
        isVoted: false,
        numVotes: 0,
        pollOptions: [
          {
            entryNumber: 0,
            option: 'This is a fake poll option.',
            pollOptionId: 'fake-poll-option-id',
            postId: 'fake-post-id',
            votedOn: false,
            votes: 0,
          },
        ],
        user: {
          userId: FAKE_POST.user.userId,
          username: FAKE_POST.user.username,
          picture: FAKE_POST.user.picture,
        },
      },
    ])
  })
})
