import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
import TextBlock from '../../components/text'

export default function Profile() {
  const router = useRouter()
  const { userName } = router.query
  const [postsFromUser, getPosts] = useState<Array<Post>>([])
  const [userData, getUser] = useState<User>()

  //Retrieve user data
  const [getUserData, receivedData, error] = useHttpRequest({
    url: `/user/?username=${userName}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (userName) {
      getUserData()

      if (error) {
        router.replace('/error')
      }
    }
  }, [userName, error])

  useEffect(() => {
    if (receivedData) {
      getUser(receivedData)
    }
  }, [receivedData, userData])

  //Retrieve posts
  const [getPostsByUserId, postsReceived] = useHttpRequest({
    url: `/post/?userId=${userData?.userId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (userData) {
      getPostsByUserId()
    }
  }, [userData])

  useEffect(() => {
    if (postsReceived) {
      getPosts(postsReceived)
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
          tab: <TextBlock>No Comments Available</TextBlock>,
        },
      ])
    }
  }, [postsReceived, postsFromUser, userData])

  const [tabs, updateTabs] = useState<Array<TabItem>>([
    {
      label: 'All Content',
      tab: <TextBlock>No Content Available</TextBlock>,
    },
    {
      label: 'Posts',
      tab: <TextBlock>No Posts Available</TextBlock>,
    },
    {
      label: 'Comments',
      tab: <TextBlock>No Comments Available</TextBlock>,
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
                <TextBlock>100 Trillion Followers</TextBlock>
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
