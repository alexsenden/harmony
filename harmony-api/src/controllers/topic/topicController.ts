import { NextFunction, Request, Response } from 'express'

import * as topicService from '../../services/topicService'

export const getTopicByPartialName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const partialName =
    typeof req.params.partialName === 'string'
      ? req.params.partialName
      : undefined

  try {
    res.json(await topicService.getTopicByPartialName(partialName))
  } catch (error) {
    next(error)
  }
}

export const getTopicOrUserByPartialName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const partialName =
    typeof req.params.partialName === 'string'
      ? req.params.partialName
      : undefined

  try {
    res.json(await topicService.getTopicOrUserByPartialName(partialName))
  } catch (error) {
    next(error)
  }
}

export const getArtistById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const artistID =
    typeof req.params.artistID === 'string' ? req.params.artistID : -1

  try {
    const numId: number = +artistID
    res.json(await topicService.getArtistById(numId))
  } catch (error) {
    next(error)
  }
}

export const getSongById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const songID = typeof req.params.songID === 'string' ? req.params.songID : -1

  try {
    const numId: number = +songID
    res.json(await topicService.getSongById(numId))
  } catch (error) {
    next(error)
  }
}
