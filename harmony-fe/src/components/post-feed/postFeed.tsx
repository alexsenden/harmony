import React, { useEffect } from 'react'
import { Box, CircularProgress, Stack } from '@mui/material'

import TextBlock from '../text-block'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Post } from '../../models/post'
import PostComponent from '../post'

const NO_POSTS_HERE = 'No Posts Available'
const SERVER_ERROR = 'Server is Not Responding'

interface PostFeedProps {
  url: string
  noResultsText?: string
}

const PostFeed = ({ url, noResultsText = NO_POSTS_HERE }: PostFeedProps) => {
  const [getPosts, posts, error, loading] = useHttpRequest({
    url: url,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    getPosts()
  }, [url])

  const mappedPosts = (posts as Array<Post>) || []

  const renderedPosts = mappedPosts.map((post, index) => {
    return <PostComponent post={post} key={`post-${index}`} />
  })

  return error ? (
    <TextBlock align="center" sx={{ mt: 2 }}>
      {SERVER_ERROR}
    </TextBlock>
  ) : !loading ? (
    renderedPosts.length > 0 ? (
      <Box width={1} display="flex" flexDirection="column" mt={2}>
        {renderedPosts}
      </Box>
    ) : (
      <TextBlock align="center" sx={{ mt: 2 }}>
        {noResultsText}
      </TextBlock>
    )
  ) : (
    <Stack sx={{ display: 'flex' }}>
      <CircularProgress
        size="4rem"
        style={{ marginTop: 20, alignSelf: 'center' }}
      />
    </Stack>
  )
}

export default PostFeed
