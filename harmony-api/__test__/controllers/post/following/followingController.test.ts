import { NextFunction, Request, Response } from 'express'

import * as followingController from '../../../../src/controllers/post/following/followingController'
import * as userService from '../../../../src/services/userService'
import { FAKE_USER_1 } from '../../../testUtils/testData'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('getFollowingFeed', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockResolvedValue(undefined)

    await followingController.getFollowingFeed(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  it('Throws an error when the feed type is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockResolvedValue(FAKE_USER_1)

    await followingController.getFollowingFeed(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
