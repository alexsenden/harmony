import { HttpError } from '../../src/models/error/httpError'
import { User } from '../../src/models/user'
import * as userService from '../../src/services/userService'
import * as userRepo from '../../src/repos/userRepo'
import * as userCookieRepo from '../../src/repos/userCookieRepo'
import {
  FAKE_ACCOUNT,
  FAKE_USER_1,
  FAKE_USER_1_COOKIE,
} from '../testUtils/testData'

describe('register', () => {
  it('throws an error if userData is undefined', async () => {
    expect(async () => {
      await userService.register(undefined)
    }).rejects.toThrow(HttpError)
  })
})

describe('login', () => {
  it('throws an error if loginData is undefined', async () => {
    expect(async () => {
      await userService.login(undefined)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if credentials are incorrect', async () => {
    jest.spyOn(userRepo, 'getUserByLoginInfo').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await userService.login(FAKE_USER_1)
    }).rejects.toThrow(HttpError)
  })
})

describe('removeUserCookie', () => {
  it('throws an error if the session does not exist', async () => {
    jest.spyOn(userCookieRepo, 'removeUserCookie').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await userService.removeUserCookie(FAKE_USER_1_COOKIE.cookie)
    }).rejects.toThrow(HttpError)
  })
})

describe('getUserFromCookie', () => {
  it('return undefined if token undefined', async () => {
    const result = await userService.getUserFromCookie(
      undefined as unknown as string
    )
    expect(result).toBeUndefined()
  })

  it('throws an error if the session does not exist', async () => {
    jest.spyOn(userRepo, 'getUserFromCookie').mockImplementation(() => {
      throw new Error()
    })

    expect(async () => {
      await userService.getUserFromCookie(FAKE_USER_1_COOKIE.cookie)
    }).rejects.toThrow(HttpError)
  })
})

describe('validateUserRegistrationBasic', () => {
  it('throws an error if the username is undefined', async () => {
    expect(async () => {
      userService.validateUserRegistrationBasic({
        ...FAKE_USER_1,
        username: undefined,
      } as unknown as User)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if the password is undefined', async () => {
    expect(async () => {
      userService.validateUserRegistrationBasic({
        ...FAKE_USER_1,
        password: undefined,
      } as unknown as User)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if the firstName is undefined', async () => {
    expect(async () => {
      userService.validateUserRegistrationBasic({
        ...FAKE_USER_1,
        firstName: undefined,
      } as unknown as User)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if the lastName is undefined', async () => {
    expect(async () => {
      userService.validateUserRegistrationBasic({
        ...FAKE_USER_1,
        lastName: undefined,
      } as unknown as User)
    }).rejects.toThrow(HttpError)
  })
})

describe('validateUserRegistrationAdvanced', () => {
  it('throws an error if the username fails regex', async () => {
    expect(async () => {
      userService.validateUserRegistrationAdvanced({
        ...FAKE_USER_1,
        username: '$$$',
      } as unknown as User)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if the password fails regex', async () => {
    expect(async () => {
      userService.validateUserRegistrationAdvanced({
        ...FAKE_USER_1,
        password: '$$$',
      } as unknown as User)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if the firstName fails regex', async () => {
    expect(async () => {
      userService.validateUserRegistrationAdvanced({
        ...FAKE_USER_1,
        firstName: '$$$',
      } as unknown as User)
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if the lastName fails regex', async () => {
    expect(async () => {
      userService.validateUserRegistrationAdvanced({
        ...FAKE_USER_1,
        lastName: '$$$',
      } as unknown as User)
    }).rejects.toThrow(HttpError)
  })
})

describe('setUserData', () => {
  it('throws an error if userData is undefined', async () => {
    expect(async () => {
      await userService.setUserData(undefined)
    }).rejects.toThrow(HttpError)
  })
})

describe('validateUserUpdate', () => {
  it('throws an error if the firstName fails regex', async () => {
    expect(async () => {
      userService.validateUserUpdate({
        ...FAKE_ACCOUNT,
        firstName: '$$$',
      })
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if the lastName fails regex', async () => {
    expect(async () => {
      userService.validateUserUpdate({
        ...FAKE_ACCOUNT,
        lastName: '$$$',
      })
    }).rejects.toThrow(HttpError)
  })

  it('throws an error if the bio length is greater than 1000 characters', async () => {
    expect(async () => {
      userService.validateUserUpdate({
        ...FAKE_ACCOUNT,
        bio: 'a'.repeat(1001),
      })
    }).rejects.toThrow(HttpError)
  })
})
