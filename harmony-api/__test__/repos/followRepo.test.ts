import prisma from '../../prisma/prisma'
import { FAKE_FOLLOW } from '../testUtils/testData'
import * as followRepo from '../../src/repos/followRepo'
import { HttpError } from '../../src/models/error/httpError'

describe('followUser', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.follow, 'create').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await followRepo.followUser(FAKE_FOLLOW)
    }).rejects.toThrow(HttpError)
  })
})

describe('unFollowUser', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.follow, 'delete').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await followRepo.unFollowUser(FAKE_FOLLOW)
    }).rejects.toThrow(HttpError)
  })
})

describe('followArtist', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.followArtist, 'create').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await followRepo.followArtist(FAKE_FOLLOW)
    }).rejects.toThrow(HttpError)
  })
})

describe('unFollowArtist', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.followArtist, 'delete').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await followRepo.unFollowArtist(FAKE_FOLLOW)
    }).rejects.toThrow(HttpError)
  })
})

describe('followSong', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.followSong, 'create').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await followRepo.followSong(FAKE_FOLLOW)
    }).rejects.toThrow(HttpError)
  })
})

describe('unFollowSong', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.followSong, 'delete').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await followRepo.unFollowSong(FAKE_FOLLOW)
    }).rejects.toThrow(HttpError)
  })
})

describe('followAlbum', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.followAlbum, 'create').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await followRepo.followAlbum(FAKE_FOLLOW)
    }).rejects.toThrow(HttpError)
  })
})

describe('unFollowAlbum', () => {
  it('throws an HttpError if prisma throws an error', async () => {
    jest.spyOn(prisma.followAlbum, 'delete').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await followRepo.unFollowAlbum(FAKE_FOLLOW)
    }).rejects.toThrow(HttpError)
  })
})
