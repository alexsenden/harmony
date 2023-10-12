import React, { useState } from 'react'
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Button,
  Divider,
} from '@mui/material'

import PostModal from '../post-modal'

const AppBar = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
            <Button href="/profile" className="navButton" color="inherit">
              Profile
            </Button>
            <Button href="/home" className="navButton" color="inherit">
              Search
            </Button>

            <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

            <Button className="navButton" color="inherit" onClick={handleOpen}>
              New Post
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button href="/home" className="navButton" color="inherit">
              Login
            </Button>
            <Divider orientation="vertical" flexItem />
          </Toolbar>
        </MuiAppBar>
      </Box>
      <PostModal open={open} onClose={handleClose} />
    </React.Fragment>
  )
}

export default AppBar
