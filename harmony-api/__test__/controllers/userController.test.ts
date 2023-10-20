import { register } from '../../src/controllers/user/userController'
import { Request, Response, NextFunction } from 'express'

import * as userService from '../../src/services/userService'

describe('Register Controller', () => {
  /*
        Description: test if usercontroller does not throw an error with correct return
        from register function in userservice.
    */

  const mockUser = {
    userId: '12124',
    username: 'trevorVendi2314',
    password: 'dsajdFfj2#',
    firstName: 'trevor',
    lastName: 'vendi',
    createdAt: new Date(),
    active: true,
  }

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

    const mockCookie = 'your-mock-cookie-value'

    jest.spyOn(userService, 'register').mockResolvedValue(mockUser)
    jest.spyOn(userService, 'assignUserCookie').mockResolvedValue(mockCookie)

    await register(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
      'Set-Cookie': 'userCookie = ' + mockCookie,
      userData: mockUser,
    })
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

    const mockUserFaulty = mockUser
    mockUserFaulty.password = ''

    jest.spyOn(userService, 'register').mockRejectedValue(mockUserFaulty)

    await register(req, res, next)

    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })
})
