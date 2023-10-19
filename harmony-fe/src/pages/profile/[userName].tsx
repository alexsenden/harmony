import { useRouter } from 'next/router'
import React, { useEffect,useState } from 'react'
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material'

import HarmonyAppBar from '../../components/appBar/appBar'
import TabLayout, { TabItem } from '../../components/tab-layout'
import PostFeed from '../../components/postFeed'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Post } from '../../models/post'
import { User } from '../../models/user'

export default function Profile()  {
  const router = useRouter()
  const userName = router.query.userName
  const [postsFromUser, getPosts] = useState<Array<Post>>([])
  const [userData, getUser] = useState<User>()

  //Retrieve user data
  const [getUserData, receivedData] = useHttpRequest({
    url: `/user/?username=${userName}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    getUserData()
  }, [router])

  useEffect(() => {
    if (receivedData) {
      getUser(receivedData)
      console.log(receivedData)
    }
  }, [receivedData, userData])


  //Retrieve posts
  const [getPostsByUserId, postsReceived] = useHttpRequest({
    url: `/post/?userId=${userData?.userId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    getPostsByUserId()
  }, [userData])

  useEffect(() => {
    if (postsReceived) {
      getPosts(postsReceived)
      console.log(postsReceived)
      updateTabs([
        {
          label: 'All Content',
          tab: <>{PostFeed(postsFromUser)}</>,
        },
        {
          label: 'Posts',
          tab: <>{PostFeed(postsFromUser)}</>,
        },
        {
          label: 'Comments',
          tab: <p>No Comments Available</p>,
        },
      ])
    }
  }, [postsReceived, postsFromUser,userData])

  const [tabs, updateTabs] = useState<Array<TabItem>>([
    {
      label: 'All Content',
      tab: <p>No Content Available</p>,
    },
    {
      label: 'Posts',
      tab: <p>No Posts Available</p>,
    },
    {
      label: 'Comments',
      tab: <p>No Comments Available</p>,
    },
  ])

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
                    {userName}
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
          <Grid container spacing={2} direction="row" justifyContent="flex-end">
            <Grid item xs={8} container direction="column">
              <Grid item xs zeroMinWidth>
                <h1>Content</h1>
              </Grid>
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <h1>Info</h1>
            </Grid>
            <Grid item xs={8} container direction="column">
              <Grid item xs zeroMinWidth>
                <TabLayout tabs={tabs} variant="fullWidth" />
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