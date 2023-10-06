import { NextFunction, Request, Response } from 'express'

import * as topicService from '../../services/topicService'

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const partialName =
    typeof req.query.partialName === 'string'
      ? req.query.partialName
      : undefined

  try {
    res.json(await topicService.getTopicByPartialName(partialName))
  } catch (error) {
    next(error)
  }
}
