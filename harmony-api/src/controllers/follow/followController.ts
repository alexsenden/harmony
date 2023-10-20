import { NextFunction, Request, Response } from 'express'

import * as followService from '../../services/followService'

export const follow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.headers.usercookie as string
    const followingId = req.headers.followingid as string
    const followAction = req.body.followAction as boolean
    if (followAction) {
      res.json(await followService.followUser(cookie, followingId))
    } else {
      res.json(await followService.unFollowUser(cookie, followingId))
    }
  } catch (error) {
    next(error)
  }
}
export const getFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.headers.usercookie as string
    const followingId = req.headers.followingId as string
    res.json(await followService.getFollow(cookie, followingId))
  } catch (error) {
    next(error)
  }
}

export const getFollowCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers.userId as string
    const followCount = await followService.getFollowCount(userId)
    res.json(followCount)
  } catch (error) {
    next(error)
  }
}
