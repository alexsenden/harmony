import { NextFunction, Request, Response } from 'express'

import * as albumController from '../../../../src/controllers/post/album/albumController'
import * as userService from '../../../../src/services/userService'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('getPostsByAlbumId', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockImplementationOnce(() => {
      throw new Error()
    })

    await albumController.getPostsByAlbumId(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
