import PostTemplate from './post'
import { Post } from '../../models/post'
import React from 'react'

export default function PostCard(post: Post) {
  return (
    <PostTemplate
      title={post.title}
      name={post.username || ''}
      numComments={post.numComments}
      numLikes={post.numLikes}
      postId={post.postId}
      postType={post.postType}
      body={post.body}
      pollOptions={post.pollOptions}
      rating={post.rating}
      topicName={post.topicName}
      topicId={post.topicId}
      picture={post.picture}
    />
  )
}
