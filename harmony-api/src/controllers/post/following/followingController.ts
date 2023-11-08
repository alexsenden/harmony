import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'

export const getAllFollowingFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId =
    typeof req.query.userId === 'string' ? req.query.userId : undefined

  try {
    res.json(await postService.getAllFollowingPosts(userId))
  } catch (error) {
    next(error)
  }
}

export const getFollowingUserFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId =
    typeof req.query.userId === 'string' ? req.query.userId : undefined

  try {
    res.json(await postService.getFollowingUserPosts(userId))
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
