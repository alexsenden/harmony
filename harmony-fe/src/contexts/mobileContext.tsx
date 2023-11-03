import React, { useEffect, useState } from 'react'

interface IMobileContextProviderProps {
  children?: React.ReactNode
}

export const MobileContext = React.createContext<boolean>(false)

const MobileContextProvider = ({ children }: IMobileContextProviderProps) => {
  const [mobile, setMobile] = useState<boolean>(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    setMobile(mobileRegex.test(userAgent))
  }, [])

  return (
    <MobileContext.Provider value={mobile}>{children}</MobileContext.Provider>
  )
}

export default MobileContextProvider
