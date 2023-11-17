import * as userService from '../../src/services/userService'
import { FAKE_USER_1, FAKE_USER_1_COOKIE } from './testData'

export const authMock = () => {
  jest
    .spyOn(userService, 'getUserFromCookie')
    .mockImplementation(async sessionCookie => {
      return sessionCookie ? FAKE_USER_1 : undefined
    })
}

export const SESSION_AS_COOKIE = [`userCookie=${FAKE_USER_1_COOKIE.cookie}`]
