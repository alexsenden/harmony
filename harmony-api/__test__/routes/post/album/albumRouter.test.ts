import { Express } from 'express'
import request from 'supertest'

import prisma from '../../../../prisma/prisma'

import { SESSION_AS_COOKIE, authMock } from '../../../testUtils/authUtils'
import {
  FAKE_ALBUM,
  FAKE_POST,
  FakeApp,
  PrismaPostResponse,
} from '../../../testUtils/testData'
import { Decimal } from '@prisma/client/runtime/library'
import { PostType as PrismaPostType } from '@prisma/client'

let app: Express
beforeEach(() => {
  app = FakeApp()
  authMock()
})

describe('GET /post/album/:albumId', () => {
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
      .get(`/post/user/${FAKE_ALBUM.albumId}`)
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
      },
    ])
  })
})
