import React, { useContext, useState } from 'react'
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Button,
  Divider,
} from '@mui/material'

import PostModal from '../post-modal'
import { UserContext } from '../../contexts/user'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'

const AppBar = () => {
  const [open, setOpen] = useState(false)
  const user = useContext(UserContext)
  const cookieInfo = { userCookie: '' }
  function getCookie(cookieName: string): string {
    const name = cookieName + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieList = decodedCookie.split(';')
    let foundCookie = ''
    cookieList.forEach(val => {
      if (val.indexOf(name) === 0) {
        foundCookie = val.substring(name.length)
      }
    })
    return foundCookie
  }

  const [sendHttpRequest] = useHttpRequest({
    url: '/user/signOut',
    method: HttpMethod.POST,
    headers: cookieInfo,
    body: '',
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const signOut = () => {
    cookieInfo.userCookie = getCookie('userCookie')
    document.cookie = 'userCookie = null; expires=Thu, 18 Dec 2013 12:00:00 UTC'
    sendHttpRequest()
    window.location.href = '../home'
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <MuiAppBar className="navBar-root" position="sticky">
          <Toolbar>
            <Button href="/home">
              <Box
                component="img"
                sx={{
                  height: 64,
                }}
                alt="Harmony Logo"
                src={'/harmony1.png'}
              />
            </Button>
            <Button href="/home" className="navButton" color="inherit">
              Home
            </Button>
            {user && (
              <Button href="/profile" className="navButton" color="inherit">
                Profile
              </Button>
            )}
            <Button href="/home" className="navButton" color="inherit">
              Search
            </Button>
            {user && (
              <Button
                className="navButton"
                color="inherit"
                onClick={handleOpen}
              >
                New Post
              </Button>
            )}

            <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

            <Divider orientation="vertical" flexItem />
            {!user && (
              <Button href="/login" className="navButton" color="inherit">
                Login
              </Button>
            )}
            {user && (
              <Button className="navButton" color="inherit" onClick={signOut}>
                Sign out
              </Button>
            )}
            <Divider orientation="vertical" flexItem />
          </Toolbar>
        </MuiAppBar>
      </Box>
      <PostModal open={open} onClose={handleClose} />
    </React.Fragment>
  )
}

export default AppBar
