import crypto from 'crypto'

import * as userRepo from '../repos/userRepo'
import * as userCookieRepo from '../repos/userCookieRepo'
import { User } from '../models/user'
import { HttpError } from '../models/error/httpError'
import { Login } from '../models/login'
import { Account } from '../models/account'

export const getUserByUsername = async (userName?: string): Promise<User> => {
  const user = userRepo.getUserByName(userName)
  return user
}

export const register = async (userData?: User): Promise<User> => {
  if (userData === undefined) {
    throw new HttpError('User data is required to register a new user', 400)
  }

  validateUserRegistration(userData)
  userData.password = hashPassword(userData.password)
  return userRepo.register(userData)
}

export const login = async (loginData?: Login): Promise<User> => {
  if (loginData === undefined) {
    throw new HttpError('User data is required to login', 400)
  }
  try {
    loginData.password = hashPassword(loginData.password)
    return await userRepo.getUserByLoginInfo(loginData as Login)
  } catch (error) {
    throw new HttpError('Incorrect Credentials', 401)
  }
}

export const assignUserCookie = async (userData: User): Promise<String> => {
  return await userCookieRepo.assignUserCookie(userData)
}

export const removeUserCookie = async (cookie: string) => {
  try {
    await userCookieRepo.removeUserCookie(cookie)
  } catch (error) {
    throw new HttpError('No user linked to cookie', 404)
  }
}

export const getUserFromCookie = async (
  token: string
): Promise<User | undefined> => {
  try {
    if (token) {
      return userRepo.getUserFromCookie(token)
    }
    return undefined
  } catch (error) {
    throw new HttpError('No user linked to cookie', 404)
  }
}

const validateUserRegistration = (userData: User) => {
  validateUserRegistrationBasic(userData)
  validateUserRegistrationAdvanced(userData)
}

const validateUserRegistrationBasic = (userData: User) => {
  const errorMessages = []

  if (!userData?.username) {
    errorMessages.push('Username is required to create a new user')
  }
  if (!userData?.password) {
    errorMessages.push('Password is required to create a new user')
  }
  if (!userData?.firstName) {
    errorMessages.push('First Name is required to create a new user')
  }
  if (!userData?.lastName) {
    errorMessages.push('Last Name is required to create a new user')
  }

  if (errorMessages.length > 0) {
    throw new HttpError(errorMessages.join('; '), 400)
  }
}

const validateUserRegistrationAdvanced = (userData: User) => {
  const errorMessages = []

  const usernameRegex = /^[a-zA-Z0-9]+$/g
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/g
  const nameRegex = /^[a-zA-Z- ']+$/g

  if (!userData.username.match(usernameRegex)) {
    errorMessages.push(
      'Username can only contain upper and lower case letter (a-z, A-Z) and numbers (0-9)'
    )
  }
  if (!userData.password.match(passwordRegex)) {
    errorMessages.push(
      "Password must contain at least one upper and lower case letter (a-z, A-Z), a number (0-9), and a symbol (@, #, $, %, ^, &, -, +, =, (, ), !, ?, ' ' , \"), "
    )
  }
  if (!userData.firstName.match(nameRegex)) {
    errorMessages.push("First Name can only contain letters, spaces, -, or '")
  }
  if (!userData.lastName.match(nameRegex)) {
    errorMessages.push("Last Name can only contain letters, spaces, -, or '")
  }

  if (errorMessages.length > 0) {
    throw new HttpError(errorMessages.join('; '), 400)
  }
}

const hashPassword = (password: string) => {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}

export const setUserData = async (userData?: Account): Promise<Account> => {
  if (userData === undefined) {
    throw new HttpError('User not found', 404)
  }

  validateUserUpdate(userData)
  return await userRepo.setUserData(userData)
}

const validateUserUpdate = (userData: Account) => {
  const errorMessages = []

  const nameRegex = /^[a-zA-Z- ']+$/g

  if (!userData.firstName.match(nameRegex)) {
    errorMessages.push("First Name can only contain letters, spaces, -, or '")
  }
  if (!userData.lastName.match(nameRegex)) {
    errorMessages.push("Last Name can only contain letters, spaces, -, or '")
  }
  if (userData.bio.length > 1000) {
    errorMessages.push('Bio must be fewer than than 1000 characters')
  }

  if (errorMessages.length > 0) {
    throw new HttpError(errorMessages.join('; '), 400)
  }
}
