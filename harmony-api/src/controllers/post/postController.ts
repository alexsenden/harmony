import { NextFunction, Request, Response } from 'express'

import * as postService from '../../services/postService'
import * as userService from '../../services/userService'

import { Post } from '../../models/post'
import { HttpError } from '../../models/error/httpError'

export const post = async (req: Request, res: Response, next: NextFunction) => {
  const postData = req.body as Post

  try {
    res.json(await postService.createPost(postData))
  } catch (error) {
    next(error)
  }
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const postId =
    typeof req.params.postId === 'string' ? req.params.postId : undefined
  const requester = await userService.getUserFromCookie(req.cookies.userCookie)

  try {
    res.json(await postService.getPostById(postId, requester))
  } catch (error) {
    next(error)
  }
}

export const postLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const likeData = {
      userId: user.userId,
      postId: req.body.postId,
    }

    res.json(await postService.createLike(likeData))
  } catch (error) {
    next(error)
  }
}

export const removeLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const likeData = {
      userId: user.userId,
      postId: req.body.postId,
    }

    res.json(await postService.deleteLike(likeData))
  } catch (error) {
    next(error)
  }
}

export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const comment = {
      postId: req.params.postId,
      userId: user.userId,
      content: req.body.commentInput,
    }

    res.json(await postService.createComment(comment))
  } catch (error) {
    next(error)
  }
}

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId =
      typeof req.params.postId === 'string' ? req.params.postId : undefined
    res.json(await postService.getComments(postId))
  } catch (error) {
    next(error)
  }
}
