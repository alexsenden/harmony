import { Request, Response, NextFunction } from 'express'

import * as followController from '../../../src/controllers/follow/followController'
import * as userService from '../../../src/services/userService'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('toggleUserFollow', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)

    await followController.toggleUserFollow(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('toggleArtistFollow', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)

    await followController.toggleArtistFollow(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('toggleSongFollow', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)

    await followController.toggleSongFollow(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('toggleAlbumFollow', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)

    await followController.toggleAlbumFollow(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getFollow', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)

    await followController.getFollow(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getArtistFollow', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)

    await followController.getArtistFollow(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getSongFollow', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)

    await followController.getSongFollow(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getAlbumFollow', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(undefined)

    await followController.getAlbumFollow(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
