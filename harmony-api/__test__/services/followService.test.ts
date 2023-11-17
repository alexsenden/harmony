import { HttpError } from '../../src/models/error/httpError'
import * as followService from '../../src/services/followService'

describe('getArtistFollowCount', () => {
  it('throws an error if artistId is undefined', async () => {
    expect(async () => {
      await followService.getArtistFollowCount(undefined)
    }).rejects.toThrow(HttpError)
  })
})

describe('getSongFollowCount', () => {
  it('throws an error if songId is undefined', async () => {
    expect(async () => {
      await followService.getSongFollowCount(undefined)
    }).rejects.toThrow(HttpError)
  })
})

describe('getAlbumFollowCount', () => {
  it('throws an error if albumId is undefined', async () => {
    expect(async () => {
      await followService.getAlbumFollowCount(undefined)
    }).rejects.toThrow(HttpError)
  })
})
