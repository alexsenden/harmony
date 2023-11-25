import request from 'supertest'
import { Express } from 'express'
import {
  FAKE_ALBUM,
  FAKE_ARTIST,
  FAKE_FOLLOW,
  FAKE_SONG,
  FAKE_USER_1,
  FakeApp,
} from '../../testUtils/testData'
import prisma from '../../../prisma/prisma'
import { Follow, FollowAlbum, FollowArtist, FollowSong } from '@prisma/client'
import { SESSION_AS_COOKIE, authMock } from '../../testUtils/authUtils'

let app: Express
beforeEach(() => {
  app = FakeApp()
  authMock()
})

describe('GET /follow/user/:userId', () => {
  it('responds with code 200 and true if the user is following', async () => {
    jest
      .spyOn(prisma.follow, 'findFirst')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as Follow)

    const res = await request(app)
      .get(`/follow/user/${FAKE_USER_1.userId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(true)
  })

  it('responds with code 200 and false if the user is not following', async () => {
    jest.spyOn(prisma.follow, 'findFirst').mockResolvedValueOnce(null)

    const res = await request(app)
      .get(`/follow/user/${FAKE_USER_1.userId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(false)
  })
})

describe('GET /follow/artist/:artistId', () => {
  it('responds with code 200 and true if the user is following', async () => {
    jest
      .spyOn(prisma.followArtist, 'findFirst')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowArtist)

    const res = await request(app)
      .get(`/follow/artist/${FAKE_ARTIST.artistId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(true)
  })

  it('responds with code 200 and false if the user is not following', async () => {
    jest.spyOn(prisma.followArtist, 'findFirst').mockResolvedValueOnce(null)

    const res = await request(app)
      .get(`/follow/artist/${FAKE_ARTIST.artistId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(false)
  })
})

describe('GET /follow/album/:albumId', () => {
  it('responds with code 200 and true if the user is following', async () => {
    jest
      .spyOn(prisma.followAlbum, 'findFirst')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowAlbum)

    const res = await request(app)
      .get(`/follow/album/${FAKE_ALBUM.albumId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(true)
  })

  it('responds with code 200 and false if the user is not following', async () => {
    jest.spyOn(prisma.followAlbum, 'findFirst').mockResolvedValueOnce(null)

    const res = await request(app)
      .get(`/follow/album/${FAKE_ALBUM.albumId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(false)
  })
})

describe('GET /follow/song/:songId', () => {
  it('responds with code 200 and true if the user is following', async () => {
    jest
      .spyOn(prisma.followSong, 'findFirst')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowSong)

    const res = await request(app)
      .get(`/follow/song/${FAKE_SONG.songId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(true)
  })

  it('responds with code 200 and false if the user is not following', async () => {
    jest.spyOn(prisma.followSong, 'findFirst').mockResolvedValueOnce(null)

    const res = await request(app)
      .get(`/follow/song/${FAKE_SONG.songId}`)
      .set('Cookie', SESSION_AS_COOKIE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(false)
  })
})

describe('POST /follow', () => {
  it('responds with code 200 and the follow object when following', async () => {
    jest
      .spyOn(prisma.follow, 'create')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as Follow)

    const res = await request(app)
      .post('/follow')
      .set('Cookie', SESSION_AS_COOKIE)
      .send({ followAction: true })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_FOLLOW)
  })

  it('responds with code 200 and the follow object when unfollowing', async () => {
    jest
      .spyOn(prisma.follow, 'delete')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as Follow)

    const res = await request(app)
      .post('/follow')
      .set('Cookie', SESSION_AS_COOKIE)
      .send({ followAction: false })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_FOLLOW)
  })
})

describe('POST /follow/artist', () => {
  it('responds with code 200 and the follow object when following', async () => {
    jest
      .spyOn(prisma.followArtist, 'create')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowArtist)

    const res = await request(app)
      .post('/follow/artist')
      .set('Cookie', SESSION_AS_COOKIE)
      .send({ followAction: true })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_FOLLOW)
  })

  it('responds with code 200 and the follow object when unfollowing', async () => {
    jest
      .spyOn(prisma.followArtist, 'delete')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowArtist)

    const res = await request(app)
      .post('/follow/artist')
      .set('Cookie', SESSION_AS_COOKIE)
      .send({ followAction: false })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_FOLLOW)
  })
})

describe('POST /follow/album', () => {
  it('responds with code 200 and the follow object when following', async () => {
    jest
      .spyOn(prisma.followAlbum, 'create')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowAlbum)

    const res = await request(app)
      .post('/follow/album')
      .set('Cookie', SESSION_AS_COOKIE)
      .send({ followAction: true })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_FOLLOW)
  })

  it('responds with code 200 and the follow object when unfollowing', async () => {
    jest
      .spyOn(prisma.followAlbum, 'delete')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowAlbum)

    const res = await request(app)
      .post('/follow/album')
      .set('Cookie', SESSION_AS_COOKIE)
      .send({ followAction: false })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_FOLLOW)
  })
})

describe('POST /follow/song', () => {
  it('responds with code 200 and the follow object when following', async () => {
    jest
      .spyOn(prisma.followSong, 'create')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowSong)

    const res = await request(app)
      .post('/follow/song')
      .set('Cookie', SESSION_AS_COOKIE)
      .send({ followAction: true })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_FOLLOW)
  })

  it('responds with code 200 and the follow object when unfollowing', async () => {
    jest
      .spyOn(prisma.followSong, 'delete')
      .mockResolvedValueOnce(FAKE_FOLLOW as unknown as FollowSong)

    const res = await request(app)
      .post('/follow/song')
      .set('Cookie', SESSION_AS_COOKIE)
      .send({ followAction: false })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(FAKE_FOLLOW)
  })
})
