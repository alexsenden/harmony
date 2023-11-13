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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import PostModal from '../post-modal'
import { UserContext } from '../../contexts/userContext'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import NavButton from './navButton.styled'
import SearchBar from '../search-bar'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

const MobileAppBar = () => {
  const [postModalOpen, setPostModalOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null)

  const user = useContext(UserContext)
  const menuOpen = Boolean(anchorEl)
  const theme = useTheme()
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

  const changeTheme = function () {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
    }

    window.dispatchEvent(new Event('storage'))
  }

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setDrawerOpen(open)
    }

  return (
    <React.Fragment>
      <MuiAppBar
        position="sticky"
        sx={{ backgroundColor: theme.palette.background.paper }}
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
          {/* {user()} */}
          {/* {!user && ( )} */}
          <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />
          <IconButton onClick={toggleDrawer(true)} sx={{ size: 'large' }}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={'right'}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ width: '50vw' }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              {user && (
                <List>
                  <ListItemButton href={`/profile/${user.username}`}>
                    Profile
                  </ListItemButton>
                  <ListItemButton onClick={() => setSearchModalOpen(true)}>
                    Search
                  </ListItemButton>
                  <ListItemButton onClick={openPostModal}>
                    New Post
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={changeTheme}>
                    {theme.palette.mode.charAt(0).toUpperCase() +
                      theme.palette.mode.slice(1)}{' '}
                    Mode
                  </ListItemButton>
                  <ListItemButton href={'/account'}>
                    Account Settings
                  </ListItemButton>
                  <ListItemButton onClick={signOut}>Logout</ListItemButton>
                </List>
              )}
              {!user && (
                <List>
                  <ListItemButton onClick={() => setSearchModalOpen(true)}>
                    Search
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={changeTheme}>
                    {theme.palette.mode.charAt(0).toUpperCase() +
                      theme.palette.mode.slice(1)}{' '}
                    Mode
                  </ListItemButton>
                  <ListItemButton href="/login">Login</ListItemButton>
                </List>
              )}
            </Box>
          </Drawer>
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

export default MobileAppBar
