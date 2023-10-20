import { Post } from '../models/post'
import React, { useEffect } from 'react'
import PostCard from '../components/post/postCard'
import TextBlock from './text'
import useHttpRequest, { HttpMethod } from '../hooks/httpRequest'

interface PostFeedProps {
  url: string
}

const PostFeed = ({ url }: PostFeedProps) => {
  const [getPosts, posts] = useHttpRequest({
    url: url,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (url) {
      getPosts()
    }
  }, [])

  const mappedPosts = (posts as Array<Post>) || []

  return mappedPosts.length > 0 ? (
    mappedPosts.map(post => {
      return <PostCard {...post} />
    })
  ) : (
    <TextBlock>No posts here</TextBlock>
  )
}

export default PostFeed
