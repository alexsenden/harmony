import '../styles/global.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import {UserContext} from "../contexts/user";
import useHttpRequest, {HttpMethod} from "../hooks/httpRequest";
import {useEffect, useState} from "react";
import {User} from "../models/user";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [currentUser,setCurrentUser] = useState<User|undefined>(undefined)
  const cookieInfo = {userCookie: '' }
  function getCookie(cookieName:string): string {
    let name = cookieName + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let cookieList = decodedCookie.split(';')
    let foundCookie = ''
    cookieList.forEach(val => {
      if (val.indexOf(name) === 0) {
        foundCookie = val.substring(name.length)
      }
    })
    return foundCookie
  }

  const [sendHttpRequest, response, error, loading] = useHttpRequest({
    url: '/user/getUser',
    method: HttpMethod.GET,
    headers: cookieInfo,
    body: '',
  })
  useEffect(() => {
    cookieInfo.userCookie= getCookie('userCookie')
    if (cookieInfo.userCookie !== '') {
      sendHttpRequest()
    }
  }, [])
  useEffect(() => {
    if (response && !loading) {
      setCurrentUser(response.userData as User)
    }
    if (error) {
      console.error('Error getting user: ', error)
    }
  }, [loading]);



  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <UserContext.Provider value={currentUser}>
      <Component {...pageProps} />
    </UserContext.Provider>

  )
}
