import React, { useContext, useState } from 'react'
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Button,
  Divider,
  Menu,
  MenuItem,
  Avatar,
  Link,
} from '@mui/material'

import PostModal from '../post-modal'
import { UserContext, UserCookieContext } from '../../contexts/user'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import NavButton from './navButton.styled'

const AppBar = () => {
  const [open, setOpen] = useState(false)
  const user = useContext(UserContext)
  const userCookie = useContext(UserCookieContext)

  const [sendHttpRequest] = useHttpRequest({
    url: '/user/signOut',
    method: HttpMethod.POST,
    headers: { userCookie: userCookie },
    body: '',
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const signOut = () => {
    sendHttpRequest()
    document.cookie = 'userCookie = null; expires=Thu, 18 Dec 2013 12:00:00 UTC'
    window.location.href = '../home'
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <MuiAppBar position="sticky" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Button href="/home">
            <Box
              component="img"
              sx={{
                height: 64,
              }}
              alt="Harmony Logo"
              src={'/image/harmonylogo.png'}
            />
          </Button>
          <NavButton href="/home">Home</NavButton>
          {user && (
            <NavButton href={`/profile/${user.username}`}>Profile</NavButton>
          )}
          {/* Commenting this out for sprint 2 since it it unimplemented
            <NavButton href="/home">
              Search
            </NavButton> */}
          {user && <NavButton onClick={handleOpen}>New Post</NavButton>}

          <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

          <Divider orientation="vertical" flexItem />
          {!user && (
            <NavButton href="/login" sx={{ px: 1 }}>
              Login
            </NavButton>
          )}
          {user && (
            <>
              <NavButton onClick={handleMenuClick}>
                <Avatar src="/image/harmonylogo.png" sx={{ mr: 2 }}></Avatar>
                {user.username}
              </NavButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem component={'a'} href={'/account'}>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </>
          )}
          <Divider orientation="vertical" flexItem />
        </Toolbar>
      </MuiAppBar>
      <PostModal open={open} onClose={handleClose} />
    </React.Fragment>
  )
}

export default AppBar
