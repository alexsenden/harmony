import PostTemplate from './post'
import { Post } from '../../models/post'
import React from 'react'

export default function PostCard(post: Post) {
  return (
    <PostTemplate
      title={post.title}
      name={post.username || ''}
      numComments={0}
      numLikes={0}
      postId={post.postId}
      postType={post.postType}
      body={post.body}
      pollOptions={post.pollOptions}
      rating={post.rating}
      topicName={post.topicName}
      topicId={post.topicId}
    />
  )
}
