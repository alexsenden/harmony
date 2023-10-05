import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image'
import Divider from '@mui/material/Divider';
import Link from 'next/link';

export default function HarmonyAppBar() {
    return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className = 'navBar' position="sticky" >
          <Toolbar>
            <Button href="/home">
            <Box
                component ="img"
                sx={{
                    height: 64,
                    }}
                    alt="Your logo."
                    src={"/harmony1.png"}
            />

            </Button>
            <Button href="/home" className = "navButton" color="inherit">Home</Button>
            <Button href="/profile" className = "navButton" color="inherit" >Profile</Button>
            <Button href="/home" className = "navButton" color="inherit" >Search</Button>
            <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }}/>

            <Button href="/home" className = "navButton" color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
    );
  }
