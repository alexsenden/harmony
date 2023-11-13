import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'
import { useState, useEffect, useContext } from 'react'
import FollowingButton from '../../components/following-button'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { UserContext } from '../../contexts/userContext'
import { Song } from '../../models/song'
import Head from 'next/head'
import { Container, Paper, Grid, Box, Avatar } from '@mui/material'
import PostFeed from '../../components/post-feed'

const SongPage = () => {
  const router = useRouter()
  const { songId } = router.query
  const [songData, setSongData] = useState<Song>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)
  const user = useContext(UserContext)

  //Retrieve artist data
  const [getSongData, receivedData, error] = useHttpRequest({
    url: `/topic/song/${songId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (songId) {
      getSongData()
    }
  }, [songId, error])

  useEffect(() => {
    if (receivedData) {
      setSongData(receivedData)
    }
  }, [receivedData, songData])

  useEffect(() => {
    if (songData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [songData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: '/follow/song',
    method: HttpMethod.GET,
    headers: { followingId: songData?.songId },
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
    headers: { followingId: songData?.songId },
    body: { followAction: !following },
  })

  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, songData])

  const followAction = () => {
    setFollowActionData()
    if (following) {
      setNumFollowers(numFollowers - 1)
    } else {
      setNumFollowers(numFollowers + 1)
    }
    setFollowing(!following)
  }
  useEffect(() => {
    if (receivedFollowerInfo) {
      setNumFollowers(receivedFollowerInfo)
    }
  }, [receivedFollowerInfo, songData])

  return (
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
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item>
              <Avatar
                alt="Song picture"
                src="/images/topicpic/song.png"
                sx={{ height: '175px', width: '175px', ml: 3 }}
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
                  <FollowingButton variant="outlined" onClick={followAction}>
                    {following ? 'Un-Follow' : 'Follow'}
                  </FollowingButton>
                )}
                <TextBlock>{`${numFollowers} Follower${
                  numFollowers === 1 ? '' : 's'
                }`}</TextBlock>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <PostFeed
          url={songData?.songId ? `/post/song/${songData?.songId}` : ''}
        />
      </Container>
    </>
  )
}

export default SongPage
