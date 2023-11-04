import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Post } from '../../models/post'
import PostComponent from '../../components/post'
import TextBlock from '../../components/text-block'

const PostDetail = () => {
  const router = useRouter()
  const postID = router.query.postId

  const [post, setPost] = useState<Post | undefined>(undefined)

  const [getPost, postResponse] = useHttpRequest({
    method: HttpMethod.GET,
    url: `/post/${postID}`,
  })

  useEffect(() => {
    if (postID) {
      getPost()
    }
  }, [postID])

  useEffect(() => {
    setPost(postResponse)
  }, [postResponse])

  return (
    <Box sx={{ m: 5 }}>
      {post ? (
        <PostComponent post={post}></PostComponent>
      ) : (
        <TextBlock>This post is unavailable.</TextBlock>
      )}
    </Box>
  )
}

export default PostDetail
