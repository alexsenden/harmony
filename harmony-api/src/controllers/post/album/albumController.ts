import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'

export const getPostsByAlbumId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const offset =
      typeof req.query.offset === 'string' && !isNaN(parseInt(req.query.offset))
        ? parseInt(req.query.offset)
        : 0
    const albumId =
      typeof req.params.albumId === 'string' &&
      !isNaN(parseInt(req.params.albumId))
        ? parseInt(req.params.albumId)
        : undefined

    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )

    res.json(await postService.getPostsByAlbumId(offset, albumId, requester))
  } catch (error) {
    next(error)
  }
}
