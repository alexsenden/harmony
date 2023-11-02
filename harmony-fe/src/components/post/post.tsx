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
  Rating,
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
import { PollAnswer } from './poll-answer'
import { getTopicContext } from '../../utils/topicContext'
import { CommentInput } from './comment-input'

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
  const iconSx = { mt: 1, ml: 1 }
  switch (post.postType) {
    case PostType.DISCUSSION:
      avatarIcon = <Forum sx={iconSx} fontSize="large" />
      break
    case PostType.POLL:
      avatarIcon = <Poll sx={iconSx} fontSize="large" />
      break
    case PostType.REVIEW:
    default:
      avatarIcon = <RateReview sx={iconSx} fontSize="large" />
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
            {post.rating && post.postType === PostType.REVIEW && (
              <Rating
                size="large"
                value={post.rating}
                precision={0.5}
                readOnly
                sx={{ my: 1, ml: 0.5 }}
              />
            )}
            {post.body && <TextBlock sx={{ ml: 1 }}>{post.body}</TextBlock>}
            {post.pollOptions &&
              post.pollOptions.map(option => (
                <PollAnswer pollOption={option} />
              ))}
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

          <Divider />

          <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button href={`/profile/${name}`}>
              <Avatar
                src={`/image/profilepic/${post.picture}.png`}
                sx={{ mr: 1, height: 24, width: 24 }}
              ></Avatar>
              {post.username}
            </Button>
            <Button
              size="small"
              onClick={toggleCommentSection}
              sx={{ ml: 3, mt: 0.5 }}
            >
              {/*post.comments.length*/} comments
            </Button>
            <Button size="small" disabled sx={{ mt: 0.5 }}>
              {' '}
              {/*post.numLikes */} likes
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
