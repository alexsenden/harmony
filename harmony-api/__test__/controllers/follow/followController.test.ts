import { Request, Response, NextFunction } from 'express'

import { post, get } from '../../../src/controllers/follow/followController'
import { FAKE_USER_1, FAKE_USER_2, FAKE_USER_1_COOKIE } from '../../testData'
import * as followService from '../../../src/services/followService'
import { Follow } from '../../../src/models/follow'

describe('Follow Controller', () => {
  /*
    Description: test if followController allows us to let a user follow another
  */
  it('should let user1 follow user2', async () => {
    const mockedFollow: Follow = {
      followingId: FAKE_USER_1.userId,
      followerId: FAKE_USER_2.userId,
    }

    const req = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: true,
      },
    } as unknown as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'followUser').mockResolvedValue(mockedFollow)

    await post(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(mockedFollow)
    expect(next).not.toHaveBeenCalled()
  })

  /*
    Description: test if followController will reject a follow if users cookie is incorrect
  */
  it('should reject user1s follow on user2', async () => {
    const mockedFollow: Follow = {
      followingId: FAKE_USER_1.userId,
      followerId: FAKE_USER_2.userId,
    }
    const req = {
      headers: {
        usercookie: 'REAL-USER-1-COOKIE',
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: true,
      },
    } as unknown as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'followUser').mockRejectedValue(mockedFollow)

    await post(req, res, next)

    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })

  /*
    Description: test if followController will reject a follow if user is already following
  */
  it('should reject user1s follow on user2', async () => {
    const mockedFollow: Follow = {
      followingId: FAKE_USER_1.userId,
      followerId: FAKE_USER_2.userId,
    }
    const req = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: true,
      },
    } as unknown as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'followUser').mockRejectedValue(mockedFollow)

    await post(req, res, next)

    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })
})

describe('Un-Follow Controller', () => {
  /*
    Description: test if followController allows us to let a user un-follow another
  */
  it('should let user1 un-follow user2', async () => {
    const mockedFollow: Follow = {
      followingId: FAKE_USER_1.userId,
      followerId: FAKE_USER_2.userId,
    }

    const req = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: false,
      },
    } as unknown as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'unFollowUser').mockResolvedValue(mockedFollow)

    await post(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(mockedFollow)
    expect(next).not.toHaveBeenCalled()
  })

  /*
    Description: test if followController will reject an un-follow if users cookie is incorrect
  */
  it('should reject user1s follow on user2', async () => {
    const mockedFollow: Follow = {
      followingId: FAKE_USER_1.userId,
      followerId: FAKE_USER_2.userId,
    }
    const req = {
      headers: {
        usercookie: 'REAL-USER-1-COOKIE',
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: false,
      },
    } as unknown as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'unFollowUser').mockRejectedValue(mockedFollow)

    await post(req, res, next)

    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })

  /*
    Description: test if followController will reject an un-follow if user
    is not already following
  */
  it('should reject user1s un-follow on user2', async () => {
    const mockedFollow: Follow = {
      followingId: FAKE_USER_1.userId,
      followerId: FAKE_USER_2.userId,
    }
    const req = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: false,
      },
    } as unknown as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'unFollowUser').mockRejectedValue(mockedFollow)

    await post(req, res, next)

    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })
})

describe('Follow Check Controller', () => {
  /*
		Description: test if followController allows us to check if 2 users follow eachother
	*/
  it('should get true since the two users follow eachother', async () => {
    const mockedFollowResult = true

    const req = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: false,
      },
    } as unknown as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'getFollow').mockResolvedValue(mockedFollowResult)

    await get(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(true)
    expect(next).not.toHaveBeenCalled()
  })
})
