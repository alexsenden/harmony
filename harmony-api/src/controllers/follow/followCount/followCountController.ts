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
    const artistID =
      typeof req.params.artistId === 'string' ? req.params.artistId : undefined

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
    const songID =
      typeof req.params.songId === 'string' ? req.params.songId : undefined
    const song = req.headers.songId
    console.log(songID + ' ' + typeof songID + ', ' + song + ' ' + typeof song)
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
    const albumID =
      typeof req.params.albumId === 'string' ? req.params.albumId : undefined

    const followCount = await followService.getAlbumFollowCount(albumID)
    res.json(followCount)
  } catch (error) {
    next(error)
  }
}
