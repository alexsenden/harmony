import {
  register,
  getUserByName,
  getUserByLoginInfo,
  setUserData,
  getUserByPartialUsername,
  getUserFromCookie,
} from '../../src/repos/userRepo'
import { HttpError } from '../../src/models/error/httpError'
import prisma from '../../prisma/prisma'
import { User } from '../../src/models/user'

describe('Integration tests for UserRepo functions', () => {
  let result: User

  const userToDelete = {
    where: {
      username: 'testuser',
    },
  }

  const userData = {
    userId: '1',
    username: 'testuser',
    password: 'testpassword',
    firstName: 'John',
    lastName: 'Doe',
    active: true,
    posts: [],
    likes: [],
    comments: [],
    follows: [],
    followers: [],
    createdAt: new Date(),
    picture: 0,
  }

  beforeEach(async () => {
    result = await register(userData)
  })

  afterEach(async () => {
    try {
      const deleted = await prisma.user.delete(userToDelete)
      console.log('DELETED ', deleted)
    } catch (e) {
      console.log(e)
    }
  })

  afterAll(async () => {
    try {
      const deleted = await prisma.user.delete(userToDelete)
      console.log('DELETED ', deleted)
    } catch (e) {
      console.log(e)
    }
  })

  it('should create a new user', async () => {
    const comparisonSrc = {
      username: userData.username,
      password: '',
      firstName: userData.firstName,
      lastName: userData.lastName,
    }

    const comparisonRes = {
      username: result.username,
      password: result.password,
      firstName: result.firstName,
      lastName: result.lastName,
    }

    expect(comparisonSrc).toEqual(comparisonRes)

    // user exists so it should fail
    await expect(register(userData)).rejects.toThrow(HttpError)
  })

  it('should get a user by username', async () => {
    const result = await getUserByName(userData.username)

    expect(result).toHaveProperty('username', userData.username)
  })

  it('should get a user by login info', async () => {
    const loginData = {
      username: userData.username,
      password: userData.password,
    }

    const result = await getUserByLoginInfo(loginData)

    expect(result).toHaveProperty('username', userData.username)
  })

  it('should set user data', async () => {
    const existingUser = await getUserByName(userData.username)
    expect(existingUser).toBeDefined()

    const updatedUserData = {
      bio: 'Updated bio',
      picture: 1,
      firstName: 'Updated John',
      lastName: 'Updated Doe',
    }

    const updatedUser = await setUserData({
      userId: existingUser.userId,
      ...updatedUserData,
    })

    expect(updatedUser).toBeDefined()
    expect(updatedUser.bio).toEqual(updatedUserData.bio)
    expect(updatedUser.picture).toEqual(updatedUserData.picture)
    expect(updatedUser.firstName).toEqual(updatedUserData.firstName)
    expect(updatedUser.lastName).toEqual(updatedUserData.lastName)
  })

  it('should get a user by partial username', async () => {
    const partialName = 'test'
    const result = await getUserByPartialUsername(partialName)

    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('username', userData.username)
  })

  it('should throw an error if user is not found during setUserData', async () => {
    const nonExistentUserData = {
      userId: 'nonexistentid',
      bio: 'Updated bio',
      picture: 1,
      firstName: 'Updated John',
      lastName: 'Updated Doe',
    }

    await expect(setUserData(nonExistentUserData)).rejects.toThrow(Error)
  })

  it('should throw an error if user is not found during getUserByName', async () => {
    const nonExistentUserName = 'nonexistentuser'

    await expect(getUserByName(nonExistentUserName)).rejects.toThrow(HttpError)
  })

  it('should throw an error if invalid username or password during getUserByLoginInfo', async () => {
    const invalidLoginData = {
      username: 'invalidusername',
      password: 'invalidpassword',
    }

    await expect(getUserByLoginInfo(invalidLoginData)).rejects.toEqual(
      'Invalid username or password'
    )
  })

  it('should throw an error if user session cookie does not exist during getUserFromCookie', async () => {
    const nonExistentCookie = 'nonexistentcookie'

    await expect(getUserFromCookie(nonExistentCookie)).rejects.toThrow(
      `User session cookie '${nonExistentCookie}' does not exist`
    )
  })
})
