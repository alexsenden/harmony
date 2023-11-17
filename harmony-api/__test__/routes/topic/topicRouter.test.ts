import request from 'supertest'
import { Express } from 'express'
import {
  FAKE_ALBUM,
  FAKE_ARTIST,
  FAKE_SONG,
  FAKE_USER_1,
  FakeApp,
} from '../../testUtils/testData'
import prisma from '../../../prisma/prisma'

let app: Express
beforeEach(() => {
  app = FakeApp()
})

describe('GET /topic/partialName/:partialName? returns list of topics', () => {
  it('responds with code 200 and a list of topics', async () => {
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

describe('GET /partialNameOrUsername/:partialName? returns list of topics', () => {
  it('responds with code 200 and a list of topics and users', async () => {
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
    jest.spyOn(prisma, '$queryRaw').mockResolvedValueOnce([
      {
        userId: FAKE_USER_1.userId,
        firstName: FAKE_USER_1.firstName,
        lastName: FAKE_USER_1.lastName,
        username: FAKE_USER_1.username,
      },
    ])

    const res = await request(app).get('/topic/partialNameOrUsername/name')

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
      {
        userId: FAKE_USER_1.userId,
        firstName: FAKE_USER_1.firstName,
        lastName: FAKE_USER_1.lastName,
        username: FAKE_USER_1.username,
      },
    ])
  })
})

describe('GET /artist/:artistId', () => {
  it('responds with code 200 and artist', async () => {
    jest
      .spyOn(prisma.artist, 'findUniqueOrThrow')
      .mockResolvedValueOnce(FAKE_ARTIST)

    const res = await request(app).get(`/topic/artist/${FAKE_ARTIST.artistId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_ARTIST)
  })
})

describe('GET /album/:albumId', () => {
  it('responds with code 200 and album', async () => {
    jest
      .spyOn(prisma.album, 'findUniqueOrThrow')
      .mockResolvedValueOnce(FAKE_ALBUM)

    const res = await request(app).get(`/topic/album/${FAKE_ALBUM.albumId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_ALBUM)
  })
})

describe('GET /song/:songId', () => {
  it('responds with code 200 and album', async () => {
    jest
      .spyOn(prisma.song, 'findUniqueOrThrow')
      .mockResolvedValueOnce(FAKE_SONG)

    const res = await request(app).get(`/topic/song/${FAKE_SONG.songId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_SONG)
  })
})
