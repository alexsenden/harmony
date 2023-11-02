import { useState } from 'react'
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
import { CommentInput } from './comment-input'
import { ReviewContent } from './review-content'
import { PollContent } from './poll-content'
import { DiscussionContent } from './discussion-content'

interface PostProps {
  post: Post
}

const Post = ({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false)

  const toggleLike = () => {
    setIsLiked(prevState => !prevState)
  }

  const toggleCommentSection = () => {
    setIsCommentSectionOpen(prevState => !prevState)
  }

  const [comments, setComments] = useState<string[]>([])

  const handleCommentSubmission = (comment: string) => {
    setComments(prevComments => [...prevComments, comment])
    setIsCommentSectionOpen(false)
  }

  const topicContext = getTopicContext(post.topicId)

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
            <Button disabled size="small" onClick={toggleLike}>
              {isLiked ? (
                <ThumbUp style={{ color: 'blue' }} />
              ) : (
                <ThumbUpOffAltOutlined />
              )}
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
              {/*post.comments.length*/} comments
            </Button>
            <Button size="small" disabled sx={{ mt: 0.5 }}>
              {`${post.numLikes} like${post.numLikes !== 1 ? 's' : ''}`}
            </Button>
          </CardActions>

          <CommentInput
            open={isCommentSectionOpen}
            submitComment={handleCommentSubmission}
          />

          {/* This section should be replaced with the dynamic comments from database */}
          {comments.map((comment, index) => (
            <CardContent key={index}>
              <TextBlock gutterBottom variant="body1">
                Comment {index + 1}: {comment}
              </TextBlock>
            </CardContent>
          ))}
        </Box>
      </Stack>
    </Card>
  )
}

export default Post
