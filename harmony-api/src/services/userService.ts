import * as userRepo from '../repos/userRepo'
import { User } from '../models/user'
import { HttpError } from '../models/error/httpError'
import { Login } from '../models/login'

export const register = async (userData?: User): Promise<User> => {
  if (userData === undefined) {
    throw new HttpError('User data is required to register a new user', 400)
  }

  validateUserRegistration(userData)

  return userRepo.register(userData)
}

export const login = async (loginData?: Login): Promise<User> => {
  if (loginData === undefined) {
    throw new HttpError('User data is required to login', 400)
  }
  try {
    return await userRepo.getUserByLoginInfo(loginData as Login)
  } catch (error) {
    throw new HttpError('Incorrect Credentials', 401)
  }
}

export const assignUserCookie = async (userData: User): Promise<String> => {
  return userRepo.assignUserCookie(userData)
}

export const removeUserCookie = async (cookie: string) => {
  userRepo.removeUserCookie(cookie)
}

export const getUserFromCookie = async (token: string): Promise<User> => {
  return userRepo.getUserFromCookie(token)
}

const validateUserRegistration = (userData: User) => {
  validateUserRegistrationBasic(userData)
  validateUserRegistrationAdvanced(userData)
}

const validateUserRegistrationBasic = (userData: User) => {
  const errorMessages = []

  if (!userData?.username) {
    errorMessages.push('username field is required to create a new user')
  }
  if (!userData?.password) {
    errorMessages.push('password field is required to create a new user')
  }
  if (!userData?.firstName) {
    errorMessages.push('firstName field is required to create a new user')
  }
  if (!userData?.lastName) {
    errorMessages.push('lastName field is required to create a new user')
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
  const nameRegex = /^[a-zA-Z-]+$/g

  if (!userData.username.match(usernameRegex)) {
    errorMessages.push('Username does not match rules')
  }
  if (!userData.password.match(passwordRegex)) {
    errorMessages.push('Password does not match rules')
  }
  if (!userData.firstName.match(nameRegex)) {
    errorMessages.push('First Name does not match rules')
  }
  if (!userData.lastName.match(nameRegex)) {
    errorMessages.push('Last Name does not match rules')
  }

  if (errorMessages.length > 0) {
    throw new HttpError(errorMessages.join('; '), 400)
  }
}
