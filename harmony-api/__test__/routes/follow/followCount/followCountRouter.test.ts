/* eslint-disable @typescript-eslint/ban-ts-comment */
import request from 'supertest'
import { Express } from 'express'
import {
  FAKE_ALBUM,
  FAKE_ARTIST,
  FAKE_SONG,
  FakeApp,
} from '../../../testUtils/testData'
import prisma from '../../../../prisma/prisma'
import { SESSION_AS_COOKIE, authMock } from '../../../testUtils/authUtils'

let app: Express
beforeEach(() => {
  app = FakeApp()
  authMock()
})

describe('GET /follow/followCount', () => {
  it('responds with code 200 and the number of followers', async () => {
    // @ts-ignore
    jest.spyOn(prisma.follow, 'aggregate').mockResolvedValueOnce({
      _count: { followingId: 5 },
    })

    const res = await request(app)
      .get('/follow/followCount')
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(5)
  })
})

describe('GET /follow/followCount/artist/:artistId', () => {
  it('responds with code 200 and the number of followers', async () => {
    // @ts-ignore
    jest.spyOn(prisma.followArtist, 'aggregate').mockResolvedValueOnce({
      _count: { followerId: 5 },
    })

    const res = await request(app)
      .get(`/follow/followCount/artist/${FAKE_ARTIST.artistId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(5)
  })
})

describe('GET /follow/followCount/album/:albumId', () => {
  it('responds with code 200 and the number of followers', async () => {
    // @ts-ignore
    jest.spyOn(prisma.followAlbum, 'aggregate').mockResolvedValueOnce({
      _count: { followerId: 5 },
    })

    const res = await request(app)
      .get(`/follow/followCount/album/${FAKE_ALBUM.albumId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(5)
  })
})

describe('GET /follow/followCount/song/:songId', () => {
  it('responds with code 200 and the number of followers', async () => {
    // @ts-ignore
    jest.spyOn(prisma.followSong, 'aggregate').mockResolvedValueOnce({
      _count: { followerId: 5 },
    })

    const res = await request(app)
      .get(`/follow/followCount/song/${FAKE_SONG.songId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(5)
  })
})
