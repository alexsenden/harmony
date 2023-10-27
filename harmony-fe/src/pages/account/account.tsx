import Head from 'next/head'
import { UserContext } from '../../contexts/user'
import { useContext, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
} from '@mui/material'
import TextBlock from '../../components/text'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

const Account = () => {
  const user = useContext(UserContext)
  const [userData] = useState({
    userId: user?.userId,
    bio: user?.bio,
  })

  const [setBio] = useHttpRequest({
    url: '/user/setBio',
    method: HttpMethod.POST,
    body: userData,
  })

  return (
    <>
      <Head>
        <title>{`${user?.username}'s account settings`}</title>
      </Head>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 'auto',
            flexGrow: 1,
          }}
        >
          <TextBlock variant="h4">Account Settings</TextBlock>
          <TextBlock variant="h5">Profile Picture</TextBlock>
          <TextBlock>
            Allow user to pick from a few premade profile pictures
          </TextBlock>
          <Divider />
          <TextBlock variant="h5">Name</TextBlock>
          <TextBlock>Allow user to change their name</TextBlock>
          <Divider />
          <TextBlock variant="h5">Bio</TextBlock>
          <TextBlock>Allow user to change their bio</TextBlock>
          <Box>
            <TextField
              onChange={event => (
                (userData.bio = event.target.value),
                (userData.userId = user?.userId)
              )}
              placeholder={user?.bio}
              variant="outlined"
              required
              fullWidth
              margin="dense"
            />
          </Box>
          <Button onClick={setBio}>Set Bio</Button>
        </Paper>
      </Container>
    </>
  )
}

export default Account
