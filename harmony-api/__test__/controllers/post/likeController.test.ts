import { NextFunction, Request, Response } from 'express'

import * as likeController from '../../../src/controllers/post/likeController'
import * as userService from '../../../src/services/userService'
import * as likeService from '../../../src/services/likeService'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('postLike', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockResolvedValue(undefined)

    await likeController.postLike(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getLikes', () => {
  it('Calls the next function immediately when an error is thrown', async () => {
    jest.spyOn(likeService, 'getLikes').mockImplementation(() => {
      throw new Error()
    })

    await likeController.getLikes(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('removeLike', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockResolvedValue(undefined)

    await likeController.removeLike(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
