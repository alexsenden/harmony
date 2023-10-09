import React, { useEffect } from 'react'
import {AppBar, Box, Toolbar, Button, Divider} from '@mui/material'

export default function HarmonyAppBar() {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="navBar" position="sticky">
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

            <Button href="/home" className="navButton" color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  )
}
