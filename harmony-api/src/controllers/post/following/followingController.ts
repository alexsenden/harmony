import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'
import { HttpError } from '../../../models/error/httpError'

export const getFollowingFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const feedType =
    typeof req.params.feedType === 'string' ? req.params.feedType : undefined
  const cookie = req.cookies.userCookie
  try {
    switch (feedType) {
      case 'all':
        res.json(await postService.getAllFollowingPosts(cookie))
        break
      case 'user':
        res.json(await postService.getFollowingUserPosts(cookie))
        break
      case 'album':
        res.json(await postService.getFollowingAlbumPosts(cookie))
        break
      case 'artist':
        res.json(await postService.getFollowingArtistPosts(cookie))
        break
      case 'song':
        res.json(await postService.getFollowingSongPosts(cookie))
        break
      default:
        throw new HttpError(`Feed type ${feedType} invalid`, 400)
    }
  } catch (error) {
    next(error)
  }
}
