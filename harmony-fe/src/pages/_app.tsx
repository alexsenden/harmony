import '../styles/global.css'
import type { ReactElement, ReactNode } from 'react'
import type { Metadata, NextPage } from 'next'
import type { AppProps } from 'next/app'
import { UserContext, UserCookieContext } from '../contexts/user'
import useHttpRequest, { HttpMethod } from '../hooks/httpRequest'
import { useEffect, useState } from 'react'
import { User } from '../models/user'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import Head from 'next/head'
import HarmonyAppBar from '../components/appBar'

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#FF4010',
    },
    secondary: {
      main: '#0064AC',
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'DM Sans, sans-serif',
          textTransform: 'none',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontFamily: 'DM Sans, sans-serif' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { fontFamily: 'DM Sans, sans-serif' },
      },
    },
  },
})

export const metadata: Metadata = {
  title: 'My Page Title',
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [userCookie, setUserCookie] = useState<string>('')
  const cookieInfo = { userCookie: '' }
  function getCookie(cookieName: string): string {
    const name = cookieName + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieList = decodedCookie.split(';')
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
    cookieInfo.userCookie = getCookie('userCookie')
    setUserCookie(cookieInfo.userCookie as string)
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
  }, [loading])

  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserCookieContext.Provider value={userCookie}>
        <UserContext.Provider value={currentUser}>
          <ThemeProvider theme={globalTheme}>
            <HarmonyAppBar />
            <Component {...pageProps} />
          </ThemeProvider>
        </UserContext.Provider>
      </UserCookieContext.Provider>
    </>
  )
}
