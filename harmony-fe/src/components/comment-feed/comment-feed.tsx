import React, { useEffect } from 'react'
import { Box, CircularProgress, Stack } from '@mui/material'

import TextBlock from '../text-block'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { CommentWithUser } from '../../models/comment'
import Comment from './comment-profile'

const NO_POSTS_HERE = 'No Comments Available'
const SERVER_ERROR = 'Server is Not Responding'

interface CommentFeedProps {
  url: string
  noResultsText?: string
}

const CommentFeed = ({
  url,
  noResultsText = NO_POSTS_HERE,
}: CommentFeedProps) => {
  const [getComments, comments, error, loading] = useHttpRequest({
    url: url,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    getComments()
  }, [url])

  const mappedComments = (comments as Array<CommentWithUser>) || []

  const renderedComments = mappedComments.map((comment, index) => {
    return <Comment comment={comment} key={`post-${index}`} />
  })

  return error ? (
    <TextBlock align="center" sx={{ mt: 2 }}>
      {SERVER_ERROR}
    </TextBlock>
  ) : !loading ? (
    renderedComments.length > 0 ? (
      <Box width={1} display="flex" flexDirection="column" mt={2}>
        {renderedComments}
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

export default CommentFeed
