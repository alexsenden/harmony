import React, { useEffect, useState } from 'react'

import { User } from '../models/user'
import useHttpRequest, { HttpMethod } from '../hooks/httpRequest'

interface IUserContextProviderProps {
  children?: React.ReactNode
}

export const UserContext = React.createContext<User | undefined>(undefined)

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)

  const [sendHttpRequest, response, error, loading] = useHttpRequest({
    url: '/user',
    method: HttpMethod.GET,
  })

  useEffect(() => {
    sendHttpRequest()
  }, [])

  useEffect(() => {
    if (response && !loading) {
      setCurrentUser(response.userData as User)
    }
    if (error) {
      console.error('Error getting user: ', error)
    }
  }, [loading])

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
