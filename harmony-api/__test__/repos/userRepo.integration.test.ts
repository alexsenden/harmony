import { register } from '../../src/repos/userRepo'
import { HttpError } from '../../src/models/error/httpError'
import prisma from '../../prisma/prisma'

/*
    This test interacts with locally deployable DB, and part of the integration testing
*/

describe('register function with Singleton', () => {
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

  afterAll(async () => {
    const deleted = await prisma.user.delete(userToDelete)
    console.log('DELETED ', deleted)
  })

  it('should create a new user', async () => {
    const result = await register(userData)

    const comparisonSrc = {
      username: userData.username,
      password: userData.password,
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
  })

  it('should throw an error if username already exists', async () => {
    await expect(register(userData)).rejects.toThrow(HttpError)
  })
})
