import * as pollOptionRepo from '../repos/pollOptionRepo'
import { PollOptionVote } from '../models/pollOption'
import { HttpError } from '../models/error/httpError'

export const createPollVote = async (
  pollData: PollOptionVote
): Promise<PollOptionVote> => {
  if (!pollData.userId) {
    throw new HttpError('userId is required', 400)
  } else if (!pollData.pollOptionId) {
    throw new HttpError('pollOptionId is required', 400)
  }

  return pollOptionRepo.voteOnPollOption(pollData)
}
