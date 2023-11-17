import { NextFunction, Request, Response } from 'express'

import * as pollOptionController from '../../../src/controllers/post/pollOptionController'
import * as userService from '../../../src/services/userService'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('postLike', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockResolvedValue(undefined)

    await pollOptionController.voteOnOption(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
