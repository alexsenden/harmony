import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'

export const getFollowingFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId =
    typeof req.query.userId === 'string' ? req.query.userId : undefined

  try {
    res.json(await postService.getFollowingPosts(userId))
  } catch (error) {
    next(error)
  }
}

export const getFollowingArtistsFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId =
    typeof req.query.userId === 'string' ? req.query.userId : undefined

  try {
    res.json(await postService.getFollowingArtistPosts(userId))
  } catch (error) {
    next(error)
  }
}
