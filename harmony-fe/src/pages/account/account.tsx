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
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  Menu,
  OutlinedInput,
  Paper,
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

  //Submit account info
  const [updateAccount, response, error, loading] = useHttpRequest({
    url: '/user/updateAccount',
    method: HttpMethod.POST,
    body: newData,
  })

  const handleSave = () => {
    //If any entry data is undefined or length 0, then set to current data
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

  //Set default data to current user data
  useEffect(() => {
    newData.userId = user?.userId
    newData.bio = user?.bio
    newData.picture = user?.picture
  }, [user, UserContext])

  //Check for response, if response then refresh, if error then inform user
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

  //Profile pictures for image grid
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
    {
      img: '/images/profilepic/3.png',
      value: 3,
    },
    {
      img: '/images/profilepic/4.png',
      value: 4,
    },
    {
      img: '/images/profilepic/5.png',
      value: 5,
    },
    {
      img: '/images/profilepic/6.png',
      value: 6,
    },
    {
      img: '/images/profilepic/7.png',
      value: 7,
    },
    {
      img: '/images/profilepic/8.png',
      value: 8,
    },
    {
      img: '/images/profilepic/9.png',
      value: 9,
    },
    {
      img: '/images/profilepic/10.png',
      value: 10,
    },
    {
      img: '/images/profilepic/11.png',
      value: 11,
    },
  ]

  //Set profile picture
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
          <FormControl sx={{ mt: 1 }}>
            <InputLabel shrink htmlFor="component-helper">
              First Name
            </InputLabel>
            <OutlinedInput
              onChange={event => (newData.firstName = event.target.value)}
              id="component-helper"
              placeholder={user?.firstName}
              aria-describedby="component-helper-text"
              label="First Name"
              notched
            />
          </FormControl>
          <FormControl sx={{ mt: 1 }}>
            <InputLabel shrink htmlFor="component-helper">
              Last Name
            </InputLabel>
            <OutlinedInput
              onChange={event => (newData.lastName = event.target.value)}
              id="component-helper"
              placeholder={user?.lastName}
              aria-describedby="component-helper-text"
              label="Last Name"
              notched
            />
          </FormControl>
          <Divider sx={{ m: '2rem' }} />
          <TextBlock variant="h5">Bio</TextBlock>
          <Box>
            <FormControl sx={{ mt: 1 }} fullWidth>
              <InputLabel shrink htmlFor="component-helper">
                Bio
              </InputLabel>
              <OutlinedInput
                onChange={event => (newData.bio = event.target.value)}
                id="component-helper"
                placeholder={user?.bio}
                aria-describedby="component-helper-text"
                label="Bio"
                notched
              />
            </FormControl>
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
