import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'
import { useState, useEffect, useContext } from 'react'
import FollowingButton from '../../components/following-button'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { UserContext } from '../../contexts/userContext'
import { Song } from '../../models/song'
import Head from 'next/head'
import {
  Container,
  Paper,
  Grid,
  Box,
  Avatar,
  Stack,
  CircularProgress,
} from '@mui/material'
import PostFeed from '../../components/post-feed'
import { MobileContext } from '../../contexts/mobileContext'

const SongPage = () => {
  const router = useRouter()
  const { songId } = router.query
  const [songData, setSongData] = useState<Song>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const user = useContext(UserContext)
  const mobile = useContext(MobileContext)

  //Retrieve song data
  const [getSongData, receivedData, error] = useHttpRequest({
    url: `/topic/song/${songId}`,
    method: HttpMethod.GET,
  })

  //Check if song id exists
  useEffect(() => {
    if (songId) {
      getSongData()
    }
    if (error) {
      router.replace('/error')
    }
  }, [songId, error])

  //Set not loading once data is retrieved
  useEffect(() => {
    if (receivedData) {
      setSongData(receivedData)
      setLoading(false)
    }
  }, [receivedData, songData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: `/follow/song/${songData?.songId}`,
    method: HttpMethod.GET,
  })

  //Retrieve number of followers for the user
  const [getFollowerInfo, receivedFollowerInfo] = useHttpRequest({
    url: `/follow/followCount/song/${songData?.songId}`,
    method: HttpMethod.GET,
  })

  //Sending follow data
  const [setFollowActionData] = useHttpRequest({
    url: '/follow/song',
    method: HttpMethod.POST,
    body: { followAction: !following, followingId: songData?.songId },
  })

  //If data is found, fetch the following info
  //If the user is logged in, check if they're following this topic
  useEffect(() => {
    if (songData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [songData])

  //Set the following status according to the user info
  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, songData])

  //Set the following count
  useEffect(() => {
    if (receivedFollowerInfo) {
      setNumFollowers(receivedFollowerInfo)
    }
  }, [receivedFollowerInfo, songData])

  const followAction = () => {
    setFollowActionData()
    if (following) {
      setNumFollowers(numFollowers - 1)
    } else {
      setNumFollowers(numFollowers + 1)
    }
    setFollowing(!following)
  }

  return !isLoading ? (
    <>
      <Head>
        <title>{`${songData?.songName}'s Feed`}</title>
      </Head>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 'auto',
            flexGrow: 1,
          }}
        >
          {/* Mobile Information view */}
          {mobile && (
            <Stack alignItems="center">
              <Avatar
                src={'/images/topicpic/song.png'}
                sx={{ height: '175px', width: '175px', ml: !mobile ? 3 : 0 }}
              ></Avatar>
              <TextBlock gutterBottom variant="h4">
                {`${songData?.songName}`}
              </TextBlock>
              <TextBlock gutterBottom variant="h5">
                (Song)
              </TextBlock>
              {user && (
                <FollowingButton variant="outlined" onClick={followAction}>
                  {following ? 'Un-Follow' : 'Follow'}
                </FollowingButton>
              )}
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
            {/* Desktop Information view */}
            {!mobile && (
              <>
                <Grid item>
                  <Avatar
                    src={'/images/topicpic/song.png'}
                    sx={{
                      height: '175px',
                      width: '175px',
                      ml: !mobile ? 3 : 0,
                    }}
                  ></Avatar>
                </Grid>
                <Grid item xs sx={{ ml: 2 }}>
                  <TextBlock gutterBottom variant="h4">
                    {`${songData?.songName}`}
                  </TextBlock>
                  <TextBlock gutterBottom variant="h5">
                    (Song)
                  </TextBlock>
                </Grid>
                <Grid item>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    mx={3}
                  >
                    {user && (
                      <FollowingButton
                        variant="outlined"
                        onClick={followAction}
                      >
                        {following ? 'Un-Follow' : 'Follow'}
                      </FollowingButton>
                    )}
                    <TextBlock>{`${numFollowers} Follower${
                      numFollowers === 1 ? '' : 's'
                    }`}</TextBlock>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
        <PostFeed
          url={songData?.songId ? `/post/song/${songData?.songId}` : ''}
        />
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

export default SongPage
