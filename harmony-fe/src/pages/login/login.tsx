import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material'
import TextBlock from '../../components/text-block/index'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Head from 'next/head'
import { MobileContext } from '../../contexts/mobileContext'
import { UserContext } from '../../contexts/userContext'

const LoginPage = () => {
  const [loginData] = useState({
    username: '',
    password: '',
  })
  const [loginError, setLoginError] = useState(false) // Initialize error state
  const [showPassword, setShowPassword] = useState(false)
  const mobile = useContext(MobileContext)
  const user = useContext(UserContext)
  const [userLogin, userLoginResponse, userLoginError, userLoginLoading] =
    useHttpRequest({
      url: '/user/login',
      method: HttpMethod.POST,
      body: loginData,
    })

  const checkEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      userLogin()
    }
  }

  useEffect(() => {
    if (user) {
      window.location.href = '../home'
    }
  }, [user])

  useEffect(() => {
    if (!userLoginLoading) {
      if (userLoginError) {
        // userLoginPost returned an error
        // Needs better error handling in the future
        console.log(userLoginError)
        setLoginError(true)
      }
      if (userLoginResponse) {
        // userLoginPost returned sucessfully
        // Needs some way to show the post was successfully created in the future
        console.log(userLoginResponse)
        window.location.href = '../home'
      }
    }
  }, [userLoginLoading])

  const showPasswordButtonClick = () => setShowPassword(show => !show)
  const showPasswordButtonDown = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
      <Head>
        <title>Login to Harmony</title>
      </Head>
      <Container
        maxWidth="xl"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          style={{ padding: mobile ? 20 : 50 }}
          sx={{
            p: 2,
            margin: 'auto',
            my: mobile ? 2 : 7,
            width: mobile ? 11 / 12 : 5 / 12,
            flexGrow: 1,
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="img"
              sx={{
                maxWidth: 'auto',
                width: mobile ? 6 / 12 : 5 / 12,
                xs: 6,
              }}
              alt="Harmony Logo"
              src={'/images/harmonylogo.png'}
            />
            <TextBlock my={3} fontSize={40}>
              Log in to Harmony
            </TextBlock>
            <TextField
              onChange={event => (loginData.username = event.target.value)}
              onKeyDown={checkEnterPressed}
              label="Username"
              variant="outlined"
              placeholder="Enter username"
              sx={{
                mt: 3,
                width: mobile ? 11 / 12 : 8 / 12,
              }}
              required
              error={loginError}
            />
            <TextField
              onChange={event => (loginData.password = event.target.value)}
              onKeyDown={checkEnterPressed}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              placeholder="Enter password"
              sx={{
                mt: 3,
                width: mobile ? 11 / 12 : 8 / 12,
              }}
              required
              error={loginError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => showPasswordButtonClick()}
                      onMouseDown={event => showPasswordButtonDown(event)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={userLogin}
              variant="outlined"
              sx={{
                mt: 3,
                width: mobile ? 11 / 12 : 8 / 12,
              }}
            >
              <TextBlock fontSize={20}> Log in </TextBlock>
            </Button>
            {loginError && (
              <Alert severity="error" sx={{ whiteSpace: 'pre-line', mt: 3 }}>
                {'Invalid username or password'}
              </Alert>
            )}

            <Button
              href="/register"
              variant="outlined"
              sx={{
                mt: 3,
                width: mobile ? 11 / 12 : 8 / 12,
              }}
            >
              <TextBlock fontSize={20}> Sign up </TextBlock>
            </Button>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
export default LoginPage
