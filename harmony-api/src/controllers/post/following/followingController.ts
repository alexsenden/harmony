import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import * as userService from '../../../services/userService'
import { HttpError } from '../../../models/error/httpError'

export const getFollowingFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const feedType =
    typeof req.params.feedType === 'string' ? req.params.feedType : undefined

  try {
    const requester = await userService.getUserFromCookie(
      req.cookies.userCookie
    )
    if (!requester) {
      throw new HttpError('Unauthorized', 401)
    }

    switch (feedType) {
      case 'all':
        res.json(await postService.getAllFollowingPosts(requester))
        break
      case 'user':
        res.json(await postService.getFollowingUserPosts(requester))
        break
      case 'album':
        res.json(await postService.getFollowingAlbumPosts(requester))
        break
      case 'artist':
        res.json(await postService.getFollowingArtistPosts(requester))
        break
      case 'song':
        res.json(await postService.getFollowingSongPosts(requester))
        break
      default:
        throw new HttpError(`Feed type ${feedType} invalid`, 400)
    }
  } catch (error) {
    next(error)
  }
}
