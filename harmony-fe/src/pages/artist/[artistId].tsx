import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'
import { useState, useEffect, useContext } from 'react'
import FollowingButton from '../../components/following-button'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { UserContext } from '../../contexts/userContext'
import { Artist } from '../../models/artist'
import Head from 'next/head'
import { Container, Paper, Grid, Box } from '@mui/material'
import PostFeed from '../../components/post-feed'

const ArtistPage = () => {
  const router = useRouter()
  const { artistId } = router.query
  const [artistData, setArtistData] = useState<Artist>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)
  const user = useContext(UserContext)

  //Retrieve artist data
  const [getArtistData, receivedData, error] = useHttpRequest({
    url: `/topic/artist/${artistId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (artistId) {
      getArtistData()
    }
  }, [artistId, error])

  useEffect(() => {
    if (receivedData) {
      setArtistData(receivedData)
    }
  }, [receivedData, artistData])

  useEffect(() => {
    if (artistData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [artistData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: '/follow/artist',
    method: HttpMethod.GET,
    headers: { followingId: artistData?.artistId },
  })

  //Retrieve number of followers for the user
  const [getFollowerInfo, receivedFollowerInfo] = useHttpRequest({
    url: `/follow/followCount/artist/${artistData?.artistId}`,
    method: HttpMethod.GET,
  })

  //Sending follow data
  const [setFollowActionData] = useHttpRequest({
    url: '/follow/artist',
    method: HttpMethod.POST,
    headers: { followingId: artistData?.artistId },
    body: { followAction: !following },
  })

  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, artistData])

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
  }, [receivedFollowerInfo, artistData])

  return (
    <>
      <Head>
        <title>{`${artistData?.artistName}'s Feed`}</title>
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
            <Grid item xs sx={{ ml: 2 }}>
              <TextBlock gutterBottom variant="h4">
                {`${artistData?.artistName}`}
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
                <FollowingButton variant="outlined" onClick={followAction}>
                  {following ? 'Un-Follow' : 'Follow'}
                </FollowingButton>
                <TextBlock>{`${numFollowers} Follower${
                  numFollowers === 1 ? '' : 's'
                }`}</TextBlock>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <PostFeed
          url={
            artistData?.artistId ? `/post/artist/${artistData?.artistId}` : ''
          }
        />
      </Container>
    </>
  )
}

export default ArtistPage
