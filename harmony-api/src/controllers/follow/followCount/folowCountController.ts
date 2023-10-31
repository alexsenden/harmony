import { NextFunction, Request, Response } from 'express'

import * as followService from '../../../services/followService'

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers.userid as string
    const followCount = await followService.getFollowCount(userId)
    res.json(followCount)
  } catch (error) {
    next(error)
  }
}
