import prisma from '../../prisma/prisma'
import { FAKE_ALBUM } from '../testUtils/testData'
import * as albumRepo from '../../src/repos/albumRepo'
import { HttpError } from '../../src/models/error/httpError'

describe('getAlbumById', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.album, 'findUniqueOrThrow').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await albumRepo.getAlbumById(FAKE_ALBUM.albumId)
    }).rejects.toThrow(HttpError)
  })
})
