import * as userRepo from '../repos/userRepo'
import { User } from '../models/user'
import { HttpError } from '../models/error/httpError'

export const register = async (userData?: User): Promise<User> => {
  if (userData === undefined) {
    throw new HttpError('User data is required to register a new user', 400)
  }

  validateUserRegistration(userData)

  return userRepo.register(userData)
}

const validateUserRegistration = (userData?: User) => {
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
