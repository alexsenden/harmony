import prisma from '../../prisma/prisma'
import { FAKE_USER_1, FAKE_USER_1_COOKIE } from '../testUtils/testData'
import * as userRepo from '../../src/repos/userRepo'
import { HttpError } from '../../src/models/error/httpError'

describe('getUserByName', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.user, 'create').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await userRepo.register(FAKE_USER_1)
    }).rejects.toThrow(HttpError)
  })
})

describe('getUserByName', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.user, 'findUniqueOrThrow').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await userRepo.getUserByName(FAKE_USER_1.username)
    }).rejects.toThrow(HttpError)
  })
})

describe('getUserByLoginInfo', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.user, 'findFirst').mockResolvedValueOnce(null)

    expect(async () => {
      await userRepo.getUserByLoginInfo(FAKE_USER_1)
    }).rejects.toThrow(HttpError)
  })
})

describe('getUserFromCookie', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.user, 'findFirstOrThrow').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(async () => {
      await userRepo.getUserFromCookie(FAKE_USER_1_COOKIE.cookie)
    }).rejects.toThrow(HttpError)
  })
})
