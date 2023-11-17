import prisma from '../../prisma/prisma'
import { FAKE_ARTIST } from '../testUtils/testData'
import * as artistRepo from '../../src/repos/artistRepo'
import { HttpError } from '../../src/models/error/httpError'

describe('getArtistById', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.artist, 'findUniqueOrThrow').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await artistRepo.getArtistById(FAKE_ARTIST.artistId)
    }).rejects.toThrow(HttpError)
  })
})
