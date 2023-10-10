import React, { useEffect } from 'react'
import { Button, Card, Divider } from '@mui/material'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import Post from '../../components/post'
import Stack from '@mui/system/Stack'
import Link from 'next/link'

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
        <Post title="Is Jimmy Crazy?" name="Jason" comments={100} likes={400} />
      </Link>

      <Post
        title="Has anyone checked out Post Malone's new track? I think this one is fire"
        name="Jason"
        comments={100}
        likes={400}
      />
      <Post title="lorem ipsum" name="Jason" comments={100} likes={400} />
      <Post
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
        name="Jason"
        comments={100}
        likes={400}
      />
      <Post
        title="Quam, neque repellendus fugit facilis facere veritatis omnis aut cumque magni sapiente quaerat voluptates."
        name="Jason"
        comments={100}
        likes={400}
      />
      <Post
        title=" Soluta deserunt totam molestiae rerum mollitia atque ipsum."
        name="Jason"
        comments={100}
        likes={400}
      />
      <Card variant="outlined">
        <p>This is the homepage. Hello World!</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{response?.echo || JSON.stringify(error)}</p>
        )}
      </Card>
    </>
  )
}

export default HomePage
