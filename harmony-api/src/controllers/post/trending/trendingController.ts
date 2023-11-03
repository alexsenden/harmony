import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'

export const getTrendingFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )
    res.json(await postService.getTrendingPosts(requester))
  } catch (error) {
    next(error)
  }
}
