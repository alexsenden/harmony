import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'

export const getPostsByArtistId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const offset =
      typeof req.query.offset === 'string' && !isNaN(parseInt(req.query.offset))
        ? parseInt(req.query.offset)
        : 0
    const artistId =
      typeof req.params.artistId === 'string' &&
      !isNaN(parseInt(req.params.artistId))
        ? parseInt(req.params.artistId)
        : undefined

    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )

    res.json(await postService.getPostsByArtistId(offset, artistId, requester))
  } catch (error) {
    next(error)
  }
}
