import { useRouter } from 'next/router'
import HarmonyAppBar from '../../components/appBar'
import PostCard from '../../components/post/postCard'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { useEffect, useState } from 'react'
import { Post } from '../../models/post'
import { Box } from '@mui/material'
import Head from 'next/head'

export default function PostDetail() {
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
        <title>{`${post?.title} - by ${post?.username}`}</title>
      </Head>

      <Box sx={{ m: 5 }}>{post && <PostCard {...post}></PostCard>}</Box>
    </>
  )
}
