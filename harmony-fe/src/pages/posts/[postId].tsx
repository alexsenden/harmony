import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'

import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Post } from '../../models/post'
import PostComponent from '../../components/post'
import TextBlock from '../../components/text-block'
import Head from 'next/head'

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
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {post ? (
          <PostComponent
            post={post}
            commentOpen={true}
            expanded={true}
          ></PostComponent>
        ) : (
          <TextBlock>This post is unavailable.</TextBlock>
        )}
      </Container>
    </>
  )
}

export default PostDetail
