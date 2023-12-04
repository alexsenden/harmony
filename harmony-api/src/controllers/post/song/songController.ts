import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'

export const getPostsBySongId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const offset =
      typeof req.query.offset === 'string' && !isNaN(parseInt(req.query.offset))
        ? parseInt(req.query.offset)
        : 0
    const songId =
      typeof req.params.songId === 'string' &&
      !isNaN(parseInt(req.params.songId))
        ? parseInt(req.params.songId)
        : undefined

    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )

    res.json(await postService.getPostsBySongId(offset, songId, requester))
  } catch (error) {
    next(error)
  }
}
