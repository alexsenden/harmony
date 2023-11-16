import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'

export const getPostsByArtistId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const artistId =
    typeof req.params.artistId === 'string' ? req.params.artistId : undefined
  try {
    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )
    res.json(await postService.getPostsByArtistId(artistId, requester))
  } catch (error) {
    next(error)
  }
}
