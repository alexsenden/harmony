import { NextFunction, Request, Response } from 'express'

import * as likeService from '../../services/likeService'
import * as userService from '../../services/userService'

import { HttpError } from '../../models/error/httpError'

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

    res.json(await likeService.createLike(likeData))
  } catch (error) {
    next(error)
  }
}
export const getLikes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId =
      typeof req.params.postId === 'string' ? req.params.postId : undefined
    res.json(await likeService.getLikes(postId))
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

    res.json(await likeService.deleteLike(likeData))
  } catch (error) {
    next(error)
  }
}
