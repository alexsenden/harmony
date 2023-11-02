import Head from 'next/head'
import { UserContext } from '../../contexts/user'
import { useContext, useEffect, useState } from 'react'
import {
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
import router from 'next/router'

const Account = () => {
  const user = useContext(UserContext)
  const [newData] = useState({
    userId: user?.userId,
    bio: user?.bio,
    picture: user?.picture,
    firstName: user?.firstName,
    lastName: user?.lastName,
  })

  const [updateAccount] = useHttpRequest({
    url: '/user/updateAccount',
    method: HttpMethod.POST,
    body: newData,
  })

  const handleSave = () => {
    if (newData.firstName === undefined) newData.firstName = user?.firstName
    if (newData.lastName === undefined) newData.lastName = user?.lastName
    if (newData.bio === undefined) newData.bio = user?.bio
    if (newData.picture === undefined) newData.picture = user?.picture

    updateAccount()
    router.reload()
  }

  useEffect(() => {
    newData.userId = user?.userId
    newData.bio = user?.bio
    newData.picture = user?.picture
  }, [user, UserContext])

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
    console.log(newData.picture)
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
              sx={{ mr: 2 }}
            />
            {user?.username}
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
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
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
        </Paper>
      </Container>
    </>
  )
}

export default Account
