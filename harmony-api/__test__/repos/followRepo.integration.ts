import prisma from '../../prisma/prisma'
import {
  followUser,
  unFollowUser,
  followArtist,
  unFollowAlbum,
  getFollow,
  getArtistFollow,
  getSongFollow,
  getAlbumFollow,
  getFollowCount,
  getArtistFollowCount,
  getSongFollowCount,
  getAlbumFollowCount,
} from '../../src/repos/followRepo'
import { Follow } from '../../src/models/follow'
import { HttpError } from '../../src/models/error/httpError'
import { User } from '../../src/models/user'

describe('Integration tests for followRepo functions', () => {
  let testFollow: Follow
  let testUser1: User
  let testUser2: User
  let testUser3: User

  beforeAll(async () => {
    testUser1 = {
      userId: '1',
      username: 'testuser',
      password: 'testpassword',
      firstName: 'John',
      lastName: 'Doe',
      active: true,
      createdAt: new Date(),
      picture: 0,
    }

    testUser2 = {
      userId: '2',
      username: 'testuser2',
      password: 'testpassword2',
      firstName: 'John2',
      lastName: 'Doe2',
      active: true,
      createdAt: new Date(),
      picture: 0,
    }

    testUser3 = {
      userId: '3',
      username: 'testuser3',
      password: 'testpassword3',
      firstName: 'John3',
      lastName: 'Doe3',
      active: true,
      createdAt: new Date(),
      picture: 0,
    }

    await prisma.user.create({
      data: testUser1,
    })
    await prisma.user.create({
      data: testUser2,
    })

    await prisma.user.create({
      data: testUser3,
    })

    testFollow = {
      followingId: '1',
      followerId: '2',
    }

    await followUser(testFollow)
  })

  afterAll(async () => {
    try {
      await prisma.user.deleteMany({
        where: {
          userId: {
            in: [testUser1.userId, testUser2.userId, testUser3.userId],
          },
        },
      })
    } catch (e) {
      console.log(e)
    }
  })

  it('should follow a user', async () => {
    const newFollowData: Follow = {
      followingId: '2',
      followerId: '3',
    }

    const newFollow = await followUser(newFollowData)

    expect(newFollow).toBeDefined()
    expect(newFollow.followingId).toBe(newFollowData.followingId)
    expect(newFollow.followerId).toBe(newFollowData.followerId)

    await unFollowUser(newFollowData)
  })

  it('should get follow status for a user', async () => {
    const isFollowing = await getFollow(testFollow)
    expect(isFollowing).toBe(true)
  })

  it('should get follow status for an artist', async () => {
    const isFollowing = await getArtistFollow(testFollow)
    expect(isFollowing).toBe(false)
  })

  it('should get follow status for a song', async () => {
    const isFollowing = await getSongFollow(testFollow)
    expect(isFollowing).toBe(false)
  })

  it('should get follow status for an album', async () => {
    const isFollowing = await getAlbumFollow(testFollow)
    expect(isFollowing).toBe(false)
  })

  it('should get follow count for a user', async () => {
    const followCount = await getFollowCount(testFollow.followerId)
    expect(followCount).toBeGreaterThanOrEqual(0)
  })

  it('should get follow count for an artist', async () => {
    const followCount = await getArtistFollowCount(testFollow.followingId)
    expect(followCount).toBeGreaterThanOrEqual(0)
  })

  it('should get follow count for a song', async () => {
    const followCount = await getSongFollowCount(testFollow.followingId)
    expect(followCount).toBeGreaterThanOrEqual(0)
  })

  it('should get follow count for an album', async () => {
    const followCount = await getAlbumFollowCount(testFollow.followingId)
    expect(followCount).toBeGreaterThanOrEqual(0)
  })

  it('should get follow status for a user', async () => {
    const isFollowing = await getFollow(testFollow)
    expect(isFollowing).toBe(true)
  })

  it('should get follow status for an artist', async () => {
    const isFollowing = await getArtistFollow(testFollow)
    expect(isFollowing).toBe(false)
  })

  it('should get follow status for a song', async () => {
    const isFollowing = await getSongFollow(testFollow)
    expect(isFollowing).toBe(false)
  })

  it('should get follow status for an album', async () => {
    const isFollowing = await getAlbumFollow(testFollow)
    expect(isFollowing).toBe(false)
  })

  it('should get follow count for a user', async () => {
    const followCount = await getFollowCount(testFollow.followerId)
    expect(followCount).toBeGreaterThanOrEqual(0)
  })

  it('should get follow count for an artist', async () => {
    const followCount = await getArtistFollowCount(testFollow.followingId)
    expect(followCount).toBeGreaterThanOrEqual(0)
  })

  it('should get follow count for a song', async () => {
    const followCount = await getSongFollowCount(testFollow.followingId)
    expect(followCount).toBeGreaterThanOrEqual(0)
  })

  it('should get follow count for an album', async () => {
    const followCount = await getAlbumFollowCount(testFollow.followingId)
    expect(followCount).toBeGreaterThanOrEqual(0)
  })

  it('should unfollow a user', async () => {
    const initialFollow = await prisma.follow.findFirst({
      where: {
        followerId: testFollow.followerId,
        followingId: testFollow.followingId,
      },
    })

    expect(initialFollow).toBeDefined()

    await unFollowUser(testFollow)
    await expect(unFollowUser(testFollow)).rejects.toThrow(Error)

    const deletedFollow = await prisma.follow.findFirst({
      where: {
        followerId: testFollow.followerId,
        followingId: testFollow.followingId,
      },
    })

    expect(deletedFollow).toBeNull()
  })

  describe('followArtist function', () => {
    it('should throw HttpError when followerId is not a valid integer', async () => {
      const followInfo = {
        followingId: '1',
        followerId: '1244112',
      }

      await expect(followArtist(followInfo)).rejects.toThrow(HttpError)
    })
  })
  it('should throw HttpError when followResult is null', async () => {
    await prisma.followAlbum.deleteMany()

    const followInfo = {
      followingId: 'albumId',
      followerId: '1',
    }

    await expect(unFollowAlbum(followInfo)).rejects.toThrow(Error)
  })
})
