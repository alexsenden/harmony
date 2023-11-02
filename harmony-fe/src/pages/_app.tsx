import '../styles/global.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { UserContext, UserCookieContext } from '../contexts/user'
import { MobileContext } from '../contexts/mobile'
import useHttpRequest, { HttpMethod } from '../hooks/httpRequest'
import { useEffect, useState } from 'react'
import { User } from '../models/user'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import HarmonyAppBar from '../components/app-bar'

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#FF4010',
    },
    secondary: {
      main: '#0064AC',
    },
    background: {
      default: '#efefef',
    },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif', //Default font is DM Sans
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', //No uppercase buttons
        },
      },
    },
  },
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [userCookie, setUserCookie] = useState<string>('')
  const [mobile, setMobile] = useState<boolean>(false)
  const cookieInfo = { userCookie: '' }
  const getCookie = (cookieName: string): string => {
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
    url: '/user',
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
    const userAgent = window.navigator.userAgent
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    setMobile(mobileRegex.test(userAgent))
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
    <UserCookieContext.Provider value={userCookie}>
      <UserContext.Provider value={currentUser}>
        <MobileContext.Provider value={mobile}>
          <ThemeProvider theme={globalTheme}>
            <CssBaseline />
            <HarmonyAppBar />
            <Component {...pageProps} />
          </ThemeProvider>
        </MobileContext.Provider>
      </UserContext.Provider>
    </UserCookieContext.Provider>
  )
}
export default App
