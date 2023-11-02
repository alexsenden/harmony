import { NextFunction, Request, Response } from 'express'

import * as followService from '../../services/followService'

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.cookies.usercookie as string
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

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.cookies.usercookie as string
    const followingId = req.headers.followingid as string
    res.json(await followService.getFollow(cookie, followingId))
  } catch (error) {
    next(error)
  }
}
