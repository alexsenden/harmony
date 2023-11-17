import prisma from '../../prisma/prisma'
import { FAKE_SONG } from '../testUtils/testData'
import * as songRepo from '../../src/repos/songRepo'
import { HttpError } from '../../src/models/error/httpError'

describe('getSongById', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.song, 'findUniqueOrThrow').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await songRepo.getSongById(FAKE_SONG.songId)
    }).rejects.toThrow(HttpError)
  })
})
