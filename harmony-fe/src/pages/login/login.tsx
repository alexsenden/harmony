import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Paper, TextField } from '@mui/material'
import HarmonyAppBar from '../../components/appBar/index'
import TextBlock from '../../components/text/index'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

const LoginPage = () => {
  const [loginData] = useState({
    username: '',
    password: '',
  })
  const [loginError, setLoginError] = useState(false) // Initialize error state
  const [userLogin, userLoginResponse, userLoginError, userLoginLoading] =
    useHttpRequest({
      url: '/user/login',
      method: HttpMethod.POST,
      body: loginData,
    })

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
        document.cookie = userLoginResponse['Set-Cookie']
        window.location.href = '../home'
      }
    }
  }, [userLoginLoading])

  return (
    <>
      <HarmonyAppBar />
      <Container maxWidth="xl">
        <Paper
          elevation={3}
          style={{ padding: 50 }}
          sx={{
            p: 2,
            margin: 'auto',
            my: 7,
            maxWidth: 'auto',
            width: 5 / 12,
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
                width: 5 / 12,
                xs: 6,
              }}
              alt="Harmony Logo"
              src={'/harmony1.png'}
            />
            <TextBlock my={3} fontSize={40}>
              Log in to Harmony
            </TextBlock>
            <TextField
              onChange={event => (loginData.username = event.target.value)}
              label="Username"
              variant="outlined"
              placeholder="Enter username"
              sx={{
                mt: 3,
                width: 8 / 12,
              }}
              required
              error={loginError}
            />
            <TextField
              onChange={event => (loginData.password = event.target.value)}
              label="Password"
              type="password"
              variant="outlined"
              placeholder="Enter password"
              sx={{
                mt: 3,
                width: 8 / 12,
              }}
              required
              error={loginError}
              helperText={loginError ? 'Invalid username or password' : ''}
            />
            <Button
              onClick={userLogin}
              variant="outlined"
              sx={{
                mt: 3,
                width: 8 / 12,
              }}
            >
              <TextBlock fontSize={20}> Log in </TextBlock>
            </Button>
            <Button
              href="/register"
              variant="outlined"
              sx={{
                mt: 3,
                width: 8 / 12,
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
