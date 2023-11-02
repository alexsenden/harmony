import { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Box,
  Divider,
  Link,
  Avatar,
} from '@mui/material'
import {
  Forum,
  Poll,
  RateReview,
  ThumbUp,
  ThumbUpOffAltOutlined,
  CommentOutlined,
} from '@mui/icons-material'
import { v4 as newUuid } from 'uuid'

import TextBlock from '../text-block'
import { Post, PostType } from '../../models/post'
import { getTopicContext } from '../../utils/topicContext'
import { CommentInput } from './comment-input'
import { ReviewContent } from './review-content'
import { PollContent } from './poll-content'
import { DiscussionContent } from './discussion-content'
import { UserContext } from '../../contexts/user'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Like } from '../../models/like'
import { CommentWithUser } from '../../models/comment'
import Comment from './comment'

interface PostProps {
  post: Post
}

const Post = ({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false)
  const [comments, setComments] = useState<CommentWithUser[] | undefined>(
    undefined
  )

  const user = useContext(UserContext)

  const [postLikeRequest] = useHttpRequest({
    url: `/post/${post.postId}/like`,
    method: HttpMethod.POST,
    body: { postId: post.postId },
  })

  const [removeLikeRequest] = useHttpRequest({
    url: `/post/${post.postId}/like`,
    method: HttpMethod.DELETE,
    body: { postId: post.postId },
  })

  const [getLike, like] = useHttpRequest({
    url: `/post/${post.postId}/like`,
    method: HttpMethod.GET,
    body: { postId: post.postId },
  })

  const toggleLike = () => {
    if (!isLiked) {
      postLikeRequest()
      setIsLiked(true)
    } else {
      removeLikeRequest()
      setIsLiked(false)
    }
  }

  useEffect(() => {
    getLike()
  }, [])

  useEffect(() => {
    if (like && like.length > 0) {
      const userLiked = like.some(
        (likeItem: Like) => likeItem.postId === post.postId
      )
      setIsLiked(userLiked)
    }
  }, [like])

  const [getComments, commentsResponse, , commentsLoading] = useHttpRequest({
    url: `post/${post.postId}/comment`,
    method: HttpMethod.GET,
  })

  useEffect(() => {
    if (!comments && isCommentSectionOpen) {
      getComments()
    }
  }, [isCommentSectionOpen, comments])

  useEffect(() => {
    setComments(commentsResponse)
  }, [commentsResponse])

  const toggleCommentSection = () => {
    setIsCommentSectionOpen(prevState => !prevState)
  }

  const handleCommentSubmission = (comment: string) => {
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
    setIsCommentSectionOpen(false)
  }

  let avatarIcon
  let postContent
  const iconSx = { mt: 1, ml: 1 }
  switch (post.postType) {
    case PostType.REVIEW:
      avatarIcon = <RateReview sx={iconSx} fontSize="large" />
      postContent = <ReviewContent post={post} />
      break
    case PostType.POLL:
      avatarIcon = <Poll sx={iconSx} fontSize="large" />
      postContent = <PollContent post={post} />
      break
    case PostType.DISCUSSION:
    default:
      avatarIcon = <Forum sx={iconSx} fontSize="large" />
      postContent = <DiscussionContent post={post} />
      break
  }

  const topicContext = getTopicContext(post.topicId)

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <Stack direction="row">
        <CardContent>{avatarIcon}</CardContent>
        <Box sx={{ width: '100%' }}>
          <CardContent>
            <Link href={`/posts/${post.postId}`} underline="none">
              <TextBlock gutterBottom variant="h5">
                {post.title}
              </TextBlock>
            </Link>
            <TextBlock>
              {post.topicName} {topicContext}
            </TextBlock>
            <Divider sx={{ my: 1 }} />
            {postContent}
          </CardContent>

          <CardActions>
            <Button size="small" onClick={toggleLike}>
              {isLiked ? <ThumbUp /> : <ThumbUpOffAltOutlined />}
            </Button>

            <Button size="small" onClick={toggleCommentSection}>
              <CommentOutlined />
            </Button>
          </CardActions>

          <Divider sx={{ mx: 2 }} />

          <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button href={`/profile/${post.user?.username}`}>
              <Avatar
                src={`/images/profilepic/${post.user?.picture}.png`}
                sx={{ mr: 1, height: 24, width: 24 }}
              ></Avatar>
              {post.user?.username}
            </Button>
            <Button
              size="small"
              onClick={toggleCommentSection}
              sx={{ ml: 3, mt: 0.5 }}
            >
              {comments?.length || 0} comments
            </Button>
            <Button size="small" disabled sx={{ mt: 0.5 }}>
              {`${post.numLikes} like${post.numLikes !== 1 ? 's' : ''}`}
            </Button>
          </CardActions>

          <CommentInput
            open={isCommentSectionOpen}
            post={post}
            submitComment={handleCommentSubmission}
          />

          {commentsLoading ? (
            comments?.map((comment: CommentWithUser, index: number) => (
              <Comment comment={comment} index={index} />
            ))
          ) : (
            <p>Loading comments...</p>
          )}
        </Box>
      </Stack>
    </Card>
  )
}

export default Post
