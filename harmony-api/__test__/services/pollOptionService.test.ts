import { HttpError } from '../../src/models/error/httpError'
import { PollOptionVote } from '../../src/models/pollOption'
import * as pollOptionService from '../../src/services/pollOptionService'
import { FAKE_POLL_OPTION_VOTE } from '../testUtils/testData'

describe('createPollVote', () => {
  it('throws an error if userId is undefined', async () => {
    expect(async () => {
      await pollOptionService.createPollVote({
        ...FAKE_POLL_OPTION_VOTE,
        userId: undefined,
      } as unknown as PollOptionVote)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if pollOptionId is undefined', async () => {
    expect(async () => {
      await pollOptionService.createPollVote({
        ...FAKE_POLL_OPTION_VOTE,
        pollOptionId: undefined,
      } as unknown as PollOptionVote)
    }).rejects.toThrow(HttpError)
  })
})
