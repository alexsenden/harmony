import prisma from '../../prisma/prisma'
import { PollOption } from '../models/pollOption'

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
