import { NextFunction, Request, Response } from 'express'

import * as postService from '../../services/postService'
import { Post } from '../../models/post'

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const postData = req.body as Post

  try {
    res.json(await postService.createPost(postData))
  } catch (error) {
    next(error)
  }
}
