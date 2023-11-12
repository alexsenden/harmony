import { NextFunction, Request, Response } from 'express'

import * as postService from '../../services/postService'
import * as userService from '../../services/userService'

import { Post } from '../../models/post'

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postData = req.body as Post

  try {
    res.json(await postService.createPost(postData))
  } catch (error) {
    next(error)
  }
}

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId =
    typeof req.params.postId === 'string' ? req.params.postId : undefined
  const requester = await userService.getUserFromCookie(req.cookies.userCookie)
  try {
    res.json(await postService.getPostById(postId, requester))
  } catch (error) {
    next(error)
  }
}
