import '../styles/global.css'
import type { ReactElement, ReactNode } from 'react'
import type { Metadata, NextPage } from 'next'
import type { AppProps } from 'next/app'
import { UserContext } from '../contexts/user'
import { MobileContext } from '../contexts/mobile'
import useHttpRequest, { HttpMethod } from '../hooks/httpRequest'
import { useEffect, useState } from 'react'
import { User } from '../models/user'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import HarmonyAppBar from '../components/appBar'
import Favicon from '../components/favicon-component'

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
  const [mobile, setMobile] = useState<boolean>(false)

  const [sendHttpRequest, response, error, loading] = useHttpRequest({
    url: '/user/getUser',
    method: HttpMethod.GET,
    body: '',
  })
  useEffect(() => {
    sendHttpRequest()
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
    <UserContext.Provider value={currentUser}>
      <Favicon />
      <MobileContext.Provider value={mobile}>
        <ThemeProvider theme={globalTheme}>
          <CssBaseline />
          <HarmonyAppBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </MobileContext.Provider>
    </UserContext.Provider>
  )
}
