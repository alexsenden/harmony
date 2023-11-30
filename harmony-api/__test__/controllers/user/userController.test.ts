import { Request, Response, NextFunction } from 'express'

import * as userService from '../../../src/services/userService'
import * as userController from '../../../src/controllers/user/userController'
import { FAKE_USER_1, FAKE_USER_1_COOKIE } from '../../testUtils/testData'

let req: Request, res: Response, next: NextFunction
beforeEach(() => {
  req = { cookies: {}, params: {} } as Request

  res = {
    json: jest.fn(),
  } as unknown as Response

  next = jest.fn() as unknown as NextFunction
})

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
    picture: 0,
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
      cookie: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    const mockCookie = 'your-mock-cookie-value'

    jest.spyOn(userService, 'register').mockResolvedValue(mockUser)
    jest.spyOn(userService, 'assignUserCookie').mockResolvedValue(mockCookie)

    await userController.register(req, res, next)
    expect(res.cookie).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({
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

    await userController.register(req, res, next)

    expect(res.json).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })
})

describe('updateAccount', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(userService, 'setUserData').mockImplementationOnce(() => {
      throw new Error()
    })

    await userController.updateAccount(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('login', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(userService, 'login').mockImplementationOnce(() => {
      throw new Error()
    })

    await userController.login(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('getUserByCookie', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(userService, 'getUserFromCookie').mockImplementationOnce(() => {
      throw new Error()
    })
    req.cookies.userCookie = FAKE_USER_1_COOKIE.cookie

    await userController.getUserByCookie(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  it('Returns null when the cookie is undefined', async () => {
    await userController.getUserByCookie(req, res, next)

    expect(res.json).toHaveBeenCalledWith(null)
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})

describe('getUserByUsername', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(userService, 'getUserByUsername').mockImplementationOnce(() => {
      throw new Error()
    })

    await userController.getUserByUsername(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('signOut', () => {
  it('Calls the next function when an error is thrown', async () => {
    jest.spyOn(userService, 'removeUserCookie').mockImplementationOnce(() => {
      throw new Error()
    })

    await userController.signOut(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})

describe('tempUser', () => {
  it('Creates a temporary new user', async () => {
    jest.spyOn(userService, 'register').mockResolvedValue(FAKE_USER_1)
    jest
      .spyOn(userService, 'assignUserCookie')
      .mockResolvedValue(FAKE_USER_1_COOKIE.cookie)

    const res = {
      cookie: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    await userController.getTempUser(req, res, next)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(next).not.toHaveBeenCalled()
  })

  it('Fails to create a temporary new user', async () => {
    jest.spyOn(userService, 'register').mockImplementation(() => {
      throw new Error()
    })

    const res = {
      cookie: jest.fn(),
      json: jest.fn(),
    } as unknown as Response
    const next = jest.fn() as unknown as NextFunction

    await userController.getTempUser(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
