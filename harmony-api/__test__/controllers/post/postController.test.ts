import { NextFunction, Request, Response } from 'express'

import * as postController from '../../../src/controllers/post/postController'
import * as postService from '../../../src/services/postService'
import * as userService from '../../../src/services/userService'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

describe('createPost', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(postService, 'createPost').mockImplementationOnce(() => {
      throw new Error()
    })

    await postController.createPost(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getPostsByAlbumId', () => {
  it('Calls the next function immediately when session cookie is invalid', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockImplementationOnce(() => {
      throw new Error()
    })

    await postController.getPostById(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
