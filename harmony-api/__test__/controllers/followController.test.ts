import {
  follow,
  getFollow,
  getFollowCount,
} from '../../src/controllers/follow/followController'
import { Request, Response, NextFunction } from 'express'
import { FAKE_USER_1, FAKE_USER_2, FAKE_USER_1_COOKIE } from '../testData'

import * as followService from '../../src/services/followService'
import { Follow } from '../../src/models/follow'

interface CustomFollowRequest extends Request {
  body: {
    followAction: boolean
  }
  headers: {
    usercookie: string
    followingid: string
  }
} //express did not like headers in the request, so I made this subtype
interface CustomFollowCountRequest extends Request {
  headers: {
    userid: string
  }
}

describe('Follow Controller', () => {
  /*
        Description: test if followController allows us to let a user follow another
    */
  it('should let user1 follow user2', async () => {
    const mockedFollow: Follow = {
      followingId: FAKE_USER_1.userId,
      followerId: FAKE_USER_2.userId,
    }

    const req: Request = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: true,
      },
    } as CustomFollowRequest
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'followUser').mockResolvedValue(mockedFollow)

    await follow(req, res, next)

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
    const req: Request = {
      headers: {
        usercookie: 'REAL-USER-1-COOKIE',
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: true,
      },
    } as CustomFollowRequest
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'followUser').mockRejectedValue(mockedFollow)

    await follow(req, res, next)

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
    const req: Request = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: true,
      },
    } as CustomFollowRequest
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'followUser').mockRejectedValue(mockedFollow)

    await follow(req, res, next)

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

    const req: Request = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: false,
      },
    } as CustomFollowRequest
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'unFollowUser').mockResolvedValue(mockedFollow)

    await follow(req, res, next)

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
    const req: Request = {
      headers: {
        usercookie: 'REAL-USER-1-COOKIE',
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: false,
      },
    } as CustomFollowRequest
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'unFollowUser').mockRejectedValue(mockedFollow)

    await follow(req, res, next)

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
    const req: Request = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: false,
      },
    } as CustomFollowRequest
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'unFollowUser').mockRejectedValue(mockedFollow)

    await follow(req, res, next)

    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })
})

describe('Follow Count Controller', () => {
  /*
       Description: test if followController allows us to get the number of followers a user has
   */
  it('should get user 1s follower count', async () => {
    const mockedFollowers = 3

    const req: Request = {
      headers: {
        userid: FAKE_USER_1.userId,
      },
    } as CustomFollowCountRequest

    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest
      .spyOn(followService, 'getFollowCount')
      .mockResolvedValue(mockedFollowers)

    await getFollowCount(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(3)
    expect(next).not.toHaveBeenCalled()
  })
})

describe('Follow Check Controller', () => {
  /*
       Description: test if followController allows us to check if 2 users follow eachother
   */
  it('should get true since the two users follow eachother', async () => {
    const mockedFollowResult = true

    const req: Request = {
      headers: {
        usercookie: FAKE_USER_1_COOKIE.cookie,
        followingid: FAKE_USER_2.userId,
      },
      body: {
        followAction: false,
      },
    } as CustomFollowRequest
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    jest.spyOn(followService, 'getFollow').mockResolvedValue(mockedFollowResult)

    await getFollow(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(true)
    expect(next).not.toHaveBeenCalled()
  })
})
