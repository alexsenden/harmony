import { NextFunction, Request, Response } from 'express'

import * as postService from '../../services/postService'
import * as userService from '../../services/userService'

import { Post } from '../../models/post'
import { Like } from '../../models/like'
import { Comment } from '../../models/comment'

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
    const commentData = req.body as Comment
    const userCookie = req.cookies.userCookie
    const user = await userService.getUserFromCookie(userCookie)
    commentData.userId = user.userId
    commentData.content = req.body.commentInput
    res.json(await postService.createComment(commentData))
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
      typeof req.query.postId === 'string' ? req.query.postId : undefined
    res.json(await postService.getComments(postId))
  } catch (error) {
    next(error)
  }
}
