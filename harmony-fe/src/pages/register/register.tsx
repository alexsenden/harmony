import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material'

import { HttpMethod } from '../../hooks/httpRequest'
import useHttpRequest from '../../hooks/httpRequest'
import TextBlock from '../../components/text-block'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Head from 'next/head'
import { MobileContext } from '../../contexts/mobileContext'

const RegisterPage = () => {
  const [hasError, setHasError] = useState(false)
  const [hideSignUp, setHideSignUp] = useState(false)
  const mobile = useContext(MobileContext)

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const [sendHttpRequest, response, error, loading] = useHttpRequest({
    url: '/user/register',
    method: HttpMethod.POST,
    body: newUser,
    headers: {},
  })

  const handleUserRegister = () => {
    setHasError(false)
    sendHttpRequest()
  }

  const onChangeUserData = (
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => {
    setNewUser({ firstName, lastName, username, password })
  }

  useEffect(() => {
    if (response) {
      console.log('Response:', response)
    }

    if (error) {
      console.error('Error:', error)
      setHasError(true)
    } else if (response && !loading) {
      setHideSignUp(true)
      document.cookie = response['Set-Cookie']
      window.location.href = '../home'
    }
  }, [response, error])

  const showPasswordButtonClick = () => setShowPassword(show => !show)

  const showPasswordButtonDown = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
      <Head>
        <title>Account Registration</title>
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
            width: mobile ? 10 / 12 : 5 / 12,
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box
              component="img"
              sx={{
                maxWidth: 'auto',
                width: mobile ? 11 / 12 : 5 / 12,
                xs: 6,
              }}
              alt="Harmony Logo"
              src={'/images/harmonylogo.png'}
            />
            <TextBlock my={3} fontSize={40}>
              Join Harmony
            </TextBlock>
            <TextField
              sx={{
                mt: 3,
                width: mobile ? 11 / 12 : 8 / 12,
              }}
              onChange={firstName =>
                onChangeUserData(
                  firstName.target.value,
                  newUser.lastName,
                  newUser.username,
                  newUser.password
                )
              }
              label="First Name"
              placeholder="Enter First Name"
              variant="outlined"
              fullWidth
              required
              error={hasError}
            />
            <TextField
              sx={{
                mt: 3,
                width: mobile ? 11 / 12 : 8 / 12,
              }}
              onChange={lastName =>
                onChangeUserData(
                  newUser.firstName,
                  lastName.target.value,
                  newUser.username,
                  newUser.password
                )
              }
              label="Last Name"
              placeholder="Enter Last Name"
              variant="outlined"
              fullWidth
              required
              error={hasError}
            />
            <TextField
              sx={{
                mt: 3,
                width: mobile ? 11 / 12 : 8 / 12,
              }}
              onChange={username =>
                onChangeUserData(
                  newUser.firstName,
                  newUser.lastName,
                  username.target.value,
                  newUser.password
                )
              }
              label="Username"
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              required
              error={hasError}
            />
            <TextField
              sx={{
                mt: 3,
                width: mobile ? 11 / 12 : 8 / 12,
              }}
              onChange={password =>
                onChangeUserData(
                  newUser.firstName,
                  newUser.lastName,
                  newUser.username,
                  password.target.value
                )
              }
              label="Password"
              placeholder="Enter password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              error={hasError}
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
            {hasError && (
              <Alert severity="error" sx={{ whiteSpace: 'pre-line' }}>
                {error.response.data.message.split(';').join('\n')}
              </Alert>
            )}

            {!loading ? (
              <Button
                sx={{
                  mt: 3,
                  width: mobile ? 11 / 12 : 8 / 12,
                }}
                onClick={() => {
                  handleUserRegister()
                }}
                type="submit"
                variant="outlined"
                fullWidth
                disabled={hideSignUp}
              >
                <TextBlock fontSize={20}> Sign up </TextBlock>
              </Button>
            ) : (
              <CircularProgress style={{ marginTop: 10 }} />
            )}
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default RegisterPage
