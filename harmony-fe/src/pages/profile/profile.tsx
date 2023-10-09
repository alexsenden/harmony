import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import HarmonyAppBar from '../../components/appbar'

const HomePage = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const handleTabChange = (e: any, tabIndex: React.SetStateAction<number>) => {
    setCurrentTabIndex(tabIndex)
  }

  return (
    <>
      <HarmonyAppBar />
      <Container maxWidth="xl">
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 'auto',
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item>
              <Avatar
                src="/harmony1.png"
                sx={{ height: '200px', width: '200px' }}
              ></Avatar>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    Screen Name
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    User Name
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button className="followButton">Follow</Button>
                <br />
                100 Trillion Followers
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 'auto',
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item xs={8} container direction="column">
              <Grid item xs>
                <h1>Content</h1>
              </Grid>
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <h1>Info</h1>
            </Grid>
            <Grid item xs={8} container direction="column">
              <Grid item xs>
                <Tabs value={currentTabIndex} onChange={handleTabChange}>
                  <Tab label="All Content" />
                  <Tab label="Posts" />
                  <Tab label="Comments" />
                </Tabs>
                {currentTabIndex === 0 && <p>All content</p>}
                {currentTabIndex === 1 && <p>Posts</p>}
                {currentTabIndex === 2 && <p>Comments</p>}
              </Grid>
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <p>Profile Information</p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default HomePage
