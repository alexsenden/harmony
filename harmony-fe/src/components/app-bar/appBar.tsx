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
  Dialog,
  DialogTitle,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import PostModal from '../post-modal'
import { UserContext } from '../../contexts/userContext'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import NavButton from './navButton.styled'
import { MobileContext } from '../../contexts/mobileContext'
import SearchBar from '../search-bar'

const AppBar = () => {
  const [postModalOpen, setPostModalOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const user = useContext(UserContext)
  const mobile = useContext(MobileContext)
  const menuOpen = Boolean(anchorEl)

  const [sendHttpRequest] = useHttpRequest({
    url: '/user/signOut',
    method: HttpMethod.POST,
    body: '',
  })

  const openPostModal = () => {
    setPostModalOpen(true)
  }

  const closePostModal = () => {
    setPostModalOpen(false)
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

  const changeTheme = function () {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
    }

    window.dispatchEvent(new Event('storage'))
  }

  return (
    <React.Fragment>
      <MuiAppBar
        position="sticky"
        sx={{ backgroundColor: useTheme().palette.background.paper }}
      >
        <Toolbar>
          <Button href="/home">
            <Box
              component="img"
              sx={{
                height: 64,
              }}
              alt="Harmony Logo"
              src={'/images/harmonylogo.png'}
            />
          </Button>
          {!mobile && <NavButton href="/home">Home</NavButton>}
          {user && !mobile && (
            <>
              <NavButton href={`/profile/${user.username}`}>Profile</NavButton>
              <NavButton href="/home">Home</NavButton>
              <NavButton
                onClick={() => setSearchModalOpen(true)}
                sx={{ px: 1 }}
              >
                Search
              </NavButton>
              <NavButton onClick={openPostModal}>New Post</NavButton>
              <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />
              <NavButton onClick={changeTheme}>
                {useTheme().palette.mode.charAt(0).toUpperCase() +
                  useTheme().palette.mode.slice(1)}{' '}
                Mode
              </NavButton>

              <Divider orientation="vertical" flexItem />

              <NavButton onClick={handleMenuClick}>
                <Avatar
                  src={`/images/profilepic/${user.picture}.png`}
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
                <MenuItem onClick={openPostModal}>New Post</MenuItem>
                <Divider />
                <MenuItem component={'a'} href={'/account'}>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
                <MenuItem onClick={changeTheme}>
                  {useTheme().palette.mode.charAt(0).toUpperCase() +
                    useTheme().palette.mode.slice(1)}{' '}
                  Mode
                </MenuItem>
              </Menu>
            </div>
          )}
          {!user && mobile && (
            <>
              <IconButton
                aria-label="menu"
                id="mobile-button"
                aria-controls={menuOpen ? 'mobile-menu' : undefined}
                aria-expanded={menuOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleMobileDropDown}
              ></IconButton>
              <NavButton onClick={changeTheme}>
                {useTheme().palette.mode.charAt(0).toUpperCase() +
                  useTheme().palette.mode.slice(1)}{' '}
                Mode
              </NavButton>
              <Divider orientation="vertical" flexItem />

              <NavButton href="/login" sx={{ px: 1 }}>
                Login
              </NavButton>
            </>
          )}
          {!user && !mobile && (
            <>
              <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />
              <NavButton onClick={changeTheme}>
                {useTheme().palette.mode.charAt(0).toUpperCase() +
                  useTheme().palette.mode.slice(1)}{' '}
                Mode
              </NavButton>
              <Divider orientation="vertical" flexItem />

              <NavButton href="/login" sx={{ px: 1 }}>
                Login
              </NavButton>
            </>
          )}
          {user && mobile && (
            <>
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
                <MenuItem
                  onClick={() => {
                    setSearchModalOpen(true)
                    handleMobileClose()
                  }}
                >
                  Search
                </MenuItem>
                <MenuItem onClick={profileOpen}>Profile</MenuItem>
                <MenuItem onClick={openPostModal}>New Post</MenuItem>
                <Divider />
                <MenuItem component={'a'} href={'/account'}>
                  Account Settings
                </MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
                <MenuItem onClick={changeTheme}>
                  {useTheme().palette.mode.charAt(0).toUpperCase() +
                    useTheme().palette.mode.slice(1)}{' '}
                  Mode
                </MenuItem>
              </Menu>
            </>
          )}

          {!user && (
            <>
              <Divider orientation="vertical" flexItem />
              <NavButton href="/login" sx={{ px: 1 }}>
                Login
              </NavButton>
            </>
          )}
          <Divider orientation="vertical" flexItem />
        </Toolbar>
      </MuiAppBar>
      <PostModal open={postModalOpen} onClose={closePostModal} />
      <Dialog
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Search for artists, albums, songs, or users</DialogTitle>
        <SearchBar onSearch={() => setSearchModalOpen(false)} />
      </Dialog>
    </React.Fragment>
  )
}

export default AppBar
