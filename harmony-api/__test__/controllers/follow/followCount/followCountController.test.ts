import { Request, Response, NextFunction } from 'express'

import { FAKE_USER_1 } from '../../../testUtils/testData'

import * as followCountController from '../../../../src/controllers/follow/followCount/followCountController'
import * as followService from '../../../../src/services/followService'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('Follow Count Controller', () => {
  /*
		Description: test if followController allows us to get the number of followers a user has
	*/
  it('should get user 1s follower count', async () => {
    const mockedFollowers = 3

    const req = {
      params: {
        userid: FAKE_USER_1.userId,
      },
    } as unknown as Request

    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest
      .spyOn(followService, 'getFollowCount')
      .mockResolvedValue(mockedFollowers)

    await followCountController.getFollowCount(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(3)
    expect(next).not.toHaveBeenCalled()
  })
})

describe('getFollowCount', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(followService, 'getFollowCount').mockImplementationOnce(() => {
      throw new Error()
    })

    await followCountController.getFollowCount(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getArtistFollowCount', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest
      .spyOn(followService, 'getArtistFollowCount')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    await followCountController.getArtistFollowCount(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getSongFollowCount', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest
      .spyOn(followService, 'getSongFollowCount')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    await followCountController.getSongFollowCount(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getAlbumFollowCount', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest
      .spyOn(followService, 'getAlbumFollowCount')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    await followCountController.getAlbumFollowCount(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
