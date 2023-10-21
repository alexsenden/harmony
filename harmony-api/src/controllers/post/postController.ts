import { NextFunction, Request, Response } from 'express'

import * as postService from '../../services/postService'
import { Post } from '../../models/post'
import { Like } from '../../models/like'

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const postData = req.body as Post

  try {
    res.json(await postService.createPost(postData))
  } catch (error) {
    next(error)
  }
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const userId =
    typeof req.query.userId === 'string' ? req.query.userId : undefined

  try {
    res.json(await postService.getPostByUserId(userId))
  } catch (error) {
    next(error)
  }
}
