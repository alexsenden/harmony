import Head from 'next/head'
import { UserContext } from '../../contexts/userContext'
import { useContext, useEffect, useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  ImageList,
  ImageListItem,
  Menu,
  Paper,
  TextField,
} from '@mui/material'
import TextBlock from '../../components/text-block'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import React from 'react'

const Account = () => {
  const user = useContext(UserContext)
  const [hasError, setHasError] = useState(false)
  const [newData] = useState({
    userId: user?.userId,
    bio: user?.bio,
    picture: user?.picture,
    firstName: user?.firstName,
    lastName: user?.lastName,
  })

  const [updateAccount, response, error, loading] = useHttpRequest({
    url: '/user/updateAccount',
    method: HttpMethod.POST,
    body: newData,
  })

  const handleSave = () => {
    if (newData.firstName === undefined || newData.firstName.length === 0)
      newData.firstName = user?.firstName
    if (newData.lastName === undefined || newData.lastName.length === 0)
      newData.lastName = user?.lastName
    if (newData.bio === undefined || newData.bio.length === 0)
      newData.bio = user?.bio
    if (newData.picture === undefined) newData.picture = user?.picture
    setHasError(false)
    updateAccount()
  }

  useEffect(() => {
    newData.userId = user?.userId
    newData.bio = user?.bio
    newData.picture = user?.picture
  }, [user, UserContext])

  useEffect(() => {
    if (error) {
      console.error('Error:', error)
      setHasError(true)
    } else if (response && !loading) {
      window.location.href = '../account'
    }
  }, [response, error])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const itemData = [
    {
      img: '/images/profilepic/0.png',
      value: 0,
    },
    {
      img: '/images/profilepic/1.png',
      value: 1,
    },
    {
      img: '/images/profilepic/2.png',
      value: 2,
    },
  ]

  const handlePicture = (picNum: number): void => {
    newData.picture = picNum
    handleMenuClose()
  }

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
          <TextBlock variant="h4" sx={{ mb: '2rem' }}>
            Account Settings
          </TextBlock>
          <TextBlock variant="h5">Profile Picture</TextBlock>
          <Button onClick={handleMenuClick}>
            <Avatar
              src={
                newData?.picture !== undefined
                  ? `/images/profilepic/${newData?.picture}.png`
                  : `/images/profilepic/${user?.picture}.png`
              }
              sx={{ height: '100px', width: '100px', mr: 2 }}
            />
            <TextBlock variant="h6"> {user?.username}</TextBlock>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <ImageList
              sx={{
                width: 500,
                //height: 450,
                maxWidth: '80vw',
                maxHeight: '80vw',
              }}
              cols={3}
            >
              {itemData.map(item => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}`}
                    src={`${item.img}`}
                    loading="lazy"
                    onClick={() => handlePicture(item.value)}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Menu>

          <Divider sx={{ m: '2rem' }} />
          <TextBlock variant="h5">Name</TextBlock>
          <TextField
            onChange={event => (newData.firstName = event.target.value)}
            label={user?.firstName}
            placeholder="First Name"
            variant="outlined"
            required
            margin="dense"
          />
          <TextField
            onChange={event => (newData.lastName = event.target.value)}
            label={user?.lastName}
            placeholder="Last Name"
            variant="outlined"
            required
            margin="dense"
          />

          <Divider sx={{ m: '2rem' }} />
          <TextBlock variant="h5">Bio</TextBlock>
          <Box>
            <TextField
              onChange={event => (newData.bio = event.target.value)}
              placeholder={user?.bio}
              variant="outlined"
              required
              fullWidth
              margin="dense"
            />
          </Box>
          <Divider sx={{ m: '2rem' }} />
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
          {hasError && (
            <Alert severity="error" sx={{ whiteSpace: 'pre-line', mt: 3 }}>
              {error.response.data.message.split(';').join('\n')}
            </Alert>
          )}
        </Paper>
      </Container>
    </>
  )
}

export default Account
