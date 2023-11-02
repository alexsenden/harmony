import { NextFunction, Request, Response } from 'express'

import * as postService from '../../../services/postService'

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const userId =
    typeof req.params.userId === 'string' ? req.params.userId : undefined

  try {
    res.json(await postService.getPostByUserId(userId))
  } catch (error) {
    next(error)
  }
}
