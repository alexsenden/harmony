import request from 'supertest'
import { Express } from 'express'
import { FAKE_POST, FakeApp } from '../testData'
import prisma from '../../prisma/prisma'
import { PostType as PrismaPostType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

let app: Express
beforeEach(() => {
  app = FakeApp()
})

describe('POST /post', () => {
  it('responds to /post code 200 and the new post', async () => {
    jest.spyOn(prisma.post, 'create').mockResolvedValueOnce({
      userId: FAKE_POST.userId,
      postType: PrismaPostType[FAKE_POST.postType],
      title: FAKE_POST.title,
      content: FAKE_POST.body || '',
      rating: new Decimal(FAKE_POST.rating || 0),
      artistId: FAKE_POST.topicId.artistId || '',
      albumId: FAKE_POST.topicId.albumId || '',
      songId: FAKE_POST.topicId.songId || '',
      postId: FAKE_POST.postId,
      createdAt: new Date(),
    })

    const res = await request(app).post('/post').send(FAKE_POST)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      body: FAKE_POST.body,
      postId: FAKE_POST.postId,
      postType: FAKE_POST.postType,
      rating: FAKE_POST.rating,
      title: FAKE_POST.title,
      topicId: FAKE_POST.topicId,
      userId: FAKE_POST.userId,
    })
  })
})
