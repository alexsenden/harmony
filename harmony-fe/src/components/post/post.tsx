import {
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  Box,
  Divider,
  TextField,
  Collapse,
  InputAdornment,
  IconButton,
  Link,
  Rating,
  Avatar,
} from '@mui/material'
import TextBlock from '../text'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { useState } from 'react'
import { PostType } from '../../models/post'
import { Forum, Poll, RateReview } from '@mui/icons-material'
import { PollOption } from '../../models/pollOption'
import { PollAnswer } from './poll-answer'
import { TopicId } from '../../models/topic'

interface PostProps {
  title: string
  name: string
  numComments: number
  numLikes: number
  postId: string
  postType: PostType
  body?: string
  pollOptions?: Array<PollOption>
  rating?: number
  topicName: string
  topicId: TopicId
  picture: number
}

const Post = ({
  title,
  name,
  numComments,
  numLikes,
  postId,
  postType,
  body,
  pollOptions,
  rating,
  topicName,
  topicId,
  picture,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false)

  const toggleLike = () => {
    setIsLiked(prevState => !prevState)
  }

  const toggleCommentSection = () => {
    setIsCommentSectionOpen(prevState => !prevState)
  }

  const [commentInput, setCommentInput] = useState('')
  const [comments, setComments] = useState<string[]>([])

  const handleCommentInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentInput(event.target.value)
  }

  const handleCommentSubmission = () => {
    if (commentInput.trim() !== '') {
      setComments(prevComments => [...prevComments, commentInput])
      setCommentInput('')
      toggleCommentSection()
    }
  }

  let topicContext
  if (topicId.artistId) {
    topicContext = '(Artist)'
  } else if (topicId.albumId) {
    topicContext = '(Album)'
  } else if (topicId.songId) {
    topicContext = '(Song)'
  }

  console.log(topicName)
  let avatarIcon
  const iconSx = { mt: 1, ml: 1 }
  switch (postType) {
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
            <Link href={`/posts/${postId}`} underline="none">
              <TextBlock gutterBottom variant="h5">
                {title}
              </TextBlock>
            </Link>
            <TextBlock>
              {topicName} {topicContext}
            </TextBlock>
            <Divider sx={{ my: 1 }} />
            {rating && postType === PostType.REVIEW && (
              <Rating
                size="large"
                value={rating}
                precision={0.5}
                readOnly
                sx={{ my: 1, ml: 0.5 }}
              />
            )}
            {body && <TextBlock sx={{ ml: 1 }}>{body}</TextBlock>}
            {pollOptions &&
              pollOptions.map(option => <PollAnswer pollOption={option} />)}
          </CardContent>

          <CardActions>
            <Button disabled size="small" onClick={toggleLike}>
              {isLiked ? (
                <ThumbUpIcon style={{ color: 'blue' }} />
              ) : (
                <ThumbUpOffAltOutlinedIcon />
              )}
            </Button>

            <Button size="small" onClick={toggleCommentSection}>
              <CommentOutlinedIcon />
            </Button>
          </CardActions>

          <Divider />

          <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button href={`/profile/${name}`}>
              <Avatar
                src={`/image/profilepic/${picture}.png`}
                sx={{ mr: 1, height: 24, width: 24 }}
              ></Avatar>
              {name}
            </Button>
            <Button
              size="small"
              onClick={toggleCommentSection}
              sx={{ ml: 3, mt: 0.5 }}
            >
              {numComments} comments
            </Button>
            <Button size="small" disabled sx={{ mt: 0.5 }}>
              {' '}
              {numLikes} likes
            </Button>
          </CardActions>

          <Collapse in={isCommentSectionOpen}>
            <CardContent>
              <TextField
                placeholder="Add a comment.."
                // Disabling for sprint 2 evaluation
                disabled
                fullWidth
                value={commentInput}
                onChange={handleCommentInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCommentSubmission}>
                        <SendRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Collapse>

          {/* This section should be replace with the dynamic comments from database */}
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
