import request from 'supertest'
import { Express } from 'express'
import { FakeApp } from '../../testUtils/testData'
import prisma from '../../../prisma/prisma'

let app: Express
beforeEach(() => {
  app = FakeApp()
})

describe('GET /topic/partialName/:partialName returns list of topics', () => {
  it('responds to /post code 200 and the new post', async () => {
    jest.spyOn(prisma, '$queryRaw').mockResolvedValueOnce([
      {
        artist_name: 'fake artist name',
        artist_id: 1000,
      },
    ])
    jest.spyOn(prisma, '$queryRaw').mockResolvedValueOnce([
      {
        album_name: 'fake album name',
        album_id: 2000,
      },
    ])
    jest.spyOn(prisma, '$queryRaw').mockResolvedValueOnce([
      {
        song_name: 'fake song name',
        song_id: 3000,
      },
    ])

    const res = await request(app).get('/topic/partialName/name')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        topicId: {
          artistId: 1000,
        },
        name: 'fake artist name',
      },
      {
        topicId: {
          albumId: 2000,
        },
        name: 'fake album name',
      },
      {
        topicId: {
          songId: 3000,
        },
        name: 'fake song name',
      },
    ])
  })
})
