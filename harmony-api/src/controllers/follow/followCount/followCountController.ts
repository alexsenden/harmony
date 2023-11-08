import { NextFunction, Request, Response } from 'express'

import * as followService from '../../../services/followService'

export const getFollowCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers.userid as string
    const followCount = await followService.getFollowCount(userId)
    res.json(followCount)
  } catch (error) {
    next(error)
  }
}

export const getArtistFollowCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artistID = req.headers.artistId as string
    const followCount = await followService.getArtistFollowCount(artistID)
    res.json(followCount)
  } catch (error) {
    next(error)
  }
}

export const getSongFollowCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const songID = req.headers.songId as string
    const followCount = await followService.getSongFollowCount(songID)
    res.json(followCount)
  } catch (error) {
    next(error)
  }
}

export const getAlbumFollowCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const albumID = req.headers.albumId as string
    const followCount = await followService.getAlbumFollowCount(albumID)
    res.json(followCount)
  } catch (error) {
    next(error)
  }
}
