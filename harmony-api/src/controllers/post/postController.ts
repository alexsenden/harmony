import { NextFunction, Request, Response } from 'express'

import * as postService from '../../services/postService'
import * as userService from '../../services/userService'

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
  const postId =
    typeof req.params.postId === 'string' ? req.params.postId : undefined

  try {
    res.json(await postService.getPostById(postId))
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
    const likeData = req.body as Like
    const userCookie = req.cookies.userCookie
    const user = await userService.getUserFromCookie(userCookie)
    likeData.userId = user.userId
    res.json(await postService.createLike(likeData))
  } catch (error) {
    next(error)
  }
}

export const getLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCookie = req.cookies.userCookie
    const user = await userService.getUserFromCookie(userCookie)
    res.json(await postService.getLikesbyUserId(user.userId))
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
    const likeData = req.body as Like
    const userCookie = req.cookies.userCookie
    const user = await userService.getUserFromCookie(userCookie)
    likeData.userId = user.userId
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
    const comment = {
      postId: req.params.postId,
      userId: user.userId,
      content: req.body.commentInput,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log((req as any).postId)
    console.log(comment)
    console.log(req.params)
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
