import { Button, Container, Divider, Stack } from '@mui/material'
import HarmonyAppBar from '../../components/appBar'
import PostContainer from '../../components/postContainer/postContainer'

const HomePage = () => {
  return (
    <>
      <HarmonyAppBar />
      <Container maxWidth="xl">
        <Stack
          sx={{ p: 4 }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          justifyContent="center"
        >
          <Button href="../followed" variant="contained">
            Followed
          </Button>
          <Button href="../recommended" variant="outlined">
            Recommended
          </Button>
        </Stack>

        <PostContainer />
      </Container>
    </>
  )
}

export default HomePage
