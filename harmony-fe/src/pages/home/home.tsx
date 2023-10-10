import { Button, Container, Divider, Stack } from '@mui/material'
import Post from '../../components/post/post'
import Link from 'next/link'

import HarmonyAppBar from '../../components/appBar'

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
          <Button variant="contained">Followed</Button>
          <Button variant="outlined">Recommended</Button>
        </Stack>

        <Link href="./posts">
          <Post
            title="Is Jimmy Crazy?"
            name="Jason"
            numComments={100}
            numLikes={400}
          />
        </Link>

        <Post
          title="Has anyone checked out Post Malone's new track? I think this one is fire"
          name="Jason"
          numComments={100}
          numLikes={400}
        />
        <Post
          title="lorem ipsum"
          name="Jason"
          numComments={100}
          numLikes={400}
        />
        <Post
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
          name="Jason"
          numComments={100}
          numLikes={400}
        />
        <Post
          title="Quam, neque repellendus fugit facilis facere veritatis omnis aut cumque magni sapiente quaerat voluptates."
          name="Jason"
          numComments={100}
          numLikes={400}
        />
        <Post
          title=" Soluta deserunt totam molestiae rerum mollitia atque ipsum."
          name="Jason"
          numComments={100}
          numLikes={400}
        />
      </Container>
    </>
  )
}

export default HomePage
