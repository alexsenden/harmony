import PostTemplate  from './post'
import { Post } from '../../models/post'
import React from 'react'

export default function PostCard(post: Post) {
    return(
        <PostTemplate title={post.title} name={post.userId} numComments={0} numLikes={0} postId={post.postId}/>
    )
}
