import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'

export const getPostsBySongId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const songId =
    typeof req.params.songId === 'string' ? req.params.songId : undefined
  try {
    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )
    res.json(await postService.getPostsBySongId(songId, requester))
  } catch (error) {
    next(error)
  }
}
