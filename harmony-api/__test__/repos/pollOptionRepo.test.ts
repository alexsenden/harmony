import prisma from '../../prisma/prisma'
import { FAKE_POLL_OPTION_VOTE } from '../testUtils/testData'
import * as pollOptionRepo from '../../src/repos/pollOptionRepo'
import { HttpError } from '../../src/models/error/httpError'

describe('getLikes', () => {
  it('Calls the next function immediately when an error is thrown', async () => {
    jest.spyOn(prisma.pollOption, 'findFirst').mockResolvedValueOnce(null)
    jest.spyOn(prisma.pollVote, 'count').mockResolvedValueOnce(1)

    expect(async () => {
      await pollOptionRepo.voteOnPollOption(FAKE_POLL_OPTION_VOTE)
    }).rejects.toThrow(HttpError)
  })
})
