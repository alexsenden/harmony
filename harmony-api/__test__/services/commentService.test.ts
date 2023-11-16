import { Comment } from '../../src/models/comment'
import { HttpError } from '../../src/models/error/httpError'
import { FAKE_COMMENT } from '../testUtils/testData'
import * as commentService from '../../src/services/commentService'

describe('createComment', () => {
  it('throws an error if userId is undefined', async () => {
    expect(async () => {
      await commentService.createComment({
        ...FAKE_COMMENT,
        userId: undefined,
      } as unknown as Comment)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if postId is undefined', async () => {
    expect(async () => {
      await commentService.createComment({
        ...FAKE_COMMENT,
        postId: undefined,
      } as unknown as Comment)
    }).rejects.toThrow(HttpError)
  })
})

describe('getComments', () => {
  it('returns empty array if postId is undefined', async () => {
    const result = await commentService.getComments(undefined)
    expect(result).toStrictEqual([])
  })
})

describe('getCommentsByUserID', () => {
  it('returns empty array if userId is undefined', async () => {
    const result = await commentService.getCommentsByUserID(undefined)
    expect(result).toStrictEqual([])
  })
})
