import { useRouter } from 'next/router'
import TextBlock from '../../components/text-block'
import { useState, useEffect, useContext } from 'react'
import FollowingButton from '../../components/following-button'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { UserContext } from '../../contexts/userContext'
import { Album } from '../../models/album'
import {
  Container,
  Paper,
  Grid,
  Box,
  Avatar,
  Stack,
  CircularProgress,
} from '@mui/material'
import Head from 'next/head'
import PostFeed from '../../components/post-feed'
import { MobileContext } from '../../contexts/mobileContext'

const AlbumPage = () => {
  const router = useRouter()
  const { albumId } = router.query
  const [albumData, setAlbumData] = useState<Album>()
  const [following, setFollowing] = useState(false)
  const [numFollowers, setNumFollowers] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const user = useContext(UserContext)
  const mobile = useContext(MobileContext)

  //Retrieve artist data
  const [getAlbumData, receivedData, error] = useHttpRequest({
    url: `/topic/album/${albumId}`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (albumId) {
      getAlbumData()
    }
    if (error) {
      router.replace('/error')
    }
  }, [albumId, error])

  useEffect(() => {
    if (receivedData) {
      setAlbumData(receivedData)
      setLoading(false)
    }
  }, [receivedData, albumData])

  useEffect(() => {
    if (albumData) {
      getFollowerInfo()
      if (user) {
        getFollowData()
      }
    }
  }, [albumData])

  //Retrieve follow data
  const [getFollowData, receivedFollowData] = useHttpRequest({
    url: '/follow/album',
    method: HttpMethod.GET,
    headers: { followingId: albumData?.albumId },
  })

  //Retrieve number of followers for the user
  const [getFollowerInfo, receivedFollowerInfo] = useHttpRequest({
    url: `/follow/followCount/album/${albumData?.albumId}`,
    method: HttpMethod.GET,
  })

  //Sending follow data
  const [setFollowActionData] = useHttpRequest({
    url: '/follow/album',
    method: HttpMethod.POST,
    headers: { followingId: albumData?.albumId },
    body: { followAction: !following },
  })

  useEffect(() => {
    if (receivedFollowData) {
      setFollowing(receivedFollowData)
    }
  }, [receivedFollowData, albumData])

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
  }, [receivedFollowerInfo, albumData])

  return !isLoading ? (
    <>
      <Head>
        <title>{`${albumData?.albumName}'s Feed`}</title>
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
          {/* Mobile avatar view */}
          {mobile && (
            <Stack alignItems="center">
              <Avatar
                src={'/images/profilepic/album.png'}
                sx={{ height: '175px', width: '175px', ml: !mobile ? 3 : 0 }}
              ></Avatar>
              <TextBlock gutterBottom variant="h4">
                {`${albumData?.albumName}`}
              </TextBlock>
              <TextBlock gutterBottom variant="h5">
                (Album)
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
            {/* Desktop avatar view */}
            {!mobile && (
              <>
                <Grid item>
                  <Avatar
                    src={'/images/profilepic/album.png'}
                    sx={{
                      height: '175px',
                      width: '175px',
                      ml: !mobile ? 3 : 0,
                    }}
                  ></Avatar>
                </Grid>
                <Grid item xs sx={{ ml: 2 }}>
                  <TextBlock gutterBottom variant="h4">
                    {`${albumData?.albumName}`}
                  </TextBlock>
                  <TextBlock gutterBottom variant="h5">
                    (Album)
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
          url={albumData?.albumId ? `/post/album/${albumData?.albumId}` : ''}
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

export default AlbumPage
