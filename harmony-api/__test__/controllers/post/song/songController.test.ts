import { NextFunction, Request, Response } from 'express'

import * as songController from '../../../../src/controllers/post/song/songController'
import * as postService from '../../../../src/services/postService'
import * as userService from '../../../../src/services/userService'
import { FAKE_USER_1 } from '../../../testUtils/testData'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {}, query: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('getPostsBySongId', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockImplementationOnce(() => {
      throw new Error()
    })

    await songController.getPostsBySongId(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  it('Parses the offset as a number', async () => {
    jest
      .spyOn(userService, 'getUserFromCookie')
      .mockResolvedValueOnce(FAKE_USER_1)
    jest
      .spyOn(postService, 'getPostsBySongId')
      .mockImplementation(async () => [])
    req.query.offset = '5'

    await songController.getPostsBySongId(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(postService.getPostsBySongId).toHaveBeenCalledWith(
      5,
      undefined,
      expect.anything()
    )
    expect(res.json).toHaveBeenCalled()
  })
})
