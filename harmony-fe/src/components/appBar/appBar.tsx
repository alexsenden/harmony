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
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import PostModal from '../post-modal'
import { UserContext, UserCookieContext } from '../../contexts/user'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import NavButton from './navButton.styled'
import { MobileContext } from '../../contexts/mobile'

const AppBar = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const user = useContext(UserContext)
  const mobile = useContext(MobileContext)
  const userCookie = useContext(UserCookieContext)
  const menuOpen = Boolean(anchorEl)

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

  const openMenu = Boolean(anchorEl)
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const profileOpen = () => {
    window.location.href = `/profile/${user?.username}`
  }

  const handleMobileDropDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileClose = () => {
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
          {!mobile && <NavButton href="/home">Home</NavButton>}
          {user && !mobile && (
            <NavButton href={`/profile/${user.username}`}>Profile</NavButton>
          )}
          {/* Commenting this out for sprint 2 since it unimplemented
            <NavButton href="/home">
              Search
            </NavButton> */}
          {user && !mobile && (
            <NavButton onClick={handleOpen}>New Post</NavButton>
          )}
          {user && mobile && (
            <div>
              <IconButton
                aria-label="menu"
                id="mobile-button"
                aria-controls={menuOpen ? 'mobile-menu' : undefined}
                aria-expanded={menuOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleMobileDropDown}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="mobile-menu"
                anchorEl={anchorEl}
                MenuListProps={{
                  'aria-labelledby': 'mobile-button',
                }}
                open={menuOpen}
                onClose={handleMobileClose}
              >
                <MenuItem onClick={profileOpen}>Profile</MenuItem>
                <MenuItem onClick={handleOpen}>New Post</MenuItem>
                <Divider />
                <MenuItem component={'a'} href={'/account'}>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}

          {!user && (
            <NavButton href="/login" sx={{ px: 1 }}>
              Login
            </NavButton>
          )}
          {user && !mobile && (
            <>
              <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

              <Divider orientation="vertical" flexItem />

              <NavButton onClick={handleMenuClick}>
                <Avatar
                  src={`/image/profilepic/${user.picture}.png`}
                  sx={{ mr: 2 }}
                ></Avatar>
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
                <MenuItem onClick={signOut}>Sign out</MenuItem>
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
