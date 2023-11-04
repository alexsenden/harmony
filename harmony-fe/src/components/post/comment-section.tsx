import { useContext, useEffect, useState } from 'react'
import { v4 as newUuid } from 'uuid'

import { Post } from '../../models/post'
import { CommentInput } from './comment-input'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { CommentWithUser } from '../../models/comment'
import Comment from './comment'
import { UserContext } from '../../contexts/userContext'
import TextBlock from '../text-block'

interface CommentSectionProps {
  commentSectionOpen: boolean
  post: Post
  setNumComments: (numComments: number) => void
}

const CommentSection = ({
  commentSectionOpen,
  post,
  setNumComments,
}: CommentSectionProps) => {
  const user = useContext(UserContext)

  const [comments, setComments] = useState<CommentWithUser[] | undefined>(
    undefined
  )

  const handleCommentSubmission = (comment: string) => {
    setNumComments((comments?.length || 0) + 1)
    setComments(prevComments => {
      if (prevComments) {
        return [
          ...prevComments,
          {
            user: {
              username: user?.username || '',
              picture: user?.picture || 0,
            },
            commentId: newUuid(),
            userId: user?.userId || '',
            postId: post.postId,
            createdAt: new Date(Date.now()),
            content: comment,
          },
        ]
      }
      return undefined
    })
  }

  const [getComments, commentsResponse, , commentsLoading] = useHttpRequest({
    url: `post/${post.postId}/comment`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (!comments && commentSectionOpen) {
      getComments()
    }
  }, [commentSectionOpen, comments])

  useEffect(() => {
    setComments(commentsResponse)
  }, [commentsResponse])

  return (
    <>
      <CommentInput
        open={commentSectionOpen}
        post={post}
        submitComment={handleCommentSubmission}
      />
      {commentSectionOpen &&
        (!commentsLoading ? (
          comments?.map((comment: CommentWithUser, index: number) => (
            <Comment comment={comment} key={`comment-${index}`} />
          ))
        ) : (
          <TextBlock>Loading comments...</TextBlock>
        ))}
    </>
  )
}

export default CommentSection
