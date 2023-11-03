import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'

import '../styles/global.css'

import UserContextProvider from '../contexts/userContext'
import MobileContextProvider from '../contexts/mobileContext'
import HarmonyAppBar from '../components/app-bar'
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

  return getLayout(
    <>
      <Favicon />
      <UserContextProvider>
        <MobileContextProvider>
          <ThemeProvider theme={globalTheme}>
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
