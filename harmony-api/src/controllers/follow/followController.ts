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

export const toggleSongFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies.userCookie
    const followingId = req.headers.followingid as string
    const followAction = req.body.followAction as boolean
    if (followAction) {
      res.json(await followService.followSong(cookie, followingId))
    } else {
      res.json(await followService.unFollowSong(cookie, followingId))
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

export const getArtistFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies.userCookie
    const followingId = req.headers.followingid as string
    res.json(await followService.getArtistFollow(cookie, followingId))
  } catch (error) {
    next(error)
  }
}

export const getSongFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies.userCookie
    const followingId = req.headers.followingid as string
    res.json(await followService.getSongFollow(cookie, followingId))
  } catch (error) {
    next(error)
  }
}
