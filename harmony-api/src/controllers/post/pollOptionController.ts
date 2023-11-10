import {NextFunction, Request, Response} from 'express'
import * as userService from '../../services/userService'
import * as pollOptionService from '../../services/pollOptionService'
import {HttpError} from '../../models/error/httpError'
import {PollOptionVote} from '../../models/pollOption'

export const voteOnOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserFromCookie(req.cookies.userCookie)
    if (!user) {
      throw new HttpError('Unauthorized', 401)
    }

    const voteData = {
      userId: user.userId,
      pollOptionId: req.body.pollOptionId,
    } as PollOptionVote

    res.json(await pollOptionService.createPollVote(voteData))
  } catch (error) {
    next(error)
  }
}
