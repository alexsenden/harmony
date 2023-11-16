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
  Dialog,
  DialogTitle,
  useTheme,
} from '@mui/material'
import PostModal from '../post-modal'
import { UserContext } from '../../contexts/userContext'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import NavButton from './navButton.styled'
import SearchBar from '../search-bar'
import { MobileContext } from '../../contexts/mobileContext'

const AppBar = () => {
  const [postModalOpen, setPostModalOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const user = useContext(UserContext)
  const theme = useTheme()
  const mobile = useContext(MobileContext)
  const [sendHttpRequest] = useHttpRequest({
    url: '/user/signOut',
    method: HttpMethod.POST,
    body: '',
  })

  const signOut = () => {
    sendHttpRequest()
    document.cookie = 'userCookie = null; expires=Thu, 18 Dec 2013 12:00:00 UTC'
    window.location.href = '../home'
  }

  const openPostModal = () => {
    setPostModalOpen(true)
  }

  const closePostModal = () => {
    setPostModalOpen(false)
  }

  const openAccountMenu = Boolean(anchorEl)
  const handleAccountMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget)
  }
  const handleAccountMenuClose = () => {
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
      {!mobile && (
        <>
          <MuiAppBar
            position="sticky"
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            {/*Home Icon appears at all times*/}
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
              {/* Logged-in appbar */}
              {user && (
                <>
                  <NavButton href={`/profile/${user.username}`}>
                    Profile
                  </NavButton>
                  <NavButton
                    onClick={() => setSearchModalOpen(true)}
                    sx={{ px: 1 }}
                  >
                    Search
                  </NavButton>

                  <NavButton onClick={openPostModal}>New Post</NavButton>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ flexGrow: 1 }}
                  />

                  <NavButton onClick={changeTheme}>
                    {theme.palette.mode.charAt(0).toUpperCase() +
                      theme.palette.mode.slice(1)}{' '}
                    Mode
                  </NavButton>

                  <Divider orientation="vertical" flexItem />

                  <NavButton onClick={handleAccountMenuClick}>
                    <Avatar
                      src={`/images/profilepic/${user.picture}.png`}
                      sx={{ mr: 2 }}
                    ></Avatar>
                    {user.username}
                  </NavButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openAccountMenu}
                    onClose={handleAccountMenuClose}
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
              {/* Logged-out appbar */}
              {!user && (
                <>
                  <NavButton
                    onClick={() => setSearchModalOpen(true)}
                    sx={{ px: 1 }}
                  >
                    Search
                  </NavButton>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ flexGrow: 1 }}
                  />

                  <NavButton onClick={changeTheme}>
                    {theme.palette.mode.charAt(0).toUpperCase() +
                      theme.palette.mode.slice(1)}{' '}
                    Mode
                  </NavButton>
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
            <DialogTitle>
              Search for artists, albums, songs, or users
            </DialogTitle>
            <SearchBar onSearch={() => setSearchModalOpen(false)} />
          </Dialog>
        </>
      )}
    </React.Fragment>
  )
}

export default AppBar
