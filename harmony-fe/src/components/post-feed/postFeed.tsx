import React, { useEffect } from 'react'
import { Box } from '@mui/material'

import TextBlock from '../text-block'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Post } from '../../models/post'
import PostComponent from '../post'

const NO_POSTS_HERE = 'No Posts Available'

interface PostFeedProps {
  url: string
  noResultsText?: string
}

const PostFeed = ({ url, noResultsText = NO_POSTS_HERE }: PostFeedProps) => {
  const [getPosts, posts] = useHttpRequest({
    url: url,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    getPosts()
  }, [url])

  const mappedPosts = (posts as Array<Post>) || []

  const renderedPosts = mappedPosts.map(post => {
    return <PostComponent post={post} />
  })

  return renderedPosts.length > 0 ? (
    <Box width={1} display="flex" flexDirection="column" mt={2}>
      {renderedPosts}
    </Box>
  ) : (
    <TextBlock align="center" sx={{ mt: 2 }}>
      {noResultsText}
    </TextBlock>
  )
}

export default PostFeed
