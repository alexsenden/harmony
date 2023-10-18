import React, { useEffect, useState } from 'react'
import { Button, Container, Grid, Paper, TextField, Box } from '@mui/material'

import HarmonyAppBar from '../../components/appBar/appBar'

import { HttpMethod } from '../../hooks/httpRequest'

import useHttpRequest from '../../hooks/httpRequest'
import TextBlock from '../../components/text'

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
    } else if (!loading) {
      setHasError(false)
      document.cookie = response['Set-Cookie']
      window.location.href = '../home'
    }
  }, [response, error])

  return (
    <>
      <HarmonyAppBar />
      <Container
        maxWidth="xl"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
            spacing={2}
            direction="column"
            justifyContent="flex-end"
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
              Join Harmony
            </TextBlock>
            <TextField
              sx={{
                mt: 3,
                width: 8 / 12,
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
                width: 8 / 12,
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
                width: 8 / 12,
              }}
              onChange={username =>
                onChangeUserData(
                  newUser.firstName,
                  newUser.lastName,
                  username.target.value,
                  newUser.password
                )
              }
              label="username"
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              required
              error={hasError}
            />
            <TextField
              sx={{
                mt: 3,
                width: 8 / 12,
              }}
              onChange={password =>
                onChangeUserData(
                  newUser.firstName,
                  newUser.lastName,
                  newUser.username,
                  password.target.value
                )
              }
              label="password"
              placeholder="Enter password"
              type="password"
              variant="outlined"
              fullWidth
              required
              error={hasError}
              helperText={hasError ? 'username already taken' : ''}
            />
            <Button
              sx={{
                mt: 3,
                width: 8 / 12,
              }}
              onClick={() => {
                handleUserRegister()
              }}
              type="submit"
              variant="outlined"
              fullWidth
            >
              <TextBlock fontSize={20}> Sign up </TextBlock>
            </Button>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default RegisterPage
