import { NextFunction, Request, Response } from 'express'

import * as commentService from '../../services/commentService'
import * as userService from '../../services/userService'

import { HttpError } from '../../models/error/httpError'

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

    res.json(await commentService.createComment(comment))
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
    res.json(await commentService.getComments(postId))
  } catch (error) {
    next(error)
  }
}

export const getCommentsByUserID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID =
      typeof req.params.userId === 'string' ? req.params.userId : undefined
    res.json(await commentService.getCommentsByUserID(userID))
  } catch (error) {
    next(error)
  }
}
