import { register } from '../../src/controllers/user/userController'
import { Request, Response, NextFunction } from 'express'

const userService = require('../../src/services/userService')

jest.mock('../../src/services/userService', () => ({
  register: jest.fn(),
}))

describe('Register Controller', () => {
  /*
        Description: test if usercontroller does not throw an error with correct return
        from register function in userservice.
    */

  it('should register a user', async () => {
    const req = {
      body: {
        username: 'trevorVendi2314',
        password: 'dsajdFfj2#',
        firstName: 'trevor',
        lastName: 'vendi',
      },
    } as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    const mockUser = {
      id: 12412,
      username: 'trevorVendi2314',
      password: 'dsajdFfj2#',
      firstName: 'trevor',
      lastName: 'vendi',
    }
    userService.register.mockResolvedValue(mockUser)

    await register(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(mockUser)
    expect(next).not.toHaveBeenCalled()
  })

  /*
        Description: test if usercontroller throws an error with an error from register function
        in userservice.
    */

  it('should handle registration errors', async () => {
    const req = {
      body: {
        username: 'trevorVendi2314',
        password: 'dsajdFfj2#',
        firstName: 'trevor',
        lastName: 'vendi',
      },
    } as Request
    const res = {
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    const errorMessage = 'Registration failed'
    userService.register.mockRejectedValue(new Error(errorMessage))

    await register(req, res, next)

    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(expect.any(Error))
  })
})
