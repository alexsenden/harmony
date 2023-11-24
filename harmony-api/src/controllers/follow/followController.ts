import { NextFunction, Request, Response } from 'express'

import * as followService from '../../services/followService'
import * as userService from '../../services/userService'
import { HttpError } from '../../models/error/httpError'

export const toggleUserFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const followingId = req.body.followingId as string
    const followAction = req.body.followAction as boolean

    if (followAction) {
      res.json(await followService.followUser(user, followingId))
    } else {
      res.json(await followService.unFollowUser(user, followingId))
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
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const followingId = req.body.followingId as string
    const followAction = req.body.followAction as boolean

    if (followAction) {
      res.json(await followService.followArtist(user, followingId))
    } else {
      res.json(await followService.unFollowArtist(user, followingId))
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
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const followingId = req.body.followingId as string
    const followAction = req.body.followAction as boolean

    if (followAction) {
      res.json(await followService.followSong(user, followingId))
    } else {
      res.json(await followService.unFollowSong(user, followingId))
    }
  } catch (error) {
    next(error)
  }
}

export const toggleAlbumFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const followingId = req.body.followingId as string
    const followAction = req.body.followAction as boolean

    if (followAction) {
      res.json(await followService.followAlbum(user, followingId))
    } else {
      res.json(await followService.unFollowAlbum(user, followingId))
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
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const followingId = req.body.followingId as string

    res.json(await followService.getFollow(user, followingId))
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
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const followingId = req.body.followingId as string

    res.json(await followService.getArtistFollow(user, followingId))
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
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const followingId = req.body.followingId as string

    res.json(await followService.getSongFollow(user, followingId))
  } catch (error) {
    next(error)
  }
}

export const getAlbumFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const followingId = req.body.followingId as string

    res.json(await followService.getAlbumFollow(user, followingId))
  } catch (error) {
    next(error)
  }
}
