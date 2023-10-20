import React from 'react'
import { User } from '../models/user'

export const UserContext = React.createContext<User | undefined>(undefined)
export const UserCookieContext = React.createContext<string>('')
