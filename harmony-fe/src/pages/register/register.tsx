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
import { UserContext } from '../../contexts/userContext'

const RegisterPage = () => {
  const [hasError, setHasError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [hideSignUp, setHideSignUp] = useState(false)
  const mobile = useContext(MobileContext)
  const user = useContext(UserContext)

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
    setFirstNameError(false)
    setLastNameError(false)
    setUsernameError(false)
    setPasswordError(false)
    sendHttpRequest()
  }

  const checkEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUserRegister()
    }
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

      //Some simple regex that will set the error states to true if that type of error is mentioned
      setFirstNameError(/\bFirst Name\b/.test(error.response.data.message))
      setLastNameError(/\bLast Name\b/.test(error.response.data.message))
      setUsernameError(/\bUsername\b/.test(error.response.data.message))
      setPasswordError(/\bPassword\b/.test(error.response.data.message))

      setHasError(true)
    } else if (response && !loading) {
      setHideSignUp(true)
      document.cookie = response['Set-Cookie']
      window.location.href = '../home'
    }
  }, [response, error])

  useEffect(() => {
    if (user) {
      window.location.href = '../home'
    }
  }, [user])

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
            width: mobile ? 11 / 12 : 5 / 12,
            flexGrow: 1,
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
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
              onKeyDown={checkEnterPressed}
              label="First Name"
              placeholder="Enter First Name"
              variant="outlined"
              fullWidth
              required
              error={firstNameError}
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
              onKeyDown={checkEnterPressed}
              label="Last Name"
              placeholder="Enter Last Name"
              variant="outlined"
              fullWidth
              required
              error={lastNameError}
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
              onKeyDown={checkEnterPressed}
              label="Username"
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              required
              error={usernameError}
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
              onKeyDown={checkEnterPressed}
              label="Password"
              placeholder="Enter password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              error={passwordError}
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
              <Alert severity="error" sx={{ whiteSpace: 'pre-line', mt: 3 }}>
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
