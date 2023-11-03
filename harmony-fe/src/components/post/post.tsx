import { useEffect, useState } from 'react'
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

import TextBlock from '../text-block'
import { Post, PostType } from '../../models/post'
import { getTopicContext } from '../../utils/topicContext'
import { ReviewContent } from './review-content'
import { PollContent } from './poll-content'
import { DiscussionContent } from './discussion-content'
import useHttpRequest, { HttpMethod } from '../../hooks/httpRequest'
import { Like } from '../../models/like'
import CommentSection from './comment-section'

interface PostProps {
  post: Post
}

const Post = ({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [numComments, setNumComments] = useState(post.numComments)
  const [commentSectionOpen, setCommentSectionOpen] = useState(false)

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

            <Button
              size="small"
              onClick={() => setCommentSectionOpen(prevState => !prevState)}
            >
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
              onClick={() => setCommentSectionOpen(prevState => !prevState)}
              sx={{ ml: 3, mt: 0.5 }}
            >
              {`${numComments} comment${numComments !== 1 ? 's' : ''}`}
            </Button>
            <Button size="small" disabled sx={{ mt: 0.5 }}>
              {`${post.numLikes} like${post.numLikes !== 1 ? 's' : ''}`}
            </Button>
          </CardActions>

          <CommentSection
            commentSectionOpen={commentSectionOpen}
            post={post}
            setNumComments={setNumComments}
          />
        </Box>
      </Stack>
    </Card>
  )
}

export default Post
