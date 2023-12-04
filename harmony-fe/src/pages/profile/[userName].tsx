import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import TabLayout from '../../components/tab-layout'
import PostFeed from '../../components/post-feed/post-feed'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { User } from '../../models/user'
import TextBlock from '../../components/text-block'
import { UserContext } from '../../contexts/userContext'
import FollowingButton from '../../components/following-button'
import Head from 'next/head'
import CommentFeed from '../../components/comment-feed/comment-feed'
import { MobileContext } from '../../contexts/mobileContext'

const Profile = () => {
  const router = useRouter()
  const { userName } = router.query
  const [userData, setUser] = useState<User>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const user = useContext(UserContext)
  const mobile = useContext(MobileContext)

  //Retrieve user data
  const [getUserData, receivedData, error] = useHttpRequest({
    url: `/user/${userName}`,
    method: HttpMethod.GET,
  })

  //Check if user id exists
  useEffect(() => {
    if (userName) {
      getUserData()
      if (error) {
        router.replace('/error')
      }
    }
  }, [userName, error])

  //Set not loading once data is retrieved
  useEffect(() => {
    if (receivedData) {
      setUser(receivedData)
      setLoading(false)
    }
  }, [receivedData, userData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: `/follow/user/${userData?.userId}`,
    method: HttpMethod.GET,
  })

  //Retrieve number of followers for the user
  const [getFollowerInfo, receivedFollowerInfo] = useHttpRequest({
    url: `/follow/followCount/${userData?.userId}`,
    method: HttpMethod.GET,
  })

  //Sending follow data
  const [setFollowActionData] = useHttpRequest({
    url: '/follow',
    method: HttpMethod.POST,
    body: { followAction: !following, followingId: userData?.userId },
  })

  //If data is found, fetch the following info
  //If the user is logged in, check if they're following this topic
  useEffect(() => {
    if (userData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [userData])

  //Set the following status according to the user info
  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, userData])

  //Set the following count
  useEffect(() => {
    if (receivedFollowerInfo) {
      setNumFollowers(receivedFollowerInfo)
    }
  }, [receivedFollowerInfo, userData])

  const followAction = () => {
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
      label: 'Posts',
      tab: (
        <PostFeed
          url={userData?.userId ? `/post/user/${userData?.userId}` : ''}
        />
      ),
    },
    {
      label: 'Comments',
      tab: (
        <CommentFeed
          url={userData?.userId ? `/user/${userData?.userId}/comment` : ''}
        />
      ),
    },
  ]

  return !isLoading ? (
    <>
      <Head>
        <title>{`${userData?.username}'s Profile`}</title>
      </Head>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 'auto',
            flexGrow: 1,
            mb: 1,
          }}
        >
          {/* Mobile avatar view */}
          {mobile && (
            <Stack alignItems="center">
              <Avatar
                src={`/images/profilepic/${userData?.picture}.png`}
                sx={{ height: '175px', width: '175px' }}
              ></Avatar>
              <TextBlock gutterBottom variant="h4">
                {`${userData?.firstName} ${userData?.lastName}`}
              </TextBlock>
              <TextBlock gutterBottom variant="h5">
                {userName}
              </TextBlock>
              {user && user?.username !== userName && (
                <FollowingButton variant="outlined" onClick={followAction}>
                  {following ? 'Un-Follow' : 'Follow'}
                </FollowingButton>
              )}
              {user && user?.username === userName && (
                <IconButton href="/account">
                  <SettingsIcon fontSize="inherit" />
                </IconButton>
              )}
              <br />
              <TextBlock>{`${numFollowers} Follower${
                numFollowers === 1 ? '' : 's'
              }`}</TextBlock>
            </Stack>
          )}

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* Desktop avatar view */}
            {!mobile && (
              <>
                <Grid item>
                  <Avatar
                    src={`/images/profilepic/${userData?.picture}.png`}
                    sx={{
                      height: '175px',
                      width: '175px',
                      ml: !mobile ? 3 : 0,
                    }}
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
                        <FollowingButton
                          variant="outlined"
                          onClick={followAction}
                        >
                          {following ? 'Un-Follow' : 'Follow'}
                        </FollowingButton>
                      )}
                      {user && user?.username === userName && (
                        <IconButton href="/account">
                          <SettingsIcon sx={{ fontSize: '48px' }} />
                        </IconButton>
                      )}
                      <br />
                      <TextBlock>{`${numFollowers} Follower${
                        numFollowers === 1 ? '' : 's'
                      }`}</TextBlock>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
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
            {/* Desktop View */}
            {!mobile && (
              <>
                <Grid item xs={8} container direction="column">
                  <Grid item xs zeroMinWidth>
                    <TextBlock variant="h4">Content</TextBlock>
                  </Grid>
                </Grid>
                <Grid item xs={4} zeroMinWidth>
                  <TextBlock variant="h4">Info</TextBlock>
                </Grid>
                <Grid item xs={8} container direction="column">
                  <TabLayout tabs={tabs} variant="fullWidth" />
                </Grid>
                <Grid item xs={4} zeroMinWidth>
                  <TextBlock sx={{ whiteSpace: 'pre-wrap' }}>
                    {userData?.bio}
                  </TextBlock>
                </Grid>
              </>
            )}
            {/* Mobile view */}
            {mobile && (
              <>
                <Grid item xs={12} zeroMinWidth>
                  <TextBlock variant="h4">Info</TextBlock>
                  <TextBlock sx={{ whiteSpace: 'pre-wrap' }}>
                    {userData?.bio}
                  </TextBlock>
                </Grid>
                <Grid item xs={12} container direction="column">
                  <TextBlock variant="h4">Content</TextBlock>
                  <TabLayout tabs={tabs} variant="fullWidth" />
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Container>
    </>
  ) : (
    <Stack sx={{ display: 'flex' }}>
      <CircularProgress
        size="4rem"
        style={{ marginTop: 20, alignSelf: 'center' }}
      />
    </Stack>
  )
}

export default Profile
