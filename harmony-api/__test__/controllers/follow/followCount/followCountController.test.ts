import * as followCountController from '../../../../src/controllers/follow/followCount/followCountController'
import { Request, Response, NextFunction } from 'express'
import { FAKE_USER_1 } from '../../../testUtils/testData'

import * as followService from '../../../../src/services/followService'

describe('Follow Count Controller', () => {
  /*
		Description: test if followController allows us to get the number of followers a user has
	*/
  it('should get user 1s follower count', async () => {
    const mockedFollowers = 3

    const req = {
      headers: {
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
