import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'
import { HttpError } from '../../../models/error/httpError'

export const getFollowingFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter =
      typeof req.params.feedType === 'string' ? req.params.feedType : undefined
    const offset =
      typeof req.query.offset === 'string' && !isNaN(parseInt(req.query.offset))
        ? parseInt(req.query.offset)
        : 0

    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )
    if (!requester) {
      throw new HttpError('Unauthorized', 401)
    }

    res.json(await postService.getFollowingPosts(filter, offset, requester))
  } catch (error) {
    next(error)
  }
}
