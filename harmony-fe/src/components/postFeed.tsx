import { Post } from '../models/post'
import React, { useEffect } from 'react'
import PostCard from '../components/post/postCard'
import TextBlock from './text'
import useHttpRequest, { HttpMethod } from '../hooks/httpRequest'

const NO_POSTS_HERE = 'No posts here'

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

  return mappedPosts.length > 0 && url ? (
    mappedPosts.map(post => {
      return <PostCard {...post} />
    })
  ) : (
    <TextBlock align="center">{noResultsText}</TextBlock>
  )
}

export default PostFeed
