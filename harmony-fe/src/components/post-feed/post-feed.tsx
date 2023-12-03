import { useEffect, useState } from 'react'
import { Box, CircularProgress, Stack } from '@mui/material'

import TextBlock from '../text-block'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Post } from '../../models/post'
import PostComponent from '../post'

const NO_POSTS_HERE = 'No Posts Available'
const SERVER_ERROR = 'Server is Not Responding'

export interface PostFeedProps {
  url: string
  noResultsText?: string
}

const PostFeed = ({ url, noResultsText = NO_POSTS_HERE }: PostFeedProps) => {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [numPostsFetched, setNumPostsFetched] = useState<number>(0)
  const [postsAvailable, setPostsAvailable] = useState<boolean>(true)

  const [getPosts, postsResponse, error, loading] = useHttpRequest({
    url: `${url}?offset=${numPostsFetched}`,
    method: HttpMethod.GET,
  })

  const getPostsIfAvailable = () => {
    if (postsAvailable && !loading) {
      getPosts()
    }
  }

  const sortByCreatedAt = (postA: Post, postB: Post) => {
    if (postA.createdAt === postB.createdAt) {
      return 0
    }
    return postA.createdAt < postB.createdAt ? 1 : 0
  }

  const handleScroll = () => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200

    if (nearBottom) {
      getPostsIfAvailable()
    }
  }

  useEffect(() => {
    getPostsIfAvailable()
  }, [url])

  useEffect(() => {
    if (postsResponse) {
      // Exit early if end of feed reached
      if (postsResponse.length === 0) {
        setPostsAvailable(false)
        return
      }

      // Filter out any duplicate posts
      const newPosts = (postsResponse as Array<Post>)
        .filter(newPost => {
          return !posts.find(
            existingPost => existingPost.postId === newPost.postId
          )
        })
        .sort(sortByCreatedAt)

      // Add posts to feed
      setNumPostsFetched(prevState => prevState + postsResponse.length)
      setPosts([...posts, ...newPosts])
    }
  }, [postsResponse])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return error && error.response.status !== 401 ? (
    <TextBlock align="center" sx={{ mt: 2 }}>
      {SERVER_ERROR}
    </TextBlock>
  ) : !loading ? (
    posts.length > 0 ? (
      <Box
        onScroll={handleScroll}
        width={1}
        display="flex"
        flexDirection="column"
        mt={2}
      >
        {posts.map(post => {
          console.log(post.postId)
          return (
            <div key={post.postId}>
              <PostComponent post={post} />
            </div>
          )
        })}
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
