import { Post } from '../models/post'
import React from 'react'
import PostCard from '../components/post/postCard'

export default function PostFeed(posts: Array<Post>) {
  if (posts.length > 0) {
    return posts.map(function (each) {
      return <PostCard {...each} />
    })
  } else {
    return <>No posts here</>
  }
}