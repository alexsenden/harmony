import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'

export const getPostsByAlbumId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const albumId =
    typeof req.params.albumId === 'string' ? req.params.albumId : undefined
  try {
    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )
    res.json(await postService.getPostsByAlbumId(albumId, requester))
  } catch (error) {
    next(error)
  }
}
