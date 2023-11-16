import { NextFunction, Request, Response } from 'express'

import * as commentController from '../../../src/controllers/post/commentController'
import * as userService from '../../../src/services/userService'
import * as commentService from '../../../src/services/commentService'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('postComment', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockResolvedValue(undefined)

    await commentController.postComment(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getComments', () => {
  it('Calls the next function immediately when an error is thrown', async () => {
    jest.spyOn(commentService, 'getComments').mockImplementation(() => {
      throw new Error()
    })

    await commentController.getComments(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getCommentsByUserID', () => {
  it('Calls the next function immediately when an error is thrown', async () => {
    jest.spyOn(commentService, 'getCommentsByUserID').mockImplementation(() => {
      throw new Error()
    })

    await commentController.getCommentsByUserID(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
