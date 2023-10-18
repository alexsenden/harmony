import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Box,
  Alert,
} from '@mui/material'

import HarmonyAppBar from '../../components/appBar/appBar'

import { HttpMethod } from '../../hooks/httpRequest'

import useHttpRequest from '../../hooks/httpRequest'

const RegisterPage = () => {
  const [hasError, setHasError] = useState(false)

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  })

  const [sendHttpRequest, response, error, loading] = useHttpRequest({
    url: '/user/register',
    method: HttpMethod.POST,
    body: newUser,
    headers: {},
  })

  const handleUserRegister = () => {
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
    } else {
      setHasError(false)
    }
  }, [response, error])

  return (
    <>
      <HarmonyAppBar />
      <Container
        maxWidth="sm"
        sx={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Paper
          elevation={3}
          style={{ padding: 50 }}
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 'auto',
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
                height: 64,
              }}
              alt="Harmony Logo"
              src={'/harmony1.png'}
            />
            <TextField
              sx={{ margin: 1 }}
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
            />
            <TextField
              sx={{ margin: 1 }}
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
            />
            <TextField
              sx={{ margin: 1 }}
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
            />
            <TextField
              sx={{ margin: 1 }}
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
              type="password"
              variant="outlined"
              fullWidth
              required
            />
            <Button
              sx={{ margin: 1 }}
              onClick={() => {
                handleUserRegister()
              }}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Sign up
            </Button>

            {hasError ? (
              <Alert
                severity="error"
                sx={{ marginBottom: 2 }}
                variant="filled"
                onClose={() => setHasError(false)}
              >
                An error occurred. Please check your input and try again.
                <br />
                <br />
                Error:
                <br />
                <br />
                {error && error.response.data.message
                  ? error.response.data.message
                  : 'incorrect input for one of the fields'}
              </Alert>
            ) : null}
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default RegisterPage
