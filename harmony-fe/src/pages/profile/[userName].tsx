import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Container, Grid, Paper } from '@mui/material'

import HarmonyAppBar from '../../components/appBar/appBar'
import TabLayout from '../../components/tab-layout'
import PostFeed from '../../components/postFeed'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { User } from '../../models/user'
import TextBlock from '../../components/text'
import NavButton from '../../components/appBar/navButton.styled'
import { UserContext, UserCookieContext } from '../../contexts/user'
import FollowingButton from '../../components/following-button'

const Profile = () => {
  const router = useRouter()
  const { userName } = router.query
  const [userData, setUser] = useState<User>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)

  const userCookie = useContext(UserCookieContext)
  const user = useContext(UserContext)

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
      setUser(receivedData)
    }
  }, [receivedData, userData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: '/follow',
    method: HttpMethod.GET,
    headers: { userCookie: userCookie, followingId: userData?.userId },
  })

  //Retrieve number of followers for the user
  const [getFollowerInfo, receivedFollowerInfo] = useHttpRequest({
    url: '/follow/followCount',
    method: HttpMethod.GET,
    headers: { userId: userData?.userId },
  })

  useEffect(() => {
    if (userData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [userData])

  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, userData])

  useEffect(() => {
    if (receivedFollowerInfo) {
      setNumFollowers(receivedFollowerInfo)
    }
  }, [receivedFollowerInfo, userData])

  //Sending follow data
  const [setFollowActionData] = useHttpRequest({
    url: '/follow',
    method: HttpMethod.POST,
    headers: { userCookie: userCookie, followingId: userData?.userId },
    body: { followAction: !following },
  })

  function followAction() {
    setFollowActionData()
    if (following) {
      setNumFollowers(numFollowers - 1)
    } else {
      setNumFollowers(numFollowers + 1)
    }
    setFollowing(!following)
  }

  const tabs = [
    {
      label: 'All Content',
      tab: (
        <PostFeed
          url={userData?.userId ? `/post/?userId=${userData?.userId}` : ''}
          noResultsText="No Content Available"
        />
      ),
    },
    {
      label: 'Posts',
      tab: (
        <PostFeed
          url={userData?.userId ? `/post/?userId=${userData?.userId}` : ''}
        />
      ),
    },
    {
      label: 'Comments',
      tab: (
        <TextBlock align="center" sx={{ mt: 2 }}>
          No Comments Available
        </TextBlock>
      ),
    },
  ]

  return (
    <>
      <HarmonyAppBar />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
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
                sx={{ height: '200px', width: '200px', ml: 3 }}
              ></Avatar>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs sx={{ ml: 2 }}>
                  <TextBlock gutterBottom variant="h4">
                    {`${userData?.firstName} ${userData?.lastName}`}
                  </TextBlock>
                  <TextBlock gutterBottom variant="h5">
                    {userName}
                  </TextBlock>
                </Grid>
              </Grid>
              <Grid item>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="flex-start"
                  mx={3}
                >
                  {user && user?.username !== userName && (
                    <FollowingButton variant="outlined" onClick={followAction}>
                      {following ? 'Un-Follow' : 'Follow'}
                    </FollowingButton>
                  )}
                  <br />
                  <TextBlock>{`${numFollowers} Follower${
                    numFollowers === 1 ? '' : 's'
                  }`}</TextBlock>
                </Box>
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
              <Grid item xs zeroMinWidth></Grid>
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <h1></h1>
            </Grid>
            <Grid item xs={8} container direction="column">
              <Grid item xs zeroMinWidth>
                <TabLayout tabs={tabs} variant="fullWidth" />
              </Grid>
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <p></p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default Profile
