import request from 'supertest'
import { Express } from 'express'
import { FakeApp } from '../testData'
import prisma from '../../prisma/prisma'
import { Album, Artist, Song } from '@prisma/client'

let app: Express
beforeEach(() => {
  app = FakeApp()
})

describe('GET /topic/partialName?partialName={partialName} returns list of topics', () => {
  it('responds to /post code 200 and the new post', async () => {
    jest.spyOn(prisma.artist, 'findMany').mockResolvedValueOnce([
      {
        artistName: 'fake artist name',
        artistId: 'fake-artist-id',
      } as Artist,
    ])
    jest.spyOn(prisma.album, 'findMany').mockResolvedValueOnce([
      {
        albumName: 'fake album name',
        albumId: 'fake-album-id',
      } as Album,
    ])
    jest.spyOn(prisma.song, 'findMany').mockResolvedValueOnce([
      {
        songName: 'fake song name',
        songId: 'fake-song-id',
      } as Song,
    ])

    const res = await request(app).get('/topic/partialName?partialName=name')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([
      {
        topicId: {
          artistId: 'fake-artist-id',
        },
        name: 'fake artist name',
      },
      {
        topicId: {
          albumId: 'fake-album-id',
        },
        name: 'fake album name',
      },
      {
        topicId: {
          songId: 'fake-song-id',
        },
        name: 'fake song name',
      },
    ])
  })
})
