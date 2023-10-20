import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await postService.getTrendingPosts())
  } catch (error) {
    next(error)
  }
}
