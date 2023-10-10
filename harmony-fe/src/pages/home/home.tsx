import React, { useEffect } from 'react'
import { Button, Container, Divider, Stack } from '@mui/material'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import Post from '../../components/post'
import Link from 'next/link'
import HarmonyAppBar from '../../components/appbar'

const HomePage = () => {
  const [sendRequest, response, error, loading] = useHttpRequest({
    method: HttpMethod.GET,
    url: '/example?echo=Echo_Me_Please!',
  })

  useEffect(() => {
    sendRequest()
  }, [])

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
