/* eslint-disable @typescript-eslint/ban-ts-comment */
import prisma from '../../prisma/prisma'
import { FAKE_COMMENT, FAKE_POST, FAKE_USER_1 } from '../testUtils/testData'
import * as commentRepo from '../../src/repos/commentRepo'

describe('createComment', () => {
  it('Returns empty string for content if content is null', async () => {
    jest
      .spyOn(prisma.comment, 'create')
      .mockResolvedValueOnce({ ...FAKE_COMMENT, content: null })

    const result = await commentRepo.createComment(FAKE_COMMENT)
    expect(result).toStrictEqual({ ...FAKE_COMMENT, content: '' })
  })
})

describe('getComments', () => {
  it('Returns empty string for content if content is null', async () => {
    jest.spyOn(prisma.comment, 'findMany').mockResolvedValueOnce([
      // @ts-ignore
      { ...FAKE_COMMENT, post: FAKE_POST, content: null },
    ])

    const result = await commentRepo.getComments(FAKE_POST.postId)
    expect(result).toStrictEqual([
      {
        ...FAKE_COMMENT,
        content: '',
        user: undefined,
        postTitle: FAKE_POST.title,
      },
    ])
  })
})

describe('getCommentsByUserID', () => {
  it('Returns empty string for content if content is null', async () => {
    jest.spyOn(prisma.comment, 'findMany').mockResolvedValueOnce([
      // @ts-ignore
      { ...FAKE_COMMENT, post: FAKE_POST, content: null },
    ])

    const result = await commentRepo.getCommentsByUserID(FAKE_USER_1.userId)
    expect(result).toStrictEqual([
      {
        ...FAKE_COMMENT,
        content: '',
        user: undefined,
        postTitle: FAKE_POST.title,
      },
    ])
  })
})
