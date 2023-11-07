import { NextFunction, Request, Response } from 'express'

import * as followService from '../../services/followService'

export const toggleUserFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies.userCookie
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

export const toggleArtistFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies.userCookie
    const followingId = req.headers.followingid as string
    const followAction = req.body.followAction as boolean
    if (followAction) {
      res.json(await followService.followArtist(cookie, followingId))
    } else {
      res.json(await followService.unFollowArtist(cookie, followingId))
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
    const cookie = req.cookies.userCookie
    const followingId = req.headers.followingid as string
    res.json(await followService.getFollow(cookie, followingId))
  } catch (error) {
    next(error)
  }
}
