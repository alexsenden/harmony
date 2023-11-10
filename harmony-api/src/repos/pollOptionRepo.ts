import prisma from '../../prisma/prisma'
import {PollOption, PollOptionVote} from '../models/pollOption'
import {HttpError} from "../models/error/httpError";

export interface ICreatePollOption {
  pollOptionData: PollOption
  postId: string
}

export const createPollOption = async ({
  pollOptionData,
  postId,
}: ICreatePollOption): Promise<PollOption> => {
  const pollOptionResult = await prisma.pollOption.create({
    data: {
      option: pollOptionData.option,
      postId: postId,
    },
  })

  return {
    pollOptionId: pollOptionResult.pollOptionId,
    option: pollOptionResult.option,
  }
}

export const voteOnPollOption = async (pollData: PollOptionVote): Promise<PollOptionVote> => {
  const pollPost = await prisma.pollOption.findFirst({
    where: {
      pollOptionId: pollData.pollOptionId
    }
  })
  const postId = pollPost?.postId

  const voteCount = await prisma.pollVote.count({
    where: {
      userId: pollData.userId,
      pollOption: {
        postId: postId,
      },
    },
  })
  if (voteCount > 0) {
    throw new HttpError('user has voted on this post already', 400)
  }

  const newVote = await prisma.pollVote.create({
    data: {
      pollOptionId: pollData.pollOptionId,
      userId: pollData.userId,
    },
  })

  return {
    pollOptionId: newVote.pollOptionId,
    userId: newVote.userId,
  }
}
