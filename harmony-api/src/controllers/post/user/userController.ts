import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'

export const getPostsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId =
    typeof req.params.userId === 'string' ? req.params.userId : undefined

  try {
    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )
    res.json(await postService.getPostByUserId(userId, requester))
  } catch (error) {
    next(error)
  }
}
