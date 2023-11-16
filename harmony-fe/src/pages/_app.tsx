import '../styles/global.css'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import UserContextProvider from '../contexts/userContext'
import MobileContextProvider from '../contexts/mobileContext'
import HarmonyAppBar from '../components/app-bar'
import Favicon from '../components/favicon-component'
import React, { useEffect, useState } from 'react'

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#FF4010',
    },
    secondary: {
      main: '#0064AC',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#efefef',
    },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif', // Default font is DM Sans
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No uppercase buttons
        },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF4010',
    },
    secondary: {
      main: '#0064AC',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      //default: '#efefef',
    },
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif', // Default font is DM Sans
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No uppercase buttons
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
  const getLayout = Component.getLayout ?? (page => page)
  const [activeTheme, setTheme] = useState(darkTheme)

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const changeTheme = function () {
        const getTheme = localStorage.getItem('theme')

        if (getTheme) {
          setTheme(getTheme === 'light' ? globalTheme : darkTheme)
        }
      }
      changeTheme()
      window.addEventListener('storage', changeTheme)
      return () => window.removeEventListener('storage', changeTheme)
    }, [])
  }
  return getLayout(
    <>
      <Favicon />
      <UserContextProvider>
        <MobileContextProvider>
          <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            <HarmonyAppBar />
            <Component {...pageProps} />
          </ThemeProvider>
        </MobileContextProvider>
      </UserContextProvider>
    </>
  )
}
export default App
