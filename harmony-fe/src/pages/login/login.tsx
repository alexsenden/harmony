import React, {useEffect} from 'react'
import {Box, Button, Container, Grid, Paper, TextField,} from '@mui/material'
import HarmonyAppBar from '../../components/appBar/index'
import TextBlock from "../../components/text/index";
import useHttpRequest, {HttpMethod} from "../../hooks/httpRequest";


const LoginPage = () => {

  let username = ""
  let password = ""

  const [userLogin,userLoginResponse,userLoginError,userLoginLoading] =
    useHttpRequest({
      url: '/post',
      method: HttpMethod.POST,
      body: {username,password}
    })

  useEffect(() => {
    if (!userLoginLoading) {
      if (userLoginError) {
        // userLoginPost returned an error
        // Needs better error handling in the future
        console.log(userLoginError)
      }
      if (userLoginResponse) {
        // userLoginPost returned sucessfully
        // Needs some way to show the post was successfully created in the future
        console.log(userLoginResponse)
      }
    }
  }, [userLoginLoading])

  return (
    <>
      <HarmonyAppBar />
      <Container maxWidth="xl">
        <Paper sx={{
          p: 2,
          margin: 'auto',
          my: 7,
          maxWidth: 'auto',
          width: 5/12,
          flexGrow: 1
        }}>
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
                width: 5/12,
                xs: 6
              }}
              alt="Harmony Logo"
              src={'/harmony1.png'}
            />
            <TextBlock
              my={3}
              fontSize={40}>
              Log in to Harmony
            </TextBlock>
            <TextField
              onChange = {event => username=event.target.value}
              label="username"
              variant="outlined"
              sx={{
                mt: 3,
                width: 8/12,
              }}
            />
            <TextField
              onChange = {event => password=event.target.value}
              label="password"
              type="password"
              variant="outlined"
              sx={{
                mt: 3,
                width: 8/12,
              }}
            />
              <Button
                onClick={userLogin}
                variant="outlined"
                sx={{
                  mt: 3,
                  width: 8/12,
                }}
              >
                <TextBlock
                  fontSize={20}>
                  Log in
                </TextBlock>
              </Button>

            <Button
              variant="outlined"
              sx={{
                mt: 3,
                width: 8/12,
              }}
            >
              <TextBlock
                fontSize={20}>
                Sign up
              </TextBlock>
            </Button>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
export default LoginPage
