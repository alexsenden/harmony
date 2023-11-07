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
