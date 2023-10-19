import { register } from '../../src/repos/userRepo'
import { prismaMock } from '../prisma/singleton' // Import the prismaMock
import { HttpError } from '../../src/models/error/httpError'
import prisma from '../../prisma/prisma'

/*
    This test interacts with locally deployable DB, and part of the integration testing
*/
describe('register function with Singleton', () => {
  it('should create a new user', async () => {
    jest.spyOn(prisma.user, 'create').mockResolvedValueOnce({
      userId: '1',
      username: 'testuser',
      password: 'testpassword',
      firstName: 'John',
      lastName: 'Doe',
      active: true,
      createdAt: new Date(),
    })

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
    }

    prismaMock.user.create.mockResolvedValue(userData)

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
 /*
  it('should throw an error if username already exists', async () => {
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
    }

    prismaMock.user.create.mockImplementation()

    await expect(register(userData)).rejects.toThrow(
      new HttpError('Username already exists', 400)
    )
  })
  TEMPORARILY DISABLED.
  */
})
