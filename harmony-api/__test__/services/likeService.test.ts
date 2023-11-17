import { HttpError } from '../../src/models/error/httpError'
import { FAKE_LIKE } from '../testUtils/testData'
import * as likeService from '../../src/services/likeService'
import { Like } from '../../src/models/like'

describe('createLike', () => {
  it('throws an error if userId is undefined', async () => {
    expect(async () => {
      await likeService.createLike({
        ...FAKE_LIKE,
        userId: undefined,
      } as unknown as Like)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if postId is undefined', async () => {
    expect(async () => {
      await likeService.createLike({
        ...FAKE_LIKE,
        postId: undefined,
      } as unknown as Like)
    }).rejects.toThrow(HttpError)
  })
})

describe('getLikes', () => {
  it('returns empty array if postId is undefined', async () => {
    const result = await likeService.getLikes(undefined)
    expect(result).toStrictEqual([])
  })
})

describe('deleteLike', () => {
  it('throws an error if userId is undefined', async () => {
    expect(async () => {
      await likeService.deleteLike({
        ...FAKE_LIKE,
        userId: undefined,
      } as unknown as Like)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if postId is undefined', async () => {
    expect(async () => {
      await likeService.deleteLike({
        ...FAKE_LIKE,
        postId: undefined,
      } as unknown as Like)
    }).rejects.toThrow(HttpError)
  })
})
